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

 /* Parts start*/
import videoForwardMobPhase1 from '../assets/scroll-sequence/forward-mob-1.mp4';
import videoForwardMobPhase2 from '../assets/scroll-sequence/forward-mob-2.mp4';
import videoForwardMobPhase3 from '../assets/scroll-sequence/forward-mob-3.mp4';
import videoReverseMobPhase1 from '../assets/scroll-sequence/reverse-mob-1.mp4';
import videoReverseMobPhase2 from '../assets/scroll-sequence/reverse-mob-2.mp4';
import videoReverseMobPhase3 from '../assets/scroll-sequence/reverse-mob-3.mp4';
/* Parts end */

const ScrollSequenceVideo = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const [isForward, setIsForward] = useState(true);
  const isForwardRef = useRef(isForward);
  const [textStage, setTextStage] = useState(0); // 0 - 2
  const textStageRef = useRef(textStage);
  const [isAnimTextVisible, setIsAnimTextVisible] = useRecoilState(animationTextVisibleState);
  const isAnimTextVisibleRef = useRef(isAnimTextVisible);
  const currentStageRef = useRef(0);
  const [currentStage, setCurrentStage] = useState(0);
  const isAnimatingRef = useRef(false);
  const forwardVideoRef = useRef(null);
  /* Parts start*/
  const forwardPhase1Ref = useRef(null);
  const forwardPhase2Ref = useRef(null);
  const forwardPhase3Ref = useRef(null);
  const reversePhase1Ref = useRef(null);
  const reversePhase2Ref = useRef(null);
  const reversePhase3Ref = useRef(null);
  const forwardVideos = [
    forwardPhase1Ref,
    forwardPhase2Ref,
    forwardPhase3Ref
  ]
  const reverseVideos = [
    reversePhase1Ref,
    reversePhase2Ref,
    reversePhase3Ref
  ]
  /* Parts end */
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

  const getScrollPoints = () => {
    if (!sectionRef.current) return [];
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionTop = sectionRef.current.offsetTop;
    const stageHeight = (sectionHeight - window.innerHeight / 2) / (totalStages);
    return Array.from({ length: totalStages }, (_, index) => {
      return sectionTop + index * stageHeight;
    });
  };

  const preventDefault = (e) => e.preventDefault();

  const switchDirection = () => {
    setIsForward((prevIsForward) => {
      isForwardRef.current = !prevIsForward;
      return !prevIsForward;
    });
  }

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
    const scrollPoints = getScrollPoints();
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = window.scrollY;

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

      console.log('isForward?', isForward)

      const videoRef = isScrollDown
        ? forwardVideos[currentStageRef.current]
        : reverseVideos[currentStageRef.current - 1]

      
      let video = videoRef?.current
      if (!video) return

      /* const video = isScrollDown
        ? forwardVideoRef.current
        : reverseVideoRef.current; */

      /* const hiddenVideo = isScrollDown
        ? reverseVideoRef.current
        : forwardVideoRef.current; */

      if (isForwardRef.current !== isScrollDown) {
        switchDirection();
      }

      const newStage = isScrollDown
        ? currentStageRef.current + 1
        : currentStageRef.current - 1;

      /* const stopPoints = isScrollDown
        ? stopPointsForward
        : stopPointsReverse */

      /* const stopPointsHiddenVideo = isScrollDown
        ? stopPointsReverse
        : stopPointsForward */

      /* const currentStopPoint = stopPoints[currentStageRef.current]
      const newStopPoint = stopPoints[newStage];
      const newStopPointHiddenVideo = stopPointsHiddenVideo[newStage]

      const stopTimeoutTime = Math.abs(newStopPoint - currentStopPoint); */

      // Adjust scroll to scollPoint of current stage
      window.scrollTo({ top: scrollPoints[newStage] });

      
      // START ANIMATION
      video
      .play()
      .catch((err) => console.error('Failed to play video:', err));
      
      let newTextStage = textStageRef.current
      
      if (isScrollDown && currentStageRef.current !== textStageRef.current) {
        newTextStage = currentStageRef.current
      } else if (!isScrollDown && currentStageRef.current - 1 !== textStageRef.current) {
        newTextStage = currentStageRef.current - 1
      }
      
      textStageRef.current = newTextStage;
      setTextStage(newTextStage)
      
      // Milliseconds to seconds
      
      /* hiddenVideo.currentTime = newStopPointHiddenVideo / 1000; */
      
      console.log(video, currentStage)
      
      setTimeout(() => {
        // STOP ANIMATION
        
        currentStageRef.current = newStage;
        
        setCurrentStage(newStage);
        enableScroll();
        
        if (newStage === 0 || newStage === 3) { // if last stage - switch direction
          switchDirection()
        }
        
        video.currentTime = 0; // reset video to beginning
      }, video.duration * 1000 + 400);
    } else {
      //console.log('out animation', isAnimTextVisibleRef.current)
      if (isAnimTextVisibleRef.current) {
        setIsAnimTextVisible(false)
      }

      if (currentScroll <= firstStageTopPoint && currentStageRef.current !== 0) {
       // Reseting to the first stage (when we skip animation UP)
        currentStageRef.current = 0;
        //forwardVideoRef.current.currentTime = stopPointsForward[0];
        setIsForward(true)
        isForwardRef.current = true;

      } else if (currentScroll >= lastStageTopPoint && currentStageRef.current !== totalStages - 1) {
        const reverseVideo = reverseVideoRef.current
        if (reverseVideo) {
          // Reseting to the last stage (when we skip animation DOWN)
          currentStageRef.current = totalStages - 1;
          //reverseVideo.currentTime = stopPointsReverse[totalStages - 1];
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
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("wheel", handleScroll);
    }, 1000)
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    isAnimTextVisibleRef.current = isAnimTextVisible;
  }, [isAnimTextVisible]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <SkipAnimation />
      <AutoPlaySilentVideo
        video={videoForwardMobPhase1}
        videoRef={forwardPhase1Ref}
        className={`png__sequence__video ${isForward && currentStage === 0 ? 'visible' : 'hidden'}`}
      />
      <AutoPlaySilentVideo
        video={videoForwardMobPhase2}
        videoRef={forwardPhase2Ref}
        className={`png__sequence__video ${isForward && currentStage === 1 ? 'visible' : 'hidden'}`}
      />
      <AutoPlaySilentVideo
        video={videoForwardMobPhase3}
        videoRef={forwardPhase3Ref}
        className={`png__sequence__video ${isForward && currentStage >= 2 ? 'visible' : 'hidden'}`}
      />
      <AutoPlaySilentVideo
        video={videoReverseMobPhase1}
        videoRef={reversePhase1Ref}
        className={`png__sequence__video ${!isForward && currentStage <= 1 ? 'visible' : 'hidden'}`}
      />
      <AutoPlaySilentVideo
        video={videoReverseMobPhase2}
        videoRef={reversePhase2Ref}
        className={`png__sequence__video ${!isForward && currentStage === 2 ? 'visible' : 'hidden'}`}
      />
      <AutoPlaySilentVideo
        video={videoReverseMobPhase3}
        videoRef={reversePhase3Ref}
        className={`png__sequence__video ${!isForward && currentStage >= 3 ? 'visible' : 'hidden'}`}
      />
     {/*  <AutoPlaySilentVideo
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
      /> */}
      <ScrollSequenceText
        isAnimTextVisible={isAnimTextVisible}
        textStage={textStage}
      />
    </div>
  );
};

export default ScrollSequenceVideo;
