import { useState, useEffect } from 'react';
import axios from 'axios';


export default function EditPostCard({ post: initialPost, onCancel }) {
  const [post, setPost] = useState(initialPost);

  const id = initialPost._id;

  const handleChange = event => {
    const { name, value } = event.target;

    const updatedValue = value;

    const change = {
      [name]: updatedValue,
    };

    setPost(prev => {
     return {...prev, ...change}
    });
  };

  useEffect(() => {
    axios.get(`/api/post/${id}`)
      .then(response => {
        const { post } = response.data;
        setPost(post);
      })
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { post }
    axios.put(`/api/post/${id}`, requestBody)
      .then(response => {
        console.log(response)
      })
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200"
    >
      <label>Post Title:</label>
      <br />
      <input 
        type="text" 
        name='title'
        value={post?.title}
        onChange={handleChange}
       />
       <br />
       <label>Post Body:</label>
       <br />
       <input 
        type="text" 
        name='body'
        value={post?.body}
        onChange={handleChange}
       />

       <br />
       <button className='bg-green-500'>Save</button>
       <button onClick={onCancel} className='bg-red-800'>Cancel</button>
    </form>
  )
}
