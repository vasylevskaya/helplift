import React from 'react';

const ScrollSequenceText = ({
  isAnimTextVisible,
  textStage
}) => {
  return (
    <div className={`png__sequence__text ${isAnimTextVisible ? 'visible' : 'hidden'}`}>
      <div className={`png__sequence__text_part ${textStage === 0 ? 'visible' : 'hidden'}`}>
        <p>{'1. Заїзд на підйомник:'}</p>
        <p>{'Користувач заїжджає на платформу підйомника'}</p>
      </div>
      <div className={`png__sequence__text_part ${textStage === 1 ? 'visible' : 'hidden'}`}>
        <p>{'2. Підйом:'}</p>
        <p>{'Користувач натискає кнопку, і підйомник плавно піднімається до потрібного рівня.'}</p>
      </div>
      <div className={`png__sequence__text_part ${textStage === 2 ? 'visible' : 'hidden'}`}>
        <p>{'3. Виїзд з підйомника:'}</p>
        <p>{'Брамка відкривається, дозволяючи користувачу безпечно виїхати.'}</p>
      </div>
    </div>
  );
};

export default ScrollSequenceText;