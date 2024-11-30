import React from 'react';
import logoImg from '../assets/images/logo-black.png';
import ContactData from './ContactData';
import ROUTES from '../assets/routes.json';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <img
        className='footer_logo'
        src={logoImg}
        alt='Logo'
      />
      <Link to={ROUTES.privacy_policy_page}>Політика Конфіденційності</Link>
      <ContactData />
    </footer>
  );
};

export default Footer;