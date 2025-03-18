import React from 'react';
import ProductsCarousel from './ProductsCarousel';

const ProductsSection = ({
  title,
  productsSectionId
}) => {
  return (
    <div className='section-products' id={productsSectionId} >
      <h2 className='section-products_title'>
        {title}
      </h2>
      <ProductsCarousel
        productsSectionId={productsSectionId}
      />
    </div>
  );
};

export default ProductsSection;