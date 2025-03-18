import React from 'react';

const LightingDescription = ({ productDescription }) => {

  return (
    <div className='product-description'>
      <h5>Опис</h5>
      {productDescription.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      <p>Можливе виготовлення ліхтарних стовпів за індивідуальним замовленням:</p>
      <ul>
        <li>Висотою до 7 метрів</li>
        <li>У будь-якому кольорі за бажанням замовника</li>
        <li>З різними параметрами освітлення та кріплення</li>
      </ul>
      <p>Звертайтеся, і ми виготовимо ліхтарний стовп відповідно до ваших потреб!</p>
    </div>
  );
};

export default LightingDescription;
