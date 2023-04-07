import axios from 'axios';
import React from 'react';

export default function DeletePicture({ id }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/gallery/delete/${id}`)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      type="button"
      className="inline-block px-4 py-1 mt-6 border-2 border-gray-900 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      onClick={handleSubmit}
    >
      Delete
    </button>
  );
}
