import React, { useState} from 'react';
import { Button, Link } from 'react-scroll';
import t from '../assets/text-content.json';
import ButtonCircle from '../components/ButtonCircle';
import logoWhite from '../assets/images/logo-white.png';
import logoBlack from '../assets/images/logo-black.png';
import hamburgerIcon from '../assets/images/hamburger.svg';
import ButtonGradient from './ButtonGradient';

/* стилі для хедера в App.css */

const Header = ({
  openContactForm,
  className
}) => {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);

  return (
    <header className={`header header--${className}`}>
      <Link
        to={'top'}
        spy={true}
        smooth={true}
        offset={-70}
        duration={300}
      >
        <div className="logo-container">
          <img
            key={className} // Key forces re-render to trigger transition
            className='header_logo'
            src={className === 'light' ? logoWhite : logoBlack}
            alt='Logo'
          />
        </div>
      </Link>
      <div className={`header_nav-wrap ${mobileMenuIsVisible ? 'visible' : 'hidden'}`}>
        <div className='header_nav-blur'></div>
        <nav className='header_nav'>
          <button 
            onClick={() => setMobileMenuIsVisible(false)}
            className='header_nav-close button-gradient'
          >
            <ButtonGradient>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8.13065" y1="0.353553" x2="0.352479" y2="8.13173" stroke="#ffffff"></line>
                <line y1="-0.5" x2="11" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.7771 0)" stroke="#ffffff"></line>
              </svg>
            </ButtonGradient>
          </button>
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
          <hr className='input-line' />
          <button
            className='header_contact'
            onClick={openContactForm}
          >
            <p className='header_contact_text'>{"Зв'язатися"}</p>
            <ButtonCircle className='white' />
          </button>
        </nav>
      </div>
      <button 
        onClick={() => setMobileMenuIsVisible(true)}
        className='header_nav-toggle button-gradient'
      >
        <ButtonGradient>
          <img className='header_nav-toggle_icon' src={hamburgerIcon} />
        </ButtonGradient>
      </button>
    </header>
  );
};

export default Header;
