import { useEffect, useRef, useState, useCallback } from "react";
import { scrollSequenceImages as images } from '../assets/scroll-sequence/ScrollSequenceImagesImport';

const ScrollSequence = () => {
  const intervalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  let   isAnimated = false;
  const [currentStage, setCurrentStage] = useState(0);
  const currentFrameIndexRef = useRef(0);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const totalStages = 4;
  const frameIndexesRange = [
    0,    // Start of stage 0
    85,   // Start of stage 1
    180,  // Start of stage 2
    images.length - 1 // End of stage 3
  ];

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  preloadImages(images);
  
  const getScrollPoints = () => {
    if (!sectionRef.current) return [];
  
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionTop = sectionRef.current.offsetTop;
    let stageHeight = sectionHeight / (totalStages - 1); // Adjust to totalStages - 1
    stageHeight = (sectionHeight - stageHeight) / (totalStages - 1)
  
    return Array.from({ length: totalStages }, (_, index) => {
      return sectionTop + index * stageHeight;
    });
  };  

  const preventDefault = (e) => e.preventDefault();

  const disableScroll = () => {
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
  };

  const enableScroll = () => {
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
  };

  const scrollToPosition = (position) => {
    console.log(position)
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  const animateSequence = useCallback((isScrollDown) => {
    if (isAnimated) return;
    if (isAnimating) return;
    setIsAnimating(true);
    isAnimated = true;
    disableScroll();

    const targetIndex = isScrollDown
      ? frameIndexesRange[currentStage + 1]
      : frameIndexesRange[currentStage - 1];
      
    const startAnimation = () => {
      clearInterval(intervalRef.current);
      console.log('started phase' + currentStage);
      const newStage = isScrollDown ? currentStage + 1 : currentStage - 1;
      const scrollPoints = getScrollPoints();
      scrollToPosition(scrollPoints[newStage]);
      intervalRef.current = setInterval(() => {
        const newCurrentIndex = isScrollDown
        ? currentFrameIndexRef.current + 1
        : currentFrameIndexRef.current - 1;
        if (newCurrentIndex == frameIndexesRange[newStage]) {
          clearInterval(intervalRef.current);
          enableScroll();
          setIsAnimating(false);
          isAnimated = false;
          setCurrentStage(isScrollDown ? currentStage + 1 : currentStage - 1);
          console.log('stopped');
        }
        currentFrameIndexRef.current = newCurrentIndex;
        updateImage(newCurrentIndex);
      }, 20);
    }

    // const animate = () => {
    //   if (
    //     (isScrollDown && currentFrameIndexRef.current >= targetIndex) ||
    //     (!isScrollDown && currentFrameIndexRef.current <= targetIndex)
    //   ) {
    //     const newCurrentStage = isScrollDown
    //       ? Math.min(currentStage + 1, totalStages - 1)
    //       : Math.max(currentStage - 1, 0);

    //     const scrollPoints = getScrollPoints();
    //     scrollToPosition(scrollPoints[newCurrentStage]);

    //     setTimeout(() => {
    //       enableScroll();
    //       setIsAnimating(false);
    //       setCurrentStage(newCurrentStage);
    //     }, 500);
    //     return;
    //   }

    //   const newCurrentIndex = isScrollDown
    //     ? currentFrameIndexRef.current + 1
    //     : currentFrameIndexRef.current - 1;
    //   currentFrameIndexRef.current = newCurrentIndex;
    //   updateImage(newCurrentIndex);
    //   requestAnimationFrame(animate);
    // };

    // animate();
    startAnimation();

  }, [currentStage, isAnimating]);

  const updateImage = useCallback((index) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = images[index];
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, []);

  const handleScroll = (e) => {
    if (isAnimating) return;

    const isScrollDown = e.deltaY > 0;
    const scrollPoints = getScrollPoints();
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const sectionBottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
    const currentScroll = window.scrollY;

    if (isAnimated) {
      // scrollToPosition(scrollPoints[currentStage]);
      // console.log('scrolling to ' + scrollPoints[currentStage]);
      return
    };
    // console.log(currentScroll, scrollPoints)

    // console.log(currentScroll, lastStageTopPoint, sectionBottom)

    // if (isScrollDown && currentScroll >= lastStageTopPoint && currentScroll < sectionBottom) {
    //   console.log('out of animation')
    //   disableScroll()
    //   scrollToPosition(sectionBottom);
    //   setTimeout(() => {
    //     enableScroll();
    //   }, 500);
    //   return;
    // }

    // if (!isScrollDown && currentScroll === sectionBottom) {
    //   console.log('in animation')
    //   disableScroll()
    //   scrollToPosition(lastStageTopPoint);
    //   setTimeout(() => {
    //     enableScroll();
    //   }, 500);
    //   return;
    // }

    // Trigger animation only when scroll position is within the section
    if (currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint) {
      if (currentStage === 0 && !isScrollDown) { // exit from animation section up
        return;
      }
  
      if (
        (currentStage === 0 && !isScrollDown) ||
        (currentStage === totalStages - 1 && isScrollDown)
        
      ) {
        return;
      }

      animateSequence(isScrollDown);
      isAnimated = true;
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    getScrollPoints();
    return  clearInterval(intervalRef.current);
  }, [images]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="png__sequence__canvas"
      ></canvas>
    </div>
  );
};

export default ScrollSequence;