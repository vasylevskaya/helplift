import React from 'react';
import logoImg from '../assets/images/logo-black.png';
import ContactData from './ContactData';

const Footer = () => {
  return (
    <footer className='footer'>
      <img
        className='footer_logo'
        src={logoImg}
        alt='Logo'
      />
      <ContactData />
    </footer>
  );
};

export default Footer;