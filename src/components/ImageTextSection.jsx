import React from 'react';
import t from '../assets/text-content.json';
import sceneImg from '../assets/images/scene.png'

const ImageTextSection = () => {
  return (
    <div className='section-image-text'>
      <div className='section-image-text_content'>
        <h3 className='section-image-text_content_title'>
          {t['about-us']['heading']}
        </h3>
        <p className='section-image-text_content_text'>
          {t['about-us']['main-text']}
        </p>
      </div>
      <img
        className='section-image-text_image'
        src={sceneImg}
        alt='scene'
      />
    </div>
  );
};

export default ImageTextSection;