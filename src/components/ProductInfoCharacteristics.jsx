import React from 'react';

const ProductInfoCharacteristics = () => {
  return (
    <>
      <p className='characteristics-title'>
        Характеристики
      </p>
      <div className='characteristics'>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Тип підйомника:</p>
          <p className='characteristic-text'>Вертикальний</p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Привід:</p>
          <p className='characteristic-text'>Електричний</p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Вантажопідйомність:</p>
          <p className='characteristic-text'>
            <span className='font-grotesque'>250</span> кг. MAX
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>"Напруга живлення:</p>
          <p className='characteristic-text'>
            мережа <span className='font-grotesque'>220</span> В
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Ступінь захисту:</p>
          <p className='characteristic-text'>
            IP <span className='font-grotesque'>54</span>
          </p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Країна виробник:</p>
          <p className='characteristic-text'>Україна</p>
        </div>
        <div className='characteristics_row'>
          <p className='characteristic-title'>Гарантія:</p>
          <p className='characteristic-text'>
            <span className='font-grotesque'>12</span> місяців
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductInfoCharacteristics;
