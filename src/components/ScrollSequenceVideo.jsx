import { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilState } from "recoil";
import { useMediaQuery } from 'react-responsive'
import throttle from 'lodash.throttle';
import { animationTextVisibleState } from "../recoil/atoms";
import SkipAnimation from "./SkipAnimation";
import videoForward from '../assets/scroll-sequence/video-original.mp4';
import videoReverse from '../assets/scroll-sequence/video-reverse.mp4';
import videoForwardMob from '../assets/scroll-sequence/video-original-mob.mp4';
import videoReverseMob from '../assets/scroll-sequence/video-reverse-mob.mp4';
import AutoPlaySilentVideo from '../hooks/AutoPlaySilentVideo';
import posterForward from '../assets/images/poster-original.jpg';
import posterReverse from '../assets/images/poster-reverse.jpg';
import posterForwardMob from '../assets/images/poster-original-mob.webp';
import posterReverseMob from '../assets/images/poster-reverse-mob.webp';
import ScrollSequenceText from './ScrollSequenceText';


const ScrollSequenceVideo = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
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
    6640, // Start of stage 0 'in'
    4440, // Start of stage 1 'up' (6640 - 2200)
    2340, // Start of stage 2 'out' (6640 - 4300)
    0,    // End of stage 2
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
    window.addEventListener('scroll', preventDefault, { passive: false });
  };

  const enableScroll = () => {
    isAnimatingRef.current = false;
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('scroll', preventDefault, { passive: false });
  };

  const animate = (isScrollDown) => {
    console.log(isScrollDown)
  
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = window.scrollY;

    //console.log(currentScroll, firstStageTopPoint, lastStageTopPoint)

    if (currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint) {
      disableScroll();
      console.log('in section', currentStageRef.current, textStageRef.current)

      /* Go up or go down out of animation */
      if ((currentStageRef.current === 0 && !isScrollDown) ||
        (currentStageRef.current === totalStages - 1 && isScrollDown)) {
          //console.log('go up and down')
        setIsAnimTextVisible(() => {
          isAnimTextVisibleRef.current = false
          return false;
        })
        enableScroll()
        return;
      };

      if (!isAnimTextVisibleRef.current) {
        setIsAnimTextVisible(() => {
          isAnimTextVisibleRef.current = true
          return true;
        })
      }

      //console.log('continue')

      const video = isScrollDown
        ? forwardVideoRef.current
        : reverseVideoRef.current;

      const hiddenVideo = isScrollDown
        ? reverseVideoRef.current
        : forwardVideoRef.current;

      console.log(forwardVideoRef.current.duration, reverseVideoRef.current.duration)

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
        console.log('stop animation', stopTimeoutTime)
        enableScroll();
        // STOP ANIMATION
        video.pause();
      }, stopTimeoutTime);
    } else {
      //console.log('out animation', isAnimTextVisibleRef.current)
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
  }

  let prevScrollY = 0;

  const handleScroll = throttle(() => {
    const { scrollY } = window;

    if (prevScrollY === scrollY || isAnimatingRef.current) {
      prevScrollY = scrollY;
      return
    };

    const isScrollDown = prevScrollY < scrollY;
    prevScrollY = scrollY;
    animate(isScrollDown);
}, 200);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPoints]);

  useEffect(() => {
    isAnimTextVisibleRef.current = isAnimTextVisible;
  }, [isAnimTextVisible]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <SkipAnimation />
      <AutoPlaySilentVideo
        video={isTabletOrMobile ? videoForwardMob : videoForward}
        videoRef={forwardVideoRef}
        className={`png__sequence__video ${isForward ? 'visible' : 'hidden'}`}
        poster={isTabletOrMobile ? posterForwardMob : posterForward}
      />
      <AutoPlaySilentVideo
        video={isTabletOrMobile ? videoReverseMob : videoReverse}
        videoRef={reverseVideoRef}
        className={`png__sequence__video ${isForward ? 'hidden' : 'visible'}`}
        poster={isTabletOrMobile ? posterReverseMob : posterReverse}
      />
      <ScrollSequenceText
        isAnimTextVisible={isAnimTextVisible}
        textStage={textStage}
      />
    </div>
  );
};

export default ScrollSequenceVideo;
