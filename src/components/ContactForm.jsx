import React from 'react';
import t from '../assets/text-content.json';
import ButtonCircle from '../components/ButtonCircle';
import ButtonClose from './ButtonClose';
import ContactData from './ContactData';

const ContactForm = ({
  isVisible,
  closeForm
}) => {
  return (
    <div className={`contact-form ${isVisible ? 'visible' : 'hidden'}`}>
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
            <p className='submit-btn-text'>{"Надіслати"}</p>
            <ButtonCircle arrowColor={'#fff'} />
          </button>
        </form>
      </div>
      <button
        className='contact-form_close-btn'
        onClick={closeForm}
      >
        <ButtonClose />
      </button>
    </div>
  );
};

export default ContactForm;
