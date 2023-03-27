import { useState} from 'react';

export default function CreateAPost() {
  const [blog, setBlog] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Create a Blog Post</label>
      <br />
      <input 
        type="text"
        value={blog} 
        onChange={e => setBlog(e.target.value)}
      />
      <br />
      <button>Enter</button>
    </form>
  )
}
