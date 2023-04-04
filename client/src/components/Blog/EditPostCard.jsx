import { useState, useEffect } from 'react';
import axios from 'axios';

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
  }, []);

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

  return (
    <>
    <form 
      onSubmit={handleSubmit} 
      className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200"
    >
      <label>Post Title:</label>
      <br />
      <input 
        type="text" 
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
       />
       <br />
       <label>Post Body:</label>
       <br />
       <input 
        type="text" 
        name='body'
        value={body}
        onChange={e => setBody(e.target.value)}
       />

       <br />
       <button className='bg-green-500'>Save</button>
    </form>
    
    <button onClick={onCancel} className='bg-red-800'>Cancel</button>
    <button onClick={deletePost} className='bg-yellow-500'>Delete</button>
    </>
  )
}
