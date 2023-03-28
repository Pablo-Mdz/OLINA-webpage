import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function CreateATopic() {
  const [title, setTitle] = useState("");

  //const navigate = Navigate();

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { title };
    const storedToken = localStorage.getItem("authToken");
    axios.post(`/api/topic/`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            console.log(response);
            setTitle(title);
            //navigate("/topic/:id")
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
