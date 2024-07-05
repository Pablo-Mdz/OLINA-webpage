import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddPicture() {
  const [image, setImage] = useState('');
  const [setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [wordsRemaining, setWordsRemaining] = useState(25);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'auh8nzbq');
    data.append('cloud_name', 'be-chef');
    fetch(process.env.CLOUDINARY_FRONTEND_URL, {
      method: 'post',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        const storedToken = localStorage.getItem('authToken');
        const requestBody = {
          title: title,
          description: description,
          publicId: data.public_id,
          imgUrl: data.url,
        };
        if (data.url.length > 1) {
          axios
            .post(`/api/gallery/add-photo/`, requestBody, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
              navigate('/gallery');
              console.log('RESPONSE: ', response);
              setTitle('');
              SetDescription('');
            })
            .catch((err) => {
              const errorDescription = err.response.data.message;
              setErrorMessage(errorDescription);
            });
        }
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
    setImage('');
  };

  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    const wordCount = countWords(newDescription);
    if (countWords(newDescription) <= 25) {
      SetDescription(newDescription);
      setWordsRemaining(25 - wordCount);
    }
  };

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto mt-6 font-pop">
        <form>
          <div className="form-group mb-6">
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
              />
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Description:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
              <p
                className={`${
                  wordsRemaining <= 10 ? 'text-red-500' : 'text-gray-700'
                } text-sm`}
              >
                {wordsRemaining} words remaining
              </p>
            </div>
            <input
              type="file"
              className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Add a picture"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            px-6
            py-2.5
            bg-gray-900
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-gray-700 hover:shadow-lg
            focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-gray-800 active:shadow-lg
           
            transition
            duration-150
            ease-in-out"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
