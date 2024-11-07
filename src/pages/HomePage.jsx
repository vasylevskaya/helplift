import React, { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';
import AnimatedSection from '../components/AnimatedSection';
import ProductsSection from '../components/ProductsSection';
import ContactForm from '../components/ContactForm';
import ImageTextSection from '../components/ImageTextSection';
import CornerButtons from '../components/CornerButtons';

const HomePage = () => {
  const [contactFormIsVisible, setContactFormIsVisible] = useState(false);
  const [headerClass, setHeaderClass] = useState('dark'); // Start with 'dark'
  const imageTextSectionRef = useRef(null);
  const aboutUsSectionRef = useRef(null);
  const animatedSectionRef = useRef(null);
  const productsSectionRef = useRef(null);

  const toggleHeaderTheme = () => {
    const currentScroll = window.scrollY;

    if (headerClass === 'dark') {
      if ((currentScroll >= aboutUsSectionRef.current.offsetTop 
        && currentScroll < aboutUsSectionRef.current.offsetTop + aboutUsSectionRef.current.offsetHeight)
        || (currentScroll >= productsSectionRef.current.offsetTop 
          & currentScroll < productsSectionRef.current.offsetTop + productsSectionRef.current.offsetHeight)) {
          setHeaderClass('light')
      }
    }

    if (headerClass === 'light') {
      if ((currentScroll >= imageTextSectionRef.current.offsetTop 
        && currentScroll < imageTextSectionRef.current.offsetTop + imageTextSectionRef.current.offsetHeight)
        || (currentScroll >= animatedSectionRef.current.offsetTop 
          & currentScroll < animatedSectionRef.current.offsetTop + animatedSectionRef.current.offsetHeight)
        ) {
          setHeaderClass('dark')
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='home-page'>
      <Header
        className={headerClass}
        openContactForm={() => setContactFormIsVisible(true)}
      />
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
      <Footer />
      <ContactForm
        isVisible={contactFormIsVisible}
        closeForm={() => setContactFormIsVisible(false)}
      />
      <CornerButtons />
    </div>
  );
};

export default HomePage;