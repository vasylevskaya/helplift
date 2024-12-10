import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { contactFormVisibleState, headerThemeState, animationTextVisibleState } from '../recoil/atoms';
import ButtonCircle from '../components/ButtonCircle';
import logoWhite from '../assets/images/logo-white.png';
import logoBlack from '../assets/images/logo-black.png';
import hamburgerIcon from '../assets/images/hamburger.svg';
import ButtonGradient from './ButtonGradient';
import ROUTES from '../assets/routes.json';
import { Link } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const [, setContactFormIsVisible] = useRecoilState(contactFormVisibleState);
  const [headerTheme, setHeaderTheme] = useRecoilState(headerThemeState);
  const [isAnimTextVisible, setIsAnimTextVisible] = useRecoilState(animationTextVisibleState);

  const handleClick = (elementId) => {
    if (mobileMenuIsVisible) {
      setMobileMenuIsVisible(false);
    }
  
    if (elementId) {
      if (pathname !== ROUTES.home_page) {
        // Navigate to the homepage with a hash
        window.location.href = `${ROUTES.home_page}#/#${elementId}`;
      } else {
        // Scroll to the element immediately
        const element = document.getElementById(elementId);
        if (element) {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
        }
      }
  
      if (isAnimTextVisible) {
        setIsAnimTextVisible(false);
      }
    }
  };  

  return (
    <header className={`header header--${headerTheme}`}>
      <Link
        to={ROUTES.home_page}
        title='На головну'
      >
        <div className="logo-container">
          <img
            key={headerTheme} // Key forces re-render to trigger transition
            className='header_logo'
            src={headerTheme === 'light' ? logoWhite : logoBlack}
            alt='Лого'
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
          <button
            className='header_nav_link'
            onClick={() => handleClick('section-about-us')}
          >
            {'Про нас'}
            <div className='location-dot' />
          </button>
          <button
            className='header_nav_link'
            onClick={() => handleClick('section-products')}
          >
            {'Підйомники'}
            <div className='location-dot' />
          </button>
          <hr id="nav-input-line" className='input-line' />
          <button
            className='header_contact'
            onClick={() => {
              handleClick()
              setContactFormIsVisible(true)
            }}
          >
            <p className='header_contact_text btn-circle-sibling'>
              {"Зв'язатися"}
            </p>
            <ButtonCircle
              backgroundColor='#ffffff'
              arrowColor='#151517'
            />
          </button>
        </nav>
      </div>
      <button 
        onClick={() => setMobileMenuIsVisible(true)}
        className='header_nav-toggle button-gradient'
      >
        <ButtonGradient>
          <img
            className='header_nav-toggle_icon'
            src={hamburgerIcon}
            alt='menu-icon'
          />
        </ButtonGradient>
      </button>
    </header>
  );
};

export default Header;
