import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateAboutMe() {
  const [aboutMe, setAboutMe] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { aboutMe };
    axios.post(`/api/about-me`, requestBody)
        .then(response => {
            console.log(response);
        })
        .catch((err) => console.log(err));
  }

  return (
    <div>
      <section className="bg-violet-400 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl mb-4">Add About me</h2>
            </div>
            <form 
                onSubmit={handleSubmit}
                className="text-white mb-8">
             <textarea 
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
             />
             <br />
             <button>Add About Me</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
