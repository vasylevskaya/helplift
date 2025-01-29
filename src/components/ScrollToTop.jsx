import React, { useEffect } from 'react'
// import { hideAllVisibleText } from '../helpers/animationText';
import { useRecoilState } from 'recoil';
import { animationDisabledState } from '../recoil/atoms';

const ScrollToTop = () => {
  const [animationDisabledGlobally, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);

  const scrollToTop = () => {
    /* let offset = 150; */
    let progressWrap = document.querySelector(".progress-wrap");
    let progressPath = document.querySelector(".progress-wrap path");
    let pathLength = progressPath.getTotalLength();
    const { style } = progressPath;
  
    const updateProgress = () => {
      let scroll = document.body.scrollTop;
      let height = document.body.scrollHeight - window.innerHeight;
      let progress = pathLength - (scroll * pathLength) / height;
      style.strokeDashoffset = progress;
    };

    if (progressWrap) {
      style.transition = style.WebkitTransition = "none";
      style.strokeDasharray = pathLength + " " + pathLength;
      style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      style.transition = style.WebkitTransition = "stroke-dashoffset 10ms linear";

      updateProgress();

      document.body.addEventListener("scroll", updateProgress);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();

    /* disable animation to avoid trigerring it when using navigation or scroll to top */
    setAnimationDisabledGlobally(true);
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    
    /* enable animation after scroll */
    setTimeout(() => {
      setAnimationDisabledGlobally(false);
    }, 500);
  
    //hideAllVisibleText();
  };
  
  useEffect(() => scrollToTop(), []);

  return (
    <button
      /* add 'disabled' as class to not make a button actully disabled */
      className={`progress-wrap ${animationDisabledGlobally ? 'disabled' : ''}`}
      title='Scroll up'
      onClick={handleClick}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </button>
  );
};

export default ScrollToTop
