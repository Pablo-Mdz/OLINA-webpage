import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateAPost({ posts, setPosts, setEditorHtml }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
 

  const params = useParams();
  const id = params.id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { title, body, topicId: id };
    const storedToken = localStorage.getItem('authToken');
    axios
      .post(`/api/post/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data.newPost);
        setTitle(title);
        setBody(body);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
    const handleEditorChange = (content) => {
      setBody(content);
    };
  

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <br />
      <h3 className="text-2xl  font-medium mb-4">Create a new post</h3>
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="body">
            Body:
          </label>
          <ReactQuill
            theme="snow"
            onChange={handleEditorChange}
            value={body}
            
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
      <h3 className="text-lg font-medium mb-4">Preview your post here</h3>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  );
}
