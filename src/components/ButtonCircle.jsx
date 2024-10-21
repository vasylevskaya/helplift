import { useState } from "react";

const ButtonCircle = ({
  className = 'black',
  arrowColor = '#151517',
  arrowColorHover,
  isHovered,
  isLong
}) => {
  return (
    <div
      className={`button-circle ${className}`}
      style={{ backgroundColor: className }}
    >
      {isLong
        ? <svg width="36" height="4" viewBox="0 0 36 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="27"
              y1="3.5"
              y2="3.5"
              stroke={isHovered && arrowColorHover ? arrowColorHover : arrowColor}
            ></line>
            <path
              d="M36 4H30.8571H27V0L36 4Z"
              fill={isHovered && arrowColorHover ? arrowColorHover : arrowColor}
            ></path>
          </svg>
        : <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="10.915"
            y1="4.46484"
            x2="0.915039"
            y2="4.46484"
            stroke={isHovered && arrowColorHover ? arrowColorHover : arrowColor}
          ></line>
          <path
            d="M18.915 4.96484H13.7722H9.91504V0.964844L18.915 4.96484Z"
            fill={isHovered && arrowColorHover ? arrowColorHover : arrowColor}
          ></path>
        </svg>
      }
    </div>
  )
}

export default ButtonCircle;