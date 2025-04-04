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
import { hideAllVisibleText, makeTextVisible } from '../helpers/animationText';


const ScrollSequenceVideo = () => {
  /* const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 700px) and (orientation: portrait), (max-height: 700px) and (orientation: landscape)"
  }); */
  const isTabletOrMobileVertical = useMediaQuery({
    query: "(max-width: 700px) and (orientation: portrait)"
  });

  /* repeated states: refs - for functions, state - for layout */
  const [isForward, setIsForward] = useState(true);
  const isForwardRef = useRef(isForward);
  const [textStage, setTextStage] = useState(-1); // from -1 to 2
  const textStageRef = useRef(textStage);
  const [animationDisabledGlobally, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);
  const animationDisabledGloballyRef = useRef(animationDisabledGlobally);

  /* other refs */
  const currentStageRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const forwardVideoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const sectionRef = useRef(null);
  const currentControllerRef = useRef(null);
  const prevScrollRef = useRef(0);

  useEffect(() => {
    animationDisabledGloballyRef.current = animationDisabledGlobally;
  }, [animationDisabledGlobally])

  const stopPointsForward = [
    0,    // Start of stage 0 'in'
    2200, // Start of stage 1 'up'
    4300, // Start of stage 2 'out'
    6640 // End of stage 2
  ];

  const stopPointsReverse =  [
    6640, // Start of stage 0 'in'
    4300, // Start of stage 1 'up'
    2200, // Start of stage 2 'out'
    0,    // End of stage 2
  ];

  const totalStages = stopPointsForward.length;

  const scrollPoints = useMemo(() => {
    if (!sectionRef.current) return [];
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionTop = sectionRef.current.offsetTop;
    //const stageHeight = (sectionHeight - window.innerHeight) / (totalStages);
    const stageHeight = (sectionHeight - window.innerHeight ) / (totalStages - 1);

    return Array.from({ length: totalStages }, (_, index) => {
      return sectionTop + index * stageHeight;
    });
  }, [sectionRef.current?.offsetHeight, sectionRef.current?.offsetTop]);

  const preventDefault = (e) => {
    e = e || document.body.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  function wheel(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  const scrollTo = (pointY) => {
    document.body.scrollTo(0, pointY);
  }

  function disableScroll(scrollToY) {
    isAnimatingRef.current = true;
    setAnimationDisabledGlobally(true)

    currentControllerRef.current = new AbortController();
    const { signal } = currentControllerRef.current;

    document.body.addEventListener('wheel', wheel, {signal, passive: false} );
    document.body.addEventListener('mousewheel', wheel, {signal, passive: false} );
    document.body.addEventListener('DOMMouseScroll', wheel, {signal, passive: false} );
    document.body.addEventListener('touchmove', preventDefault, {signal, passive: false} );
    document.addEventListener('mousewheel', wheel, {signal, passive: false} );
    document.body.removeEventListener('scroll', handleScroll, {signal, passive: false} );

    scrollTo(scrollToY);
    prevScrollRef.current = scrollToY
    document.body.addEventListener('scroll', () => scrollTo(prevScrollRef.current), {signal, passive: false} );
  }

  function enableScroll() {
    document.body.removeEventListener('wheel', wheel);
    document.body.removeEventListener('mousewheel', wheel);
    document.body.removeEventListener('DOMMouseScroll', wheel);
    document.body.removeEventListener('touchmove', preventDefault);
    if (currentControllerRef.current) {
      currentControllerRef.current.abort();
      currentControllerRef.current = null;
    }
    document.body.addEventListener('scroll', handleScroll, {passive: false} );
    setTimeout(() => {
      isAnimatingRef.current = false;
      setAnimationDisabledGlobally(false);
    }, 500); /* timer is important to avoid scroll loop on IOS */
  }

  const stopAnimation = (video) => {
    video.pause();
    enableScroll();
  }

  const animate = (isScrollDown) => {
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const inSection = currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint
    if (inSection) {
      disableScroll(scrollPoints[currentStageRef.current]);

      /* Go up or go down out of animation */
      const outOfAnimationUp = currentStageRef.current === 0 && !isScrollDown;
      const outOfAnimationDown = currentStageRef.current === totalStages - 1 && isScrollDown;

      if (outOfAnimationUp || outOfAnimationDown) {
          /* Hide text if not hidden */
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

      /* set correct direction if needed */
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
      const newScrollPoint = scrollPoints[newStage]
      scrollTo(newScrollPoint)
      prevScrollRef.current = newScrollPoint;

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
        stopAnimation(video)
      }, stopTimeoutTime);
    } else {
      if (textStageRef.current >= 0 || textStage >= 0) {
        textStageRef.current = -1
        setTextStage(-1)
        hideAllVisibleText()
      }

      const shouldResetUp  = /* isTabletOrMobile
        ? */ currentScroll <= firstStageTopPoint - window.innerHeight && currentStageRef.current !== 0
        /* : currentScroll <= firstStageTopPoint && currentStageRef.current !== 0 */

      if (shouldResetUp) {
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


  const handleScroll = throttle((e) => {
    /* disable to avoid trigerring animation when using navigation or scroll to top */
    //if (animationDisabledGloballyRef.current) return;

    const scrollY = document.body.scrollTop;
   
    const flooredPrevScroll = Math.floor(prevScrollRef.current);
    if (flooredPrevScroll === scrollY || isAnimatingRef.current || animationDisabledGloballyRef.current) {
      prevScrollRef.current = scrollY;
      return
    };
    
    const isScrollDown = flooredPrevScroll < scrollY;
    prevScrollRef.current = scrollY;
    animate(isScrollDown);
}, 200);

  useEffect(() => {
    /* timer to wait for scroll to top when page is loaded */
    const timeoutId = setTimeout(() => {
      document.body.addEventListener("scroll", handleScroll, {passive: false});
      document.body.addEventListener("wheel", handleScroll, {passive: false});
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout
      document.body.removeEventListener("scroll", handleScroll, {passive: false});
      document.body.removeEventListener("wheel", handleScroll, {passive: false});
    };
  }, [scrollPoints]);


  return (
    <div className="png__sequence" ref={sectionRef}>
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
          <SkipAnimation stopAnimation={stopAnimation} />
          <ScrollSequenceText />
        </div>
      </div>
    </div>
  );
};

export default ScrollSequenceVideo;
