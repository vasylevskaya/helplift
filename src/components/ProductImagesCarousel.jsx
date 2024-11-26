// import React, { useState } from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Library styles
// import ButtonCircle from "./ButtonCircle";

// const ProductImagesCarousel = ({ productImages, productId }) => {
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const handleImageChange = (index) => {
//     setActiveImageIndex(index);
//   };

//   return (
//     <div className="product-images">
//       <div className="carousel-container">
//         {/* Up button */}
//         <button className="carousel-button up" onClick={() => handleImageChange((activeImageIndex - 1 + productImages.length) % productImages.length)}>
//           <ButtonCircle />
//         </button>

//         {/* Carousel */}
//         <Carousel
//           selectedItem={activeImageIndex}
//           onChange={handleImageChange}
//           showArrows={false}
//           showThumbs
//           axis="vertical" // Enable vertical scrolling
//           thumbWidth={80} // Thumbnail width
//           renderThumbs={() =>
//             productImages.map((image, index) => (
//               <img
//                 key={`${image}-${index}`}
//                 src={"." + image}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             ))
//           }
//         >
//           {productImages.map((image, index) => (
//             <div key={`${image}-${index}`} className="carousel-image">
//               <img src={"." + image} alt={`Product ${productId} - ${index}`} />
//             </div>
//           ))}
//         </Carousel>

//         {/* Down button */}
//         <button className="carousel-button down" onClick={() => handleImageChange((activeImageIndex + 1) % productImages.length)}>
//           <ButtonCircle />
//         </button>
//       </div>

//       {/* Main active image */}
//       {/* productImages.length > 0 && (
//         <img
//           className="active-image"
//           src={"." + productImages[activeImageIndex]}
//           alt={`Active ${productId}`}
//         />
//       ) */}
//     </div>
//   );
// };

// export default ProductImagesCarousel;


import React, { useRef, useState } from 'react';
import ButtonCircle from './ButtonCircle';

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
            {productImages.map((image, index) => (
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
            ))}
          </div>
        </div>
      </div>
      {productImages.length > 0 && (
        <img
          className="active-image"
          src={'.' + productImages[activeImageIndex]}
          alt={`Active ${productId}`}
        />
      )}
    </div>
  );
};

export default ProductImagesCarousel;

