const ButtonCircle = ({
  backgroundColor = '#151517',
  arrowColor = '#ffffff',
  arrowColorHover,
  backgroundColorHover,
  isHovered,
  isLong
}) => {
  
  return (
    <div
      className={`btn-circle`}
      style={{ backgroundColor: isHovered && backgroundColorHover
        ? backgroundColorHover
        : backgroundColor
      }}
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