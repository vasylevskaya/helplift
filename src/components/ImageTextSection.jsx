import React from 'react';
import bgImg from '../assets/images/scene.png';

const ImageTextSection = () => {
  return (
    <div className='section-image-text'>
      <img
        src={bgImg}
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

export default ImageTextSection;