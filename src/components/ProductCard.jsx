import React, { useState } from 'react';
import ButtonCircle from './ButtonCircle';
import { Link } from 'react-router-dom';
import imgPlaceholder from '../assets/images/img-placeholder.webp';

const ProductCard = ({
  product,
  route,
  isProductPage /* optional */
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  let image = product.images[0];

  if (product.images[0] && isProductPage) {
    image = `.${product.images[0]}` /* add extra . to access assets correctly */
  }

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCirclePosition({ x: offsetX, y: offsetY });
  };

  return (
    <Link
      className='product-card-link'
      to={route.replace(':id', product.id)}
      onClick={() => document.body.scrollTo(0, 0)}
    >
      <div
        key={product.id}
        className={`product-card ${isHovered ? 'hovered' : ''} btn-circle-parent`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <h4 className='product-card_title'>{product.name}</h4>
        <img
          className='product-card_img'
          src={image ?? imgPlaceholder}
          alt={product.name}
          loading='lazy'
        />
        <ButtonCircle
          backgroundColor='transparent'
          arrowColor='#ffffff'
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
          ></div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
