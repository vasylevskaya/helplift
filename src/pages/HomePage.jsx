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
  const imageTextRef = useRef(null);
  const animatedRef = useRef(null);

  useEffect(() => {
    // Scroll to top when the page is loaded or reloaded
    window.scrollTo(0, 0);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0, // Trigger when the top of the section reaches the top of the viewport
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === imageTextRef.current) {
            setHeaderClass('dark'); // Set to 'light' when ImageTextSection is at the top
          } else if (entry.target === animatedRef.current) {
            setHeaderClass('light'); // Set to 'dark' when AnimatedSection is at the top
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (imageTextRef.current) observer.observe(imageTextRef.current);
    if (animatedRef.current) observer.observe(animatedRef.current);

    return () => {
      if (imageTextRef.current) observer.unobserve(imageTextRef.current);
      if (animatedRef.current) observer.unobserve(animatedRef.current);
    };
  }, []);

  return (
    <div className='home-page'>
      <Header
        className={headerClass}
        openContactForm={() => setContactFormIsVisible(true)}
      />
      <div ref={imageTextRef}>
        <ImageTextSection />
      </div>
      <AboutUsSection />
      <div ref={animatedRef}>
        <AnimatedSection />
      </div>
      <ProductsSection />
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