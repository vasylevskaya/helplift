import React from 'react';

const IconBigArrow = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="58"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -108 56 199"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="-454.7"
          y1="41.28"
          x2="-483.71"
          y2="41.28"
          gradientTransform="translate(-445.23 80.02) rotate(180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0"></stop>
          <stop offset="1" stopColor="#fff"></stop>
        </linearGradient>
        <mask
          id="mask"
          x="-0.72"
          y="26.37"
          width="58"
          height="65.63"
          maskUnits="userSpaceOnUse"
        >
          <g transform="translate(-0.72 0)">
            <rect className="cls-1" x="9.47" y="30.51" width="29.01" height="16.46" transform="translate(-6.66 5.02) rotate(-10.51)"></rect>
            <rect className="cls-2" y="56.65" width="58" height="35.35"></rect>
            <rect className="cls-2" x="38.02" y="26.37" width="19.98" height="39.73"></rect>
          </g>
        </mask>
      </defs>
      <g className="cls-3" transform-origin="27.99 62.71">
          <path className="cls-4" d="M1.23,62.71A27.48,27.48,0,1,0,12.85,40.54" transform="translate(-0.72 0)"></path>
      </g>
      <line className="cls-5" x1="28.77" y1="61" x2="28.77" transform-origin="28.77 61"></line>
      <path className="cls-6" d="M29,69V60h4Z" transform="translate(-0.72 0)"></path>
    </svg>
  );
};

export default IconBigArrow;
