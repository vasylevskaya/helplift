import React from 'react';
import ScrollSequence from './ScrollSequence';
import ScrollSequenceVideo from './ScrollSequenceVideo';

const AnimatedSection = () => {
  return (
    <section className='section-animated'>
      <div className='section-animated_text'></div>
      <ScrollSequenceVideo />
    </section>
  );
};

export default AnimatedSection;
