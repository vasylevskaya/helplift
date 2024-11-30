import React, { useState } from 'react';
import ButtonCircle from './ButtonCircle';
import ROUTES from '../assets/routes.json';
import { Link } from 'react-router-dom';


const ProductCard = ({
  product,
  isProductPage /* optional */
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const image = isProductPage /* add extra . to access assets correctly */
    ? `.${product.images[0]}`
    : product.images[0]

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCirclePosition({ x: offsetX, y: offsetY });
  };

  return (
    <Link
      className='product-card-link'
      to={ROUTES.product_page.replace(':id', product.id)}
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
        {image && (
          <img
            className='product-card_img'
            src={image}
            alt={product.name}
          />
        )}
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
