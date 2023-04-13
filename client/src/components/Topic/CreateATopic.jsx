import { useState } from 'react';
import axios from 'axios';

export default function CreateATopic({ onTopicCreated, hideCreateTopic }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { title };
    const storedToken = localStorage.getItem('authToken');
    axios
      .post(`/api/topic/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        setTitle(title);
        onTopicCreated();
        hideCreateTopic();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#9f1ee8] bg-opacity-25 mb-4 rounded px-8 pt-3 pb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            placeholder="Title your topic"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-1 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add a new topic
          </button>
        </div>
      </form>
    </div>
  );
}
