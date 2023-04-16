import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export const ContactMe = () => {
  const navigate = useNavigate();
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_3ceepzv',
        'template_n1euugs',
        form.current,
        '1d-j2JW1QjE-26RcM',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    e.target.reset();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Olina - Blog | Contact Me</title>
      </Helmet>
      <div className="bg-white rounded-md shadow-md py-6 px-8 mx-auto max-w-xl">
        <h2 className="text-2xl font-medium mb-4 text-purple-600">
          Contact Me
        </h2>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              {/* Name */}
            </label>
            <input
              id="name"
              name="firstname"
              type="text"
              className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              {/* Email */}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              {/* Message */}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
              placeholder="message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};
