import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateAPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { title, body };
    const storedToken = localStorage.getItem("authToken");
    axios.post(`/api/post/`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            console.log(response.data);
            setTitle(title);
            setBody(body);
            navigate("/blogs")
        })
        .catch(err => console.log(err));
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-lg font-medium mb-4">Title your post</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="body">
            Body:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            type="text"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add a new post
          </button>
        </div>
      </form>
    </div>
  )
}
