import React from 'react';
import ProductCarousel from './ProductsCarousel';

const ProductsSection = () => {
  return (
    <div className='section-products' id='section-products'>
      <h2 className='section-products_title'>Підйомники</h2>
      <ProductCarousel />
    </div>
  );
};

export default ProductsSection;