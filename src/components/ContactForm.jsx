import React from 'react';

const ContactForm = ({
  isVisible,
  closeForm
}) => {
  return (
    <div className={`contact-form ${isVisible ? 'visible' : 'hidden'}`}>
      <button
        className='contact-form_close-btn'
        onClick={closeForm}
      >
        x
      </button>
      <p>Contact Form Placeholder</p>
    </div>
  );
};

export default ContactForm;
