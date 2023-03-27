import { useState } from 'react';
import axios from 'axios';

export default function CreateATopic() {
  const [title, setTitle] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { title };
    const storedToken = localStorage.getItem("authToken");
    axios.post(`http://localhost:5005/api/topic/`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            console.log(response);
            setTitle(title);
        })
        .catch(err => console.log(err));
  }

  return (
    <div>
      <h3>Title your topic</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <br/>
        <textarea 
          type="text"
          value={title} 
          onChange={e => setTitle(e.target.value)} />
        <br/>
        <button>Add a new topic</button>
      </form>
    </div>
  )
}
