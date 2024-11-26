import React from 'react';
import logoImg from '../assets/images/logo-black.png';
import ContactData from './ContactData';
import ROUTES from '../assets/routes.json';

const Footer = () => {
  return (
    <footer className='footer'>
      <img
        className='footer_logo'
        src={logoImg}
        alt='Logo'
      />
      <a href={ROUTES.privacy_policy_page}>Політика Конфіденційності</a>
      <ContactData />
    </footer>
  );
};

export default Footer;