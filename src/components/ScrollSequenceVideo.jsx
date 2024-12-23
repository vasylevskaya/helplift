import { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilState } from "recoil";
import { animationTextVisibleState } from "../recoil/atoms";
import SkipAnimation from "./SkipAnimation";
import videoForward from '../assets/scroll-sequence/video-original.mp4';
import videoReverse from '../assets/scroll-sequence/video-reverse.mp4';

const ScrollSequenceVideo = () => {
  const [isForward, setIsForward] = useState(true);
  const isForwardRef = useRef(isForward);
  const [textStage, setTextStage] = useState(0); // 0 - 2
  const textStageRef = useRef(textStage);
  const [isAnimTextVisible, setIsAnimTextVisible] = useRecoilState(animationTextVisibleState);
  const isAnimTextVisibleRef = useRef(isAnimTextVisible);
  const currentStageRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const forwardVideoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const sectionRef = useRef(null);

  const stopPointsForward = [
    0,    // 0, Start of stage 0 'in'
    2200, // 2000, Start of stage 1 'up'
    4300, //6000, // Start of stage 2 'out'
    6640 //12000 // End of stage 2
  ];
  const stopPointsReverse = [
    6640, //12000, // Start of stage 0 'in'
    4440, //10000, // Start of stage 1 'up'
    2340, //6000, // Start of stage 2 'out'
    0,    // 0, End of stage 2
  ];

  const totalStages = stopPointsForward.length;

  const scrollPoints = useMemo(() => {
    if (!sectionRef.current) return [];
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionTop = sectionRef.current.offsetTop;
    const stageHeight = (sectionHeight - window.innerHeight / 2) / (totalStages);
    return Array.from({ length: totalStages }, (_, index) => {
      return sectionTop + index * stageHeight;
    });
  }, [sectionRef.current?.offsetHeight, sectionRef.current?.offsetTop]);

  const preventDefault = (e) => e.preventDefault();

  const disableScroll = () => {
    isAnimatingRef.current = true;
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
  };

  const enableScroll = () => {
    isAnimatingRef.current = false;
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
  };

  const handleScroll = (e) => {
    if (isAnimatingRef.current) return;

    const isScrollDown = e.deltaY > 0;
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = window.scrollY;
    //.log(currentScroll, scrollPoints)
    if (currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint) {
      disableScroll();

      if (currentStageRef.current === 0 && !isScrollDown) {
        setIsAnimTextVisible(() => {
          isAnimTextVisibleRef.current = false
          return false;
        })
       /*  window.scrollTo({
          top: sectionRef.current.offsetTop - sectionRef.current.offsetHeight / totalStages,
          behavior: 'smooth',
        }); */
        enableScroll()
        return;
      };
      if (currentStageRef.current === totalStages - 1 && isScrollDown) {
        setIsAnimTextVisible(() => {
          isAnimTextVisibleRef.current = false
          return false;
        })
       /*  window.scrollTo({
          top: sectionRef.current.offsetTop + sectionRef.current.offsetHeight,
          behavior: 'smooth',
        }); */
        enableScroll()
        return;
      };

      if (!isAnimTextVisibleRef.current) {
        setIsAnimTextVisible(() => {
          isAnimTextVisibleRef.current = true
          return true;
        })
      }

      const video = isScrollDown
        ? forwardVideoRef.current
        : reverseVideoRef.current;

      const hiddenVideo = isScrollDown
        ? reverseVideoRef.current
        : forwardVideoRef.current;

      if (isForwardRef.current !== isScrollDown) {
        setIsForward((prevIsForward) => {
          isForwardRef.current = !prevIsForward;
          return !prevIsForward;
        });
      }

      const newStage = isScrollDown
        ? currentStageRef.current + 1
        : currentStageRef.current - 1;

      const stopPoints = isScrollDown
        ? stopPointsForward
        : stopPointsReverse

      const stopPointsHiddenVideo = isScrollDown
        ? stopPointsReverse
        : stopPointsForward

      const currentStopPoint = stopPoints[currentStageRef.current]
      const newStopPoint = stopPoints[newStage];
      const newStopPointHiddenVideo = stopPointsHiddenVideo[newStage]

      const stopTimeoutTime = Math.abs(newStopPoint - currentStopPoint);

      // Adjust scroll to scollPoint of current stage
      window.scrollTo({ top: scrollPoints[newStage] });

      // START ANIMATION
      video.play();

      let newTextStage = textStageRef.current

      if (isScrollDown && currentStageRef.current !== textStageRef.current) {
        newTextStage = currentStageRef.current 
      } else if (!isScrollDown && currentStageRef.current - 1 !== textStageRef.current) {
        newTextStage = currentStageRef.current - 1
      }

      textStageRef.current = newTextStage;
      setTextStage(newTextStage)

      // Milliseconds to seconds
      hiddenVideo.currentTime = newStopPointHiddenVideo / 1000;

      currentStageRef.current = newStage;

      setTimeout(() => {
        enableScroll();
        // STOP ANIMATION
        video.pause();
      }, stopTimeoutTime);
    } else {
      if (isAnimTextVisibleRef.current) {
        setIsAnimTextVisible(false)
      }

      if (currentScroll <= firstStageTopPoint && currentStageRef.current !== 0) {
       // Reseting to the first stage (when we skip animation UP)
        currentStageRef.current = 0;
        forwardVideoRef.current.currentTime = stopPointsForward[0];
        setIsForward(true)
        isForwardRef.current = true;

      } else if (currentScroll >= lastStageTopPoint && currentStageRef.current !== totalStages - 1) {
        const reverseVideo = reverseVideoRef.current
        if (reverseVideo) {
          // Reseting to the last stage (when we skip animation DOWN)
          currentStageRef.current = totalStages - 1;
          reverseVideo.currentTime = stopPointsReverse[totalStages - 1];
          setIsForward(false)
          isForwardRef.current = false;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPoints]);

  useEffect(() => {
    isAnimTextVisibleRef.current = isAnimTextVisible;
  }, [isAnimTextVisible]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <SkipAnimation />
      <video
        ref={forwardVideoRef}
        src={videoForward}
        className={`png__sequence__video ${isForward ? 'visible' : 'hidden'}`}
        muted
      />
      <video
        ref={reverseVideoRef}
        src={videoReverse}
        className={`png__sequence__video ${isForward ? 'hidden' : 'visible'}`}
        muted
      />
      <div className={`png__sequence__text ${isAnimTextVisible ? 'visible' : 'hidden'}`}>
        <div className={`png__sequence__text_part ${textStage === 0 ? 'visible' : 'hidden'}`}>
          <p>{'1. Заїзд на підйомник:'}</p>
          <p>{'Користувач заїжджає на платформу підйомника'}</p>
        </div>
        <div className={`png__sequence__text_part ${textStage === 1 ? 'visible' : 'hidden'}`}>
          <p>{'2. Підйом:'}</p>
          <p>{'Користувач натискає кнопку, і підйомник плавно піднімається до потрібного рівня.'}</p>
        </div>
        <div className={`png__sequence__text_part ${textStage === 2 ? 'visible' : 'hidden'}`}>
          <p>{'3. Виїзд з підйомника:'}</p>
          <p>{'Брамка відкривається, дозволяючи користувачу безпечно виїхати.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollSequenceVideo;
