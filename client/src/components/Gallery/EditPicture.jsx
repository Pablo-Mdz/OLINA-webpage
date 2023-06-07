import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePicture from './DeletePicture';

export const EditPicture = ({ picture, onCancel, id }) => {
  const [title, setTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [wordsRemaining, setWordsRemaining] = useState(25);

  useEffect(() => {
    setTitle(picture?.title);
    SetDescription(picture?.description);
  }, [picture]);

  const handleSubmitEditPicture = (e) => {
    e.preventDefault();
    const requestBody = { title, description };
    axios
      .put(`/api/gallery/${picture?._id}`, requestBody)
      .then((response) => {
        console.log('Edited:', response);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating picture: ', error);
      });
  };

  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  };
  const handleEditDescriptionChange = (e) => {
    const newDescription = e.target.value;
    const wordCount = countWords(newDescription);
    if (countWords(newDescription) <= 25) {
      SetDescription(newDescription);
      setWordsRemaining(25 - wordCount);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmitEditPicture(e)}>
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
        <label className="block text-gray-700 font-bold my-6" htmlFor="title">
          Description:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          value={description || ''}
          onChange={handleEditDescriptionChange}
        />
        <p
          className={`${
            wordsRemaining <= 10 ? 'text-red-500' : 'text-gray-700'
          } text-sm`}
        >
          {wordsRemaining} words remaining
        </p>

        <button
          type="submit"
          className="bg-green-500  text-white  w-full font-bold py-1 px-4   rounded focus:outline-none align-center "
        >
          Save
        </button>
        <DeletePicture id={id} />
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
