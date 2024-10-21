import React from 'react';
import { Button, Link } from 'react-scroll';
import t from '../assets/text-content.json';
import logoImg from '../assets/images/logo-white.png';
import ButtonCircle from '../components/ButtonCircle';

/* стилі для хедера в App.css */

const Header = ({
  openContactForm
}) => {
  return (
    <header className='header'>
      <Link
        to={'top'}
        spy={true}
        smooth={true}
        offset={-70}
        duration={300}
      >
        <img
          className='header_logo'
          src={logoImg}
          alt='Logo'
        />
      </Link>
      <nav className='header_nav'>
        <Link
          className='header_nav_link'
          activeClass="active"
          to={'about-us-section'}
          spy={true}
          smooth={true}
          duration={300}
        >
          {'Про нас'}
          <div className='location-dot' />
        </Link>
        <Link
          className='header_nav_link'
          activeClass="active"
          to={'products-section'}
          spy={true}
          smooth={true}
          duration={300}
        >
          {'Підйомники'}
          <div className='location-dot' />
        </Link>
        <button className='header_contact' onClick={openContactForm}>
          <p className='header_contact_text'>{"Зв'язатися"}</p>
          <ButtonCircle className='white' />
        </button>
      </nav>
    </header>
  );
};

export default Header;