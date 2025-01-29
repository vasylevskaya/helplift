import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { headerThemeState } from '../recoil/atoms';
import '../styles/ProductPage.css';
import Header from '../components/Header';
import ProductImagesCarousel from '../components/ProductImagesCarousel';
import products from '../assets/products.json';
import ProductDescriptionTabs from '../components/ProductDescriptionTabs';
import ProductCarousel from '../components/ProductsCarousel';
import ProductInfo from '../components/ProductInfo';
import ProductShippingInfo from '../components/ProductShippingInfo';

const ProductPage = () => {
  const { id } = useParams()
  const product = products.find(product => (
    product.id.toString() === id
  ))
  const [, setHeaderTheme] = useRecoilState(headerThemeState);

  useEffect(() => {
    setHeaderTheme('light');
    //document.body.scrollTo(0, 0); no need for now cause product card has its own
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
          <ProductCarousel currentProductId={id} />
        </>
        : <p>{'Товар не знайдено'}</p>
      }
    </div>
  );
};

export default ProductPage;
