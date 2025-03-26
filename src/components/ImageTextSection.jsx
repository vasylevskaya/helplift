import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import imgDesktop from '../assets/images/scene.png';
import imgTabletHorizontal from '../assets/images/scene-tablet-horizontal.png';
import imgTabletVertical from '../assets/images/scene-tablet-vertical.png';
import imgMobHorizontal from '../assets/images/scene-mob-horizontal.png';
import imgMobVertical from '../assets/images/scene-mob-vertical.png';
import Loader from './Loader';

const ImageTextSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackImage, setFallbackImage] = useState(imgDesktop);

  // Media queries for responsive logic
  const isTabletHorizontal = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)' });
  const isTabletVertical = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)' });
  const isMobHorizontal = useMediaQuery({ query: '(max-width: 767px) and (orientation: landscape)' });
  const isMobVertical = useMediaQuery({ query: '(max-width: 767px) and (orientation: portrait)' });

  // Determine fallback image on mount or when media queries change
  useEffect(() => {
    if (isTabletHorizontal) {
      setFallbackImage(imgTabletHorizontal);
    } else if (isTabletVertical) {
      setFallbackImage(imgTabletVertical);
    } else if (isMobHorizontal) {
      setFallbackImage(imgMobHorizontal);
    } else if (isMobVertical) {
      setFallbackImage(imgMobVertical);
    } else {
      setFallbackImage(imgDesktop);
    }
    setIsLoading(false); // Set loading to false after determining the image
  }, [isTabletHorizontal, isTabletVertical, isMobHorizontal, isMobVertical]);

  return (
    <div className="section-image-text">
      {isLoading ? (
        <Loader />
      ) : (
        <img
          src={fallbackImage} // Fallback image
          className="section-image-text_bg-img"
          alt="Background scene showing the lift"
          loading="lazy"
        />
      )}
      <div className="section-image-text_content">
        <p className="section-image-text_content_title">
          Виробництво підйомників
        </p>
        <p className="section-image-text_content_subtitle">
          для людей з інвалідністю <br/> та вуличного освітлення
        </p>
      </div>
    </div>
  );
};

export default React.memo(ImageTextSection);
