import React, { useEffect } from 'react';
import t from '../assets/text-content.json';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { contactFormVisibleState } from '../recoil/atoms';
import ButtonCircle from '../components/ButtonCircle';
import ButtonGradient from './ButtonGradient';
import ContactData from './ContactData';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const contactFormIsVisibleByDefault = searchParams.get('contactForm') === 'true';
  const [contactFormIsVisible, setContactFormIsVisible] = useRecoilState(contactFormVisibleState);

  useEffect(() => {
    // keep contactFormIsVisibleByDefault in useEffect, and not as a default value
    // of state to have opening animation when the page loads
    if (contactFormIsVisibleByDefault) {
      setContactFormIsVisible(true);
    }

    return () => {
      setContactFormIsVisible(false);
    }
  }, []);

  return (
    <div className={`contact-form ${contactFormIsVisible ? 'visible' : 'hidden'}`}>
      <div className='contact-form_blur'>

      </div>
      <div className='contact-form_content'>
        <h2 className='contact-form_content_title'>
          {t['contact-form']['heading']}
        </h2>
        <form className='contact-form_content_form'>
          <label className='label'>
            <p className='label-text'>{"Ім'я*"}</p>
            <input className='input' />
            <hr className='input-line' />
          </label>
          <label className='label'>
            <p className='label-text'>{"Прізвище*"}</p>
            <input className='input' />
            <hr className='input-line' />
          </label>
          <label className='label'>
            <p className='label-text'>{"Номер телефону*"}</p>
            <input className='input' />
            <hr className='input-line' />
          </label>
          <label className='label'>
            <p className='label-text'>{"Місто*"}</p>
            <input className='input' />
            <hr className='input-line' />
          </label>
          <label className='label label-comment'>
            <p className='label-text'>{"Коментар"}</p>
            <input className='input input-comment' />
            <hr className='input-line' />
          </label>
          <ContactData />
          <button className='submit-btn'>
            <p className='submit-btn-text btn-circle-sibling'>
              {"Надіслати"}
            </p>
            <ButtonCircle />
          </button>
        </form>
      </div>
      <button
        className='contact-form_close-btn'
        onClick={() => setContactFormIsVisible(false)}
      >
        <ButtonGradient>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8.13065" y1="0.353553" x2="0.352479" y2="8.13173" stroke="#ffffff"></line>
            <line y1="-0.5" x2="11" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.7771 0)" stroke="#ffffff"></line>
          </svg>
        </ButtonGradient>
      </button>
    </div>
  );
};

export default ContactForm;
