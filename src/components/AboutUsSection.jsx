import React from 'react';
import { Element } from 'react-scroll';
import t from '../assets/text-content.json';

const AboutUsSection = () => {
  return (
    <Element name={'about-us-section'}>
      <div className='section-about-us'>
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
        </div>
      </div>
    </Element>
  );
};

export default AboutUsSection;