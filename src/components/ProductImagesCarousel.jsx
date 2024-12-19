import React, { useRef, useState } from 'react';
import ButtonCircle from './ButtonCircle';
import imgPlaceholder from '../assets/images/img-placeholder.webp';

const ProductImagesCarousel = ({ productImages, productId }) => {
  const carouselRef = useRef(null);
  const defaultActiveIndex = 0;
  const [activeImageIndex, setActiveImageIndex] = useState(defaultActiveIndex);

  const scrollByImageHeight = (direction) => {
    let newActiveImageIndex = activeImageIndex + direction * 1;
    

    if (newActiveImageIndex < 0 || newActiveImageIndex > productImages.length - 1) {
      return;
    }

    if (carouselRef.current) {
      const imageHeight = carouselRef.current.children[newActiveImageIndex].offsetHeight;
      const imagesGap = 10; /* ProductPage.css: --PI-carousel-gap */
      const imagesPerPage = 4; /* ProductPage.css: --PI-carousel-gap */
      const translateValue = -(imageHeight + imagesGap) * newActiveImageIndex;
      const maxTranslateValue = -(imageHeight + imagesGap) * (productImages.length - imagesPerPage);
      
      if (translateValue >= maxTranslateValue) { /* >= because is negative values */
        carouselRef.current.style.transform = `translateY(${translateValue}px)`;
      }
    }

    setActiveImageIndex(newActiveImageIndex);
  };

  const scrollLeft = () => scrollByImageHeight(-1);
  const scrollRight = () => scrollByImageHeight(1);

  return (
    <div className="product-images">
      <button
        className="carousel-button up"
        onClick={scrollLeft}
        disabled={activeImageIndex === defaultActiveIndex}
      >
        <ButtonCircle />
      </button>
      <button
        className="carousel-button down"
        onClick={scrollRight}
        disabled={activeImageIndex === productImages.length - 1}
      >
        <ButtonCircle />
      </button>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            {productImages?.length > 1 &&
              productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`carousel-image ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={'.' + image}
                    alt={`Product ${productId} - ${index}`}
                  />
                </button>
              ))
            }
            
          </div>
        </div>
      </div>
      <img
        className="active-image"
        src={productImages.length > 0 ? '.' + productImages[activeImageIndex] : imgPlaceholder}
        alt={productImages.length > 0 ? `Active ${productId}` : 'Image placeholder'}
      />
    </div>
  );
};

export default ProductImagesCarousel;

