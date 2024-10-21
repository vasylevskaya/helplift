import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';
import AnimatedSection from '../components/AnimatedSection';
import ProductsSection from '../components/ProductsSection';
import ContactForm from '../components/ContactForm';
import ImageTextSection from '../components/ImageTextSection';

const HomePage = () => {
  const [contactFormIsVisible, setContactFormIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to top when the page is loaded or reloaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='home-page'>
      <Header openContactForm={() => setContactFormIsVisible(true)} />
      <AnimatedSection />
      <AboutUsSection />
      <ImageTextSection />
      <ProductsSection />
      <Footer />
      <ContactForm
        isVisible={contactFormIsVisible}
        closeForm={() => setContactFormIsVisible(false)}
      />
    </div>
  );
};

export default HomePage;
