import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 



export default function CreateAboutMe() {
  const [aboutMe, setAboutMe] = useState("");
  const { quill, quillRef } = useQuill();


  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = { aboutMe };
    axios.post(`/api/about-me`, requestBody)
        .then(response => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
  };

  /* const handleEditorChange = (newValue) => {
    setAboutMe(newValue);
  }; */

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setAboutMe(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);



  return (
    <div>
      <section className="bg-violet-400 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form 
                onSubmit={handleSubmit}
                className="mb-8"
            >
            <div>

            <div>
              <div style={{ width: 500, height: 300 }}>
                  <div ref={quillRef} />
              </div>
            </div>
             {/* <ReactQuill 
                theme="snow" 
                value={aboutMe}               
                onChange={handleEditorChange}
                className="h-80 w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
             /> */}
             </div>
             <br />
             <button className='px-4 py-1 mt-6 border-2 border-gray-900 rounded uppercase font-medium text-xs'>
               Add About Me
             </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
