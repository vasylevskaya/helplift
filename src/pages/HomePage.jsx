import React, { useState } from 'react';
import '../styles/HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';
import AnimatedSection from '../components/AnimatedSection';
import ProductsSection from '../components/ProductsSection';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  const [contactFormIsVisible, setContactFormIsVisible] = useState(false);

  return (
    <div className='home-page'>
      <Header openContactForm={() => setContactFormIsVisible(true)} />
      <AboutUsSection />
      <AnimatedSection />
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
