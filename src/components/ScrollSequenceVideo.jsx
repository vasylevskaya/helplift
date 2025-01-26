import { useState, useEffect, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useRecoilState } from 'recoil';
import { animationDisabledState } from '../recoil/atoms';
import throttle from 'lodash.throttle';
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
import { hideAllVisibleText, makeTextVisible, toggleSkipAnimation } from '../helpers/animationText';


const ScrollSequenceVideo = () => {
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 700px) and (orientation: portrait), (max-height: 700px) and (orientation: landscape)"
  });
  const isTabletOrMobileVertical = useMediaQuery({
    query: "(max-width: 700px) and (orientation: portrait)"
  });
  const [isForward, setIsForward] = useState(true);
  const isForwardRef = useRef(isForward);
  const [textStage, setTextStage] = useState(-1); // -1 - 2
  const textStageRef = useRef(textStage);
  const currentStageRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const forwardVideoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const sectionRef = useRef(null);
  const [animationDisabledGlobally, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);
  const animationDisabledGloballyRef = useRef(animationDisabledGlobally);

  useEffect(() => {
    console.log(animationDisabledGloballyRef)
    animationDisabledGloballyRef.current = animationDisabledGlobally;
  }, [animationDisabledGlobally])
  const stopPointsForward = /* isTabletOrMobile
    ? [ 0, 1900, 3700, 5600 ]
    : */ [
      0,    // 0, Start of stage 0 'in'
      2200,//1733, //2200, // 2000, Start of stage 1 'up'
      4300,//3350, //6000, // Start of stage 2 'out'
      6640//5200 //12000 // End of stage 2
    ];

  const stopPointsReverse = /* isTabletOrMobile
  ? [ 6640, 0 ]
  : */ [
      6640,//5200, // Start of stage 0 'in'
      4300,//3350, // Start of stage 1 'up' (6640 - 2200)
      2200,//1733, // Start of stage 2 'out' (6640 - 4300)
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

  /* 
    Doesn't stop scrolling in mobile, so in case of overscroll we just
    reseting animation and hiding text
   */
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
  
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = window.scrollY;

    if (currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint) {
      disableScroll();
      toggleSkipAnimation('show');

      /* Go up or go down out of animation */
      if ((currentStageRef.current === 0 && !isScrollDown) ||
        (currentStageRef.current === totalStages - 1 && isScrollDown)) {
          console.log('out of')
          if (textStageRef.current >= 0 || textStage >= 0) {
            textStageRef.current = -1
            setTextStage(-1)
            hideAllVisibleText()
          }
        enableScroll()
        return;
      };

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
      //if (!isTabletOrMobile) {
        window.scrollTo({ top: scrollPoints[newStage] });
      //}

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
      makeTextVisible(newTextStage)


      // Milliseconds to seconds

      hiddenVideo.currentTime = newStopPointHiddenVideo / 1000;

      currentStageRef.current = newStage;

      setTimeout(() => {
        console.log(stopTimeoutTime)
        enableScroll();
        // STOP ANIMATION
        /* if (!isTabletOrMobile) { */
          video.pause();
        /* } */
      }, stopTimeoutTime);
    } else {
      toggleSkipAnimation('hide');

      if (textStageRef.current >= 0 || textStage >= 0) {
        textStageRef.current = -1
        setTextStage(-1)
        hideAllVisibleText()
      }

      const shouldResetUp = isTabletOrMobile
        ? currentScroll <= firstStageTopPoint - window.innerHeight && currentStageRef.current !== 0
        : currentScroll <= firstStageTopPoint && currentStageRef.current !== 0

      if (shouldResetUp) {
       // Reseting to the first stage (when we skip animation UP)
       console.log('reset up')
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

  const handleScroll = throttle((e) => {
    /* disable to avoid trigerring animation when using navigation or scroll to top */
    if (animationDisabledGloballyRef.current) return;

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
    /* timer to wait for scroll to top when page is loaded */
    const timeoutId = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("wheel", handleScroll);
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPoints]);


  return (
    <div className="png__sequence" ref={sectionRef}>
      {!isTabletOrMobile && (
        <SkipAnimation />
      )}
      <div className='wrapper'>
        <div className='wrapper-relative'>
          <AutoPlaySilentVideo
            video={isTabletOrMobileVertical ? videoForwardMob : videoForward}
            videoRef={forwardVideoRef}
            className={`png__sequence__video ${isForward ? 'visible' : 'hidden'}`}
            poster={isTabletOrMobileVertical ? posterForwardMob : posterForward}
          />
          <AutoPlaySilentVideo
            video={isTabletOrMobileVertical ? videoReverseMob : videoReverse}
            videoRef={reverseVideoRef}
            className={`png__sequence__video ${isForward ? 'hidden' : 'visible'}`}
            poster={isTabletOrMobileVertical ? posterReverseMob : posterReverse}
          />
          <ScrollSequenceText />
        </div>
      </div>
    </div>
  );
};

export default ScrollSequenceVideo;
