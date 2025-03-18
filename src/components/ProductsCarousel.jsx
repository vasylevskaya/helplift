import React, { useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ButtonCircle from './ButtonCircle';
import ProductCard from './ProductCard';
import ROUTES from '../assets/routes.json';

import productsLifts from '../assets/products-lifts.json'; /* !! get images from public folder !! */
import productsLighting from '../assets/products-lighting.json'; /* !! get images from public folder !! */

const ProductsCarousel = ({
  /* optional, to exclude a product that is displayed on ProductPage from the carousel */
  currentProductId,
  productsSectionId
}) => {
  const carouselRef = useRef(null);

  /* check if its product page */
  const { pathname } = useLocation();
  const { id } = useParams();
  const route = productsSectionId === 'products-lifts'
    ? ROUTES.product_lifts_page
    : ROUTES.product_lighting_page
  const isProductPage = pathname === route.replace(':id', id);

  const products = productsSectionId === 'products-lifts'
    ? productsLifts
    : productsLighting

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
              route={route}
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

export default ProductsCarousel;
