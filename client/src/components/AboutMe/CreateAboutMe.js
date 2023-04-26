import { useState } from 'react';
import axios from 'axios';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];


export default function CreateAboutMe() {
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "auh8nzbq"); 
    data.append("cloud_name", "be-chef"); 
  
    const res = await fetch("https://api.cloudinary.com/v1_1/be-chef/image/upload", {
      method: "post",
      body: data,
    });
  
    const imageData = await res.json();
    return imageData.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let requestBody = {
      aboutMe,
      imgUrl: imageUrl,
    };
    
    if (image) {
      const imageUrl = await uploadImage(image);
      setImageUrl(imageUrl);
      requestBody.imgUrl = imageUrl;
    }
    
    axios.post(`/api/about-me`, requestBody)
      .then(response => {
        console.log("RESPONSE: ", response)
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

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
             <ReactQuill 
                theme="snow" 
                value={aboutMe}               
                onChange={setAboutMe}
                modules={modules}
                className="h-80 w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-purple-600"
             />
             </div>
             <br />
             <button className='px-4 py-1 mt-12 border-2 border-gray-900 rounded uppercase font-medium text-xs'>
               Add About Me
             </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
