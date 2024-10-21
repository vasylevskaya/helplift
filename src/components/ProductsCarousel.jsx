import React, { useRef } from 'react';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import ButtonCircle from './ButtonCircle';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    title: 'Підйомник 1',
    image: img1,
    link: '/product/1',
  },
  {
    id: 2,
    title: 'Підйомник 2',
    image: img2,
    link: '/product/2',
  },
  {
    id: 3,
    title: 'Підйомник 3',
    image: img3,
    link: '/product/3',
  },
  {
    id: 4,
    title: 'Підйомник 4',
    image: img4,
    link: '/product/4',
  },
];

const ProductCarousel = () => {
  const carouselRef = useRef(null);

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
        <ButtonCircle arrowColor='#fff' />
      </button>
      <div className="product-carousel" ref={carouselRef}>
        <div className="product-card-placeholder"> </div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className="carousel-button right" onClick={scrollRight}>
        <ButtonCircle arrowColor='#fff' />
      </button>
    </div>
  );
};

export default ProductCarousel;
