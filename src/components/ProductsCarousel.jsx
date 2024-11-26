import React, { useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ButtonCircle from './ButtonCircle';
import ProductCard from './ProductCard';
import products from '../assets/products.json';
import ROUTES from '../assets/routes.json';

const ProductCarousel = ({
  /* optional, to exclude a product that is displayed on ProductPage from the carousel */
  currentProductId,
}) => {
  const carouselRef = useRef(null);

  /* check if its product page */
  const { pathname } = useLocation();
  const { id } = useParams();
  const isProductPage = pathname === ROUTES.product_page.replace(':id', id);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="product-carousel-wrapper">
      <button className="carousel-button left" onClick={scrollLeft}>
        <ButtonCircle />
      </button>
      <div className="product-carousel" ref={carouselRef}>
        <div className="product-card-placeholder"> </div>
        {products.map((product) => (
          /* excluding a product that is displayed on ProductPage from the carousel */
          currentProductId !== `${product.id}` &&
            <ProductCard
              key={product.id}
              product={product}
              isProductPage={isProductPage}
            />
        ))}
      </div>
      <button className="carousel-button right" onClick={scrollRight}>
        <ButtonCircle />
      </button>
    </div>
  );
};

export default ProductCarousel;
