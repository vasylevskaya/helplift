 /* Add button-gradient element to its a parent */

const ButtonGradient = ({ children }) => {
  return (
    <div className="icon-group">
      <div className="icon-ring">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none" 
          mlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M 7.04626,15.459 C 2.44231,21.9486 0.151989,29.7967 0.54286,37.7439 0.933731,45.6911 3.98313,53.2766 9.20168,59.283 14.4202,65.2895 21.5054,69.3686 29.32,70.8659 c 7.8147,1.4972 15.9058,0.3257 22.9749,-3.3266 7.069,-3.6523 12.7062,-9.5735 16.0068,-16.8134 3.3006,-7.24 4.0732,-15.3789 2.1939,-23.1106 C 68.6163,19.8837 64.194,13.0075 57.9385,8.09028 51.6829,3.17308 43.9568,0.5 36,0.5"
            stroke="#fff"></path>
        </svg>
      </div>
      <div className="icon-gradient"></div>
      <div className="icon">
         {children}
      </div>
    </div>
  )
}

export default ButtonGradient;