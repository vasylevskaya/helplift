import React from 'react';

const ScrollSequenceText = () => {
  return (
    <>
      <div id="text-stage-0" className={`png__sequence__text_part`}>
        <p>{'1. Заїзд на підйомник:'}</p>
        <p>{'Користувач заїжджає на платформу підйомника'}</p>
      </div>
      <div id="text-stage-1" className={`png__sequence__text_part`}>
        <p>{'2. Підйом:'}</p>
        <p>{'Користувач натискає кнопку, і підйомник плавно піднімається до потрібного рівня.'}</p>
      </div>
      <div id="text-stage-2" className={`png__sequence__text_part`}>
        <p>{'3. Виїзд з підйомника:'}</p>
        <p>{'Брамка відкривається, дозволяючи користувачу безпечно виїхати.'}</p>
      </div>
    </>
  );
};

export default ScrollSequenceText;