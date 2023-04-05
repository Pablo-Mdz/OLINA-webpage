import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditPostCard({ postBeingEdited: initialPost, onCancel }) {
  const [title, setTitle] = useState(initialPost.title);
  const [body, setBody] = useState(initialPost.body);

  

  const postId = initialPost?._id;

  useEffect(() => {
    axios.get(`/api/post/${postId}`)
      .then(response => {
        const { title, body } = response.data;
        setTitle(title);
        setBody(body)
      })
  }, [postId]);

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { title, body }
    axios.put(`/api/post/${postId}`, requestBody)
      .then(response => {
        window.location.reload(false);
      })
  };
  
  const deletePost = () => {
    axios.delete(`/api/post/${postId}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
  }

  const handleEditorChange = (content) => {
    setBody(content);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Edit Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
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
        <button className='bg-green-500  text-white font-bold py-2 px-4 rounded focus:outline-none '>Save</button>
        </div>
      </form>
        <button onClick={onCancel}  className="bg-yellow-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
    <button onClick={deletePost} className=' bg-red-800  text-white font-bold py-2 px-4 rounded focus:outline-none ml-2 '>Delete</button> 
    </>
  )
}
