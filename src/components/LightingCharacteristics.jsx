import React from 'react';

const LightingCharacteristics = () => {
  return (
    <>
      <p className='characteristics-title'>
        Характеристики
      </p>
      <div className='characteristics'>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Потужність:</p>
          <p className='characteristic-text'>
            світлодіодний світильник <span className='font-grotesque'>50</span> Вт
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Ступінь захисту:</p>
          <p className='characteristic-text'>
            IP<span className='font-grotesque'>65</span>
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Колір свічення:</p>
          <p className='characteristic-text'>
            <span className='font-grotesque'>3000-6000</span> К
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Матеріал:</p>
          <p className='characteristic-text'>
            сталева профільна труба <span className='font-grotesque'>80x80</span> мм
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Висота:</p>
          <p className='characteristic-text'>
            від <span className='font-grotesque'>4</span> до <span className='font-grotesque'>7</span> метрів
          </p>
        </div>
      </div>
    </>
  );
};

export default LightingCharacteristics;
