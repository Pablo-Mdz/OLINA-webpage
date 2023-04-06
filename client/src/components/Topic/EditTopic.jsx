import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTopic = ({ topic }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(topic?.title);
  }, [topic]);

  const handleSubmitEditTopic = () => {
    const requestBody = { title };

    axios
      .put(`/api/topic/details/${topic?._id}`, requestBody)
      .then((response) => {});
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
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500  text-white font-bold py-2 px-4 rounded focus:outline-none "
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTopic;
