import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import '../styles/HomePage.css';
import AboutUsSection from '../components/AboutUsSection';
import AnimatedSection from '../components/AnimatedSection';
import ProductsSection from '../components/ProductsSection';
import ImageTextSection from '../components/ImageTextSection';
import { headerThemeState } from '../recoil/atoms';

const HomePage = () => {
  const location = useLocation();
  const [headerTheme, setHeaderTheme] = useRecoilState(headerThemeState);
  const imageTextSectionRef = useRef(null);
  const aboutUsSectionRef = useRef(null);
  const animatedSectionRef = useRef(null);
  const productsSectionRef = useRef(null);

  const toggleHeaderTheme = () => {
    const currentScroll = window.scrollY;

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
    window.addEventListener("scroll", toggleHeaderTheme);
    window.addEventListener("wheel", toggleHeaderTheme);

    return () => {
      window.removeEventListener("scroll", toggleHeaderTheme);
      window.removeEventListener("wheel", toggleHeaderTheme);
    };
  }, [toggleHeaderTheme]);

  /* Scrolls to the target section after navigating from another page */
  useEffect(() => {
    console.log(location)
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
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
        <ProductsSection />
      </div>
    </div>
  );
};

export default HomePage;