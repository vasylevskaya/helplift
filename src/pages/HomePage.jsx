import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import '../styles/HomePage.css';
import AboutUsSection from '../components/AboutUsSection';
import AnimatedSection from '../components/AnimatedSection';
import ProductsSection from '../components/ProductsSection';
import ImageTextSection from '../components/ImageTextSection';
import { headerThemeState, animationDisabledState } from '../recoil/atoms';

const HomePage = () => {
  const location = useLocation();
  const [headerTheme, setHeaderTheme] = useRecoilState(headerThemeState);
  const imageTextSectionRef = useRef(null);
  const aboutUsSectionRef = useRef(null);
  const animatedSectionRef = useRef(null);
  const productsSectionRef = useRef(null);
  const [, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);

  const toggleHeaderTheme = () => {
    const currentScroll = document.body.scrollTop;

    if (headerTheme === 'dark') {
      if ((currentScroll >= aboutUsSectionRef.current.offsetTop 
        && currentScroll < aboutUsSectionRef.current.offsetTop + aboutUsSectionRef.current.offsetHeight)
        || (currentScroll >= productsSectionRef.current.offsetTop 
          & currentScroll < productsSectionRef.current.offsetTop + productsSectionRef.current.offsetHeight)) {
            setHeaderTheme('light')
      }
    }

    if (headerTheme === 'light') {
      if ((currentScroll >= imageTextSectionRef.current.offsetTop 
        && currentScroll < imageTextSectionRef.current.offsetTop + imageTextSectionRef.current.offsetHeight)
        || (currentScroll >= animatedSectionRef.current.offsetTop 
          & currentScroll < animatedSectionRef.current.offsetTop + animatedSectionRef.current.offsetHeight)
        ) {
          setHeaderTheme('dark')
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener("scroll", toggleHeaderTheme);
    document.body.addEventListener("wheel", toggleHeaderTheme);

    return () => {
      document.body.removeEventListener("scroll", toggleHeaderTheme);
      document.body.removeEventListener("wheel", toggleHeaderTheme);
    };
  }, [toggleHeaderTheme]);

  /* Scrolls to the target section after navigating from another page */
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          /* disable animation to avoid trigerring it when using navigation or scroll to top */
          setAnimationDisabledGlobally(true);
          document.body.scrollTo({ top: element.offsetTop, behavior: "smooth" });
          /* enable animation after scroll */
          setTimeout(() => {
            setAnimationDisabledGlobally(false);
          }, 500);
        }
      };
  
      // Delay to ensure DOM rendering is complete
      const timeoutId = setTimeout(scrollToElement, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  useEffect(() => setHeaderTheme('dark'), [])

  return (
    <div className='home-page'>
      <div ref={imageTextSectionRef}>
        <ImageTextSection />
      </div>
      <div ref={aboutUsSectionRef}>
        <AboutUsSection />
      </div>
      <div ref={animatedSectionRef}>
        <AnimatedSection />
      </div>
      <div ref={productsSectionRef}>
        <ProductsSection
          title="Підйомники"
          productsSectionId="products-lifts"
        />
        <ProductsSection
          title="Освітлення"
          productsSectionId="products-lighting"
        />
      </div>
    </div>
  );
};

export default HomePage;