import React from 'react';
import * as yup from "yup";
import emailjs from '@emailjs/browser';
import t from '../assets/text-content.json';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRecoilState } from 'recoil';
import { contactFormVisibleState } from '../recoil/atoms';
import ButtonCircle from '../components/ButtonCircle';
import ButtonGradient from './ButtonGradient';
import ContactData from './ContactData';
import contactFormData from '../assets/сontact-form.json';

const ContactForm = () => {
  const [contactFormIsVisible, setContactFormIsVisible] = useRecoilState(contactFormVisibleState);
  const {
    REACT_APP_SERVICE_ID,
    REACT_APP_TEMPLATE_ID,
    REACT_APP_PUBLIC_KEY
  } = process.env;
  const errorMsg = t["contact-form"]["error-required"];
  const successMsg = t["contact-form"]["success"];
  const failureMsg = t["contact-form"]["failure"];

  return (
    <div className={`contact-form ${contactFormIsVisible ? 'visible' : 'hidden'}`}>
      <div className='contact-form_blur'> </div>
      <div className='contact-form_content'>
        <h2 className='contact-form_content_title'>
          Контактна форма
        </h2>
        <Formik
          initialValues={contactFormData.initialValues}
          validationSchema={yup.object({
            name: yup.string().required(errorMsg),
            surname: yup.string().required(errorMsg),
            phone: yup.string().required(errorMsg),
            town: yup.string().required(errorMsg),
            comment: yup.string()
          })}
          onSubmit={async (values, formikContext) => {
            emailjs.sendForm(
              REACT_APP_SERVICE_ID,
              REACT_APP_TEMPLATE_ID,
              "#contact-form",
              REACT_APP_PUBLIC_KEY
            )
              .then(
                () => {
                  // Reset the form after successful submission
                  formikContext.resetForm();
                  alert(successMsg); // Custom success message
                },
                (error) => {
                  alert(failureMsg); // Custom failure message
                }
              );
            formikContext.setSubmitting(false);
          }}
        >
          {(formikContext) => (
            <Form className="contact-form_content_form" id="contact-form">
              {contactFormData.inputs.map((input) => (
                <label className={`label ${input.class ?? ''}`} key={input.name}>
                  <p className='label-text'>{input.placeholder}</p>
                  <Field
                    type="text"
                    name={input.name}
                    className="input"
                  />
                  <hr className='input-line' />
                  <p className='error-msg'>
                    <ErrorMessage name={input.name} />
                  </p>
                </label>
              ))}
              <ContactData />
              <button
                type="submit"
                className='submit-btn'
                disabled={formikContext.isSubmitting}
              >
                <p className='submit-btn-text btn-circle-sibling'>
                  Надіслати
                </p>
                <ButtonCircle />
              </button>
            </Form>
          )}
        </Formik>
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
