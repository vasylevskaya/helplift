import React from 'react';
import ScrollSequence from './ScrollSequence';

const AnimatedSection = () => {
  return (
    <section className='section-animated'>
      <div className='section-animated_text'></div>
      <ScrollSequence />
    </section>
  );
};

export default AnimatedSection;
