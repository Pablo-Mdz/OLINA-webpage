import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from './EditorToolbar';

export function CreateAPost({ id }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('authToken');

    let coverImageUrl = '';
    if (coverImage) {
      const coverImageData = new FormData();
      coverImageData.append('file', coverImage);
      coverImageData.append('upload_preset', 'auh8nzbq');
      coverImageData.append('cloud_name', 'be-chef');

      const coverImageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/be-chef/image/upload',
        coverImageData,
      );

      coverImageUrl = coverImageResponse.data.secure_url;
    }

    const requestBody = {
      title: title,
      body: body,
      topicId: id,
      imgUrl: coverImageUrl,
    };

    axios
      .post(`/api/post/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // console.log(response.data.newPost);

        setTitle('');
        setBody('');
        setCoverImage(null);
        window.location.reload(false);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEditorChange = (content) => {
    setBody(content);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
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
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="body"
            >
              Body:
            </label>
            <ReactQuill
              theme="snow"
              style={{ height: '400px' }}
              modules={modules}
              onChange={handleEditorChange}
              value={body}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="cover-image"
            >
              Cover Image:
            </label>
            <input
              type="file"
              id="cover-image"
              onChange={handleCoverImageChange}
            />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
