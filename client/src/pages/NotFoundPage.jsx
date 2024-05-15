import React from 'react';

export function NotFoundPage() {
  return (
    <div className="h-screen flex font-pop">
      <div className="w-1/4 bg-white flex flex-col justify-center items-center p-8 my-10">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Uh-oh!</h1>
        <p className="text-4xl text-gray-700 mb-9 leading-10 mx-10">
          Error 404. Like falling off a seesaw, things don’t go as planned and
          we can’t you connect to this page.
        </p>
        <a
          href="/"
          className="inline-block bg-purple-400  rounded-full px-3 py-1 text-3xl font-semibold text-white hover:bg-gray-700 mr-2 mb-2  hover:text-white"
        >
          Return Home
        </a>
      </div>
      <div
        className="w-3/4 bg-cover bg-center"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/notFound.jpg')`,
        }}
      />
    </div>
  );
}
