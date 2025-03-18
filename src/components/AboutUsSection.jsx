import React from 'react';
import t from '../assets/text-content.json';

const AboutUsSection = () => {
  return (
    <div className='section-about-us' id='section-about-us'>
      <div className='section-about-us_content'>
        <h3 className='section-about-us_content_title'>
          {t['about-us']['heading']}
        </h3>
        <p className='section-about-us_content_text'>
          {t['about-us']['text-1']}
        </p>
        <p className='section-about-us_content_text'>
          {t['about-us']['text-2']}
        </p>
        <p className='section-about-us_content_text'>
          {t['about-us']['text-3']}
        </p>
        <p className='section-about-us_content_text'>
          {t['about-us']['text-4']}
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;