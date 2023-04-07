import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTopic = ({ topic, onCancel }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(topic?.title);
  }, [topic]);

  const handleSubmitEditTopic = () => {
    const requestBody = { title };
    axios
      .put(`/api/topic/details/${topic?._id}`, requestBody)
      .then((response) => {
        console.log('Edited:', response);
      });
  };

  const deletePost = () => {
    axios
      .delete(`/api/topic/details/${topic?._id}`)
      .then(() => {
        window.location.reload(false);
        window.location.href = '/topics';
    })
        .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmitEditTopic}>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Edit Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500  text-white font-bold py-2 px-4 rounded focus:outline-none "
        >
          Save
        </button>
      </form>
      <button
        onClick={onCancel}
        className="bg-yellow-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
      <button
        onClick={deletePost}
        className=" bg-red-800  text-white font-bold py-2 px-4 rounded focus:outline-none ml-2 "
      >
        Delete
      </button>
    </div>
  );
};

export default EditTopic;
