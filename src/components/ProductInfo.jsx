import React from 'react';
import { useRecoilState } from 'recoil';
import ButtonCircle from '../components/ButtonCircle';
import { contactFormVisibleState } from '../recoil/atoms';
import checkIcon from '../assets/images/check.svg';
import t from '../assets/text-content.json';
import ProductInfoCharacteristics from './ProductInfoCharacteristics';

const ProductInfo = ({
  productName,
  productPrice,
  productToOrder
}) => {
  const [, setContactFormIsVisible] = useRecoilState(contactFormVisibleState);

  return (
    <div className='product-info'>
      <h2 className='product-name'>{productName}</h2>
      <div className='product-price-wrapper'>
        <p className='product-price'>
          від <span className='font-grotesque'>45 000</span> ₴
        </p>
        {productToOrder && (
          <div className='product-to-order'>
            <img
              src={checkIcon}
              className='check-icon'
              alt='check-icon'
            />
            <p>Під замовлення</p>
          </div>
        )}
      </div>
      <hr className='input-line input-line--top' />
      <ProductInfoCharacteristics />
      <hr className='input-line input-line--bottom' />
      <button
        className='btn-order'
        onClick={() => setContactFormIsVisible(true)}
      >
        <p className='btn-order btn-circle-sibling'>
          Замовити
        </p>
        <ButtonCircle />
      </button>
    </div>
  );
};

export default ProductInfo;