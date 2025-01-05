import React from 'react';
import { useMediaQuery } from 'react-responsive';
import imgDesktop from '../assets/images/scene.png';
import imgTabletHorizontal from '../assets/images/scene-tablet-horizontal.png';
import imgTabletVertical from '../assets/images/scene-tablet-vertical.png';
import imgMobHorizontal from '../assets/images/scene-mob-horizontal.png';
import imgMobVertical from '../assets/images/scene-mob-vertical.png';

const ImageTextSection = () => {
  const isTabletHorizontal = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)' });
  const isTabletVertical = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)' });
  const isMobHorizontal = useMediaQuery({ query: '(max-width: 767px) and (orientation: landscape)' });
  const isMobVertical = useMediaQuery({ query: '(max-width: 767px) and (orientation: portrait)' });

  // get image according to the screen size and orientation
  const getImage = () => {
    if (isTabletHorizontal) return imgTabletHorizontal;
    if (isTabletVertical) return imgTabletVertical;
    if (isMobHorizontal) return imgMobHorizontal;
    if (isMobVertical) return imgMobVertical;

    return imgDesktop;
  }

  return (
    <div className='section-image-text'>
      <img
        src={getImage()}
        className='section-image-text_bg-img'
      />
      <div className='section-image-text_content'>
        <p className='section-image-text_content_title'>
          Виробництво підйомників
        </p>
        <p className='section-image-text_content_subtitle'>
          для людей з інвалідністю
        </p>
        <p className='section-image-text_content_text'>
          Якість, надійність та підтримка<br />
          від українського виробника.
        </p>
      </div>
    </div>
  );
};

export default React.memo(ImageTextSection);
