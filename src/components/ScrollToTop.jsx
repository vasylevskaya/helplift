import React from 'react'
import { hideAllVisibleText } from '../helpers/animationText';
import { useRecoilState } from 'recoil';
import { animationDisabledState } from '../recoil/atoms';

const ScrollToTop = () => {
  const [, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);

  const handleClick = (event) => {
    event.preventDefault();
    /* disable animation to avoid trigerring it when using navigation or scroll to top */
    setAnimationDisabledGlobally(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    /* enable animation after scroll */
    setTimeout(() => {
      setAnimationDisabledGlobally(false);
    }, 500);
  
    //hideAllVisibleText();
  };
  

  return (
    <button
      className="progress-wrap cursor-pointer"
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
