import React, { Suspense } from 'react';
import Loader from './Loader';

const LazyImage = React.lazy(() =>
  new Promise((resolve) => {
    const image = new Image();
    image.src = require('../assets/images/scene.png'); // Load your image dynamically
    image.onload = () =>
      resolve({
        default: () => (
          <Suspense fallback={<Loader />}>
            <img
              src={image.src}
              className='section-image-text_bg-img'
              alt='Background'
            />
          </Suspense>
        ),
      });
  })
);

const ImageTextSection = () => {
  return (
    <div className='section-image-text'>
      <LazyImage />
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
