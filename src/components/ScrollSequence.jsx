import { useEffect, useRef, useState, useCallback } from "react";
import { scrollSequenceImages as images } from '../assets/scroll-sequence/ScrollSequenceImagesImport';

const ScrollSequence = () => {
  const intervalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  let   isAnimated = false;
  const [currentStage, setCurrentStage] = useState(0);
  const [textStage, setTextStage] = useState(0); // 0 - 2
  const [isTextVisible, setIsTextVisible] = useState(false);
  const currentFrameIndexRef = useRef(0);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const totalStages = 4;
  const frameIndexesRange = [
    0,    // Start of stage 0
    55,   // Start of stage 1
    128,  // Start of stage 2
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
      
    const startAnimation = () => {
      clearInterval(intervalRef.current);
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
          setCurrentStage(newStage);
          isAnimated = false;
          console.log('stopped');
        }
        console.log(currentFrameIndexRef.current, newCurrentIndex)
        currentFrameIndexRef.current = newCurrentIndex;

        let newTextStage

        for (let i = 0; i <= 2; i++) {
          if ((isScrollDown && newCurrentIndex > frameIndexesRange[i] && newCurrentIndex <= frameIndexesRange[i + 1])
            || (!isScrollDown && newCurrentIndex >= frameIndexesRange[i] && newCurrentIndex < frameIndexesRange[i + 1])) {
            newTextStage = i
          }
        }

        if (textStage !== newTextStage) {
          setTextStage(newTextStage)
        }

        updateImage(newCurrentIndex);
      }, 20);
    }

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
  
        // Calculate scaling to mimic 'object-fit: cover'
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
  
        let sx, sy, sWidth, sHeight;
  
        if (imgAspect > canvasAspect) {
          // Image is wider than the canvas
          sWidth = img.height * canvasAspect;
          sHeight = img.height;
          sx = (img.width - sWidth) / 2;
          sy = 0;
        } else {
          // Image is taller than the canvas
          sWidth = img.width;
          sHeight = img.width / canvasAspect;
          sx = 0;
          sy = (img.height - sHeight) / 2;
        }
  
        context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
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

    // Trigger animation only when scroll position is within the section
    
    if (currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint) {
      if (!isTextVisible) setIsTextVisible(true)

      if (currentStage === 0 && !isScrollDown) { // exit from animation section up
        return;
      }
  
      if (currentStage === totalStages - 1 && isScrollDown) {  // exit from animation section down
        return;
      }

      animateSequence(isScrollDown);
      isAnimated = true;
    } else {
      if (isTextVisible) setIsTextVisible(false)

      if (currentScroll <= firstStageTopPoint && currentStage !== 0) {
        setCurrentStage(0)
        currentFrameIndexRef.current = frameIndexesRange[0]

      } else if (currentScroll >= lastStageTopPoint && currentStage !== totalStages - 1) {
        setCurrentStage(totalStages - 1)
        currentFrameIndexRef.current = frameIndexesRange[totalStages - 1]
      }
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
    return clearInterval(intervalRef.current);
  }, [images]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="png__sequence__canvas"
      ></canvas>
      <div className={`png__sequence__text ${isTextVisible ? 'visible' : 'hidden'}`}>
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

export default ScrollSequence;