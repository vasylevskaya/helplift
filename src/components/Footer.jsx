import React from 'react';
import logoImg from '../assets/images/logo-black.png';
import ROUTES from '../assets/routes.json';
import { Link } from 'react-router-dom';
import iconPhone from '../assets/images/phone-call.svg'
import iconEnvelope from '../assets/images/envelope.svg'
import iconMarker from '../assets/images/marker.svg'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_top'>
        <img
          className='footer_logo'
          src={logoImg}
          alt='Logo'
        />
        <div className='footer_contacts'>
          <div className='footer_contacts_item'>
            <img
              src={iconPhone}
              alt='icon phone'
            />
            <h6>Телефон</h6>
            <p className='footer_contacts_item_phone font-grotesque'>
              +38 (099) 678 67 89
            </p>
          </div>
          <div className='footer_contacts_item'>
            <img
              src={iconEnvelope}
              alt='icon envelop'
            />
            <h6>Email</h6>
            <p>helplift@gmail.com</p>
          </div>
          <div className='footer_contacts_item'>
            <img
              src={iconMarker}
              alt='icon location'
            />
            <h6>Адреса</h6>
            <p>Україна, Рівненська область, м. Сарни</p>
          </div>
        </div>
      </div>
      <hr className='input-line' />
      <div className='footer_bottom'>
        <Link
          to={ROUTES.privacy_policy_page}
          className='footer_bottom_text'
        >
          Політика Конфіденційності
        </Link>
        <p className='footer_bottom_text'>
          @
          <span className='font-grotesque'>
            {`2025 `}
          </span>
          Helplift. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;