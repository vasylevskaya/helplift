import React from 'react';
import { Element } from 'react-scroll';
import ProductCarousel from './ProductsCarousel';

const ProductsSection = () => {
  return (
    <Element name={'products-section'}>
      <div className='section-products'>
        <h2 className='section-products_title'>Підйомники</h2>
        <ProductCarousel />
      </div>
    </Element>
  );
};

export default ProductsSection;