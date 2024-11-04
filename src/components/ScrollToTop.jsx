import React, { useEffect } from 'react'


const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  let progressPath = document.querySelector(".progress-wrap path");
  let pathLength = progressPath.getTotalLength();
  const updateProgress = () => {
    let scroll = window.pageYOffset;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  if (progressWrap) {
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    updateProgress();
    window.addEventListener("scroll", updateProgress);
    /* window.addEventListener("scroll", function () {
      if (window.pageYOffset > offset) {
        progressWrap.classList.add("active-progress");
      } else {
        document
          .querySelector(".progress-wrap")
          .classList.remove("active-progress");
      }
    }); */
    progressWrap.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    });
  }
};

const ScrollToTop = () => {
  useEffect(() => scrollToTop(), [])

  return (
    <div className="progress-wrap cursor-pointer" title='Scroll up'>
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ScrollToTop
