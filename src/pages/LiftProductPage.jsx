import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { headerThemeState } from '../recoil/atoms';
import '../styles/ProductPage.css';
import Header from '../components/Header';
import ProductImagesCarousel from '../components/ProductImagesCarousel';
import ProductDescriptionTabs from '../components/ProductDescriptionTabs';
import ProductsCarousel from '../components/ProductsCarousel';
import ProductInfo from '../components/ProductInfo';
import ProductShippingInfo from '../components/ProductShippingInfo';
import products from '../assets/products-lifts.json'; /* !! get images from public folder !! */

const LiftProductPage = () => {
  const { id } = useParams()
  const product = products.find(product => (
    product.id.toString() === id
  ))
  const [, setHeaderTheme] = useRecoilState(headerThemeState);

  useEffect(() => {
    setHeaderTheme('light');
    document.body.scrollTo(0, 0); // no need for now cause product card has its own

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='product-page'>
      <Header className='light' />
      {product
        ? <>
          <div className='section-main'>
            <ProductImagesCarousel
              productId={product.id}
              productImages={product.images}
            />
            <ProductInfo
              productName={product.name}
              productPrice={product.price}
              productToOrder={product.to_order}
              isLift={true}
            />
          </div>
          <div className='section-secondary'>
            <ProductDescriptionTabs product={product} />
            <ProductShippingInfo />
          </div>
          <p className='finish-text'>
            {'З радістю прорахуємо та виконаємо індивідуальне замовлення під вас.'}
          </p>
          <h3 className='product-carousel-title'>
            {'Інші підйомники'}
          </h3>
          <ProductsCarousel
            currentProductId={id}
            productsSectionId="products-lifts"
          />
        </>
        : <div className='product-not-found'>
            <p>{'Товар не знайдено'}</p>
          </div>
      }
    </div>
  );
};

export default LiftProductPage;
