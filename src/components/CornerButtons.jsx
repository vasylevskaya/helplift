import React, { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop'
import IconBigArrow from './IconBigArrow';

const CornerButtons = ({ className }) => {
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  const toggleButtons = () => {
    let offset = 50;
    let section = document.querySelector(".corner-btns");
  
    if (section) {
      window.addEventListener("scroll", function () {
        setAreButtonsVisible(window.pageYOffset > offset)
      });
    }
  };

  useEffect(() => toggleButtons(), [])

  return (
    <div className={`corner-btns corner-btns--${className}
      ${areButtonsVisible ? 'btns-visible' : 'btns-hidden'}`}
    >
      <IconBigArrow className='corner-btns_big-arrow' />
      <div className='corner-btns_all'>
        <a
          href='viber://chat/?number=%2B380507857996'
          className='corner-btns_btn corner-btns_btn--viber'
          title='Viber'
        />
        <a
          href='https://t.me/+380507857996'
          className='corner-btns_btn corner-btns_btn--telegram'
          title='Telegram'
        />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default CornerButtons;
