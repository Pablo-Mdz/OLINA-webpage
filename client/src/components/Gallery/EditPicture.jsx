import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePicture from './DeletePicture';

export const EditPicture = ({ picture , onCancel, id }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(picture?.title);
  }, [picture]);

  const handleSubmitEditPicture = () => {
    const requestBody = { title };
    axios.put(`/api/gallery/${picture?._id}`, requestBody).then((response) => {
      console.log('Edited:', response);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmitEditPicture}>
        <label className="block text-gray-700 font-bold my-6" htmlFor="title">
          Edit Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 my-1 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500  text-white  w-full font-bold py-1 px-4   rounded focus:outline-none align-center "
        >
          Save
        </button>
        <DeletePicture id={id}/>
        <button
          onClick={onCancel}
          className="bg-yellow-700  text-white font-bold py-1 px-2 w-full   rounded focus:outline-none focus:shadow-outline"
        >
          cancel
        </button>
      </form>
    </div>
  );
};
