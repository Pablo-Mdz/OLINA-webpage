import React from "react";

export const ContactMe = () => {
  return (
    <div className="bg-white rounded-md shadow-md py-6 px-8 mx-auto max-w-xl">
      <h2 className="text-2xl font-medium mb-4 text-purple-600">Contact Me</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border border-gray-400 py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
            placeholder="Your message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};
