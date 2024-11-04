import React from 'react';
import t from '../assets/text-content.json';
import sceneImg from '../assets/images/scene.png'

const ImageTextSection = () => {
  return (
    <div className='section-image-text'>
      <div className='section-image-text_content'>
        <p className='section-image-text_content_text'>
          {t['main']['text-1']}
        </p>
        <p className='section-image-text_content_text'>
          {t['main']['text-2']}
        </p>
      </div>
      {/* <img
        className='section-image-text_image'
        src={sceneImg}
        alt='scene'
      /> */}
    </div>
  );
};

export default ImageTextSection;