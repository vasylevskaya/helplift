import React, { useState } from 'react';
import ButtonCircle from './ButtonCircle';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCirclePosition({ x: offsetX, y: offsetY });
  };

  return (
    <a href={product.link}>
      <div
        key={product.id}
        className={`product-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ position: 'relative', overflow: 'hidden' }} // Keeps the circle inside the card
      >
        <h4 className='product-card_title cormorant'>
          {product.title}
        </h4>
        {product.image && (
          <img
            className='product-card_img'
            src={product.image}
            alt={product.title}
          />
        )}
        <ButtonCircle
          className='transparent'
          arrowColor='#fff'
          arrowColorHover='#151517'
          isHovered={isHovered}
          isLong={true}
        />
        {isHovered && (
          <div
            className='hover-circle'
            style={{
              left: circlePosition.x,
              top: circlePosition.y,
            }}
          ></div> // Circle that follows the cursor
        )}
      </div>
    </a>
  );
};

export default ProductCard;
