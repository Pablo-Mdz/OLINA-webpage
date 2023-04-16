import { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateAPost({ id }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'auh8nzbq');
    data.append('cloud_name', 'be-chef');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/be-chef/image/upload',
      {
        method: 'post',
        body: data,
      },
    );

    const jsonResponse = await response.json();
    return {
      imgUrl: jsonResponse.url,
      publicId: jsonResponse.public_id,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { imgUrl, publicId } = await uploadImage();

    const requestBody = { title, body, topicId: id, imgUrl, publicId };
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

    setImage('');
  };
  const handleEditorChange = (content) => {
    setBody(content);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
      <div style={{ width: '80%' }}>
        <br />
        <h3 className="text-2xl font-medium mb-4">
          Create a new post related to this topic
        </h3>
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
            <ReactQuill theme="snow" style={{ height: '300px' }} onChange={handleEditorChange} value={body} />
          </div>
          <div className="mb-4">
          <br />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
              Image:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
              type="submit"
            >
              Add a new post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
