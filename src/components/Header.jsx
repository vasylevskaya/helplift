import React from 'react';
import { Link } from 'react-scroll';

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
        duration={500}
        className='header_logo'
      >
        Logo Placeholder {/* Вставити лого */}
      </Link>
      <nav className='header_nav'>
        <Link
          className='header_nav_link'
          activeClass="active"
          to={'about-us-section'}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          {'Про нас'}
        </Link>
        <Link
          className='header_nav_link'
          activeClass="active"
          to={'products-section'}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          {'Продукти'}
        </Link>
      </nav>
      <button className='header_contact' onClick={() => {}}> {/* додати функцію для вікриття Contact Form */}
        <p className='header_contact_text'>{"Зв'язатися"}</p>
        <div className='header_contact_pseudo-btn'>

        </div>
      </button>
    </header>
  );
};

export default Header;