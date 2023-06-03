import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {
      image: function () {
        const quill = this.quill;
        const range = quill.getSelection();
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'auh8nzbq');
          formData.append('cloud_name', 'be-chef');

          const result = await axios.post(
            'https://api.cloudinary.com/v1_1/be-chef/image/upload',
            formData,
          );
          const url = result.data.secure_url;

          quill.insertEmbed(range.index, 'image', url);
          setTimeout(() => {
            const imgElems = quill.root.querySelectorAll('img');
            imgElems.forEach((imgElem) => {
              imgElem.classList.add('w-40', 'h-auto');
            });
          }, 50);
        };
      },
    },
  },
};

export default function CreateAPost({ id }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    const requestBody = {
      title: title,
      body: body,
    };

    axios
      .post(`/api/post/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data.newPost);
        setTitle('');
        setBody('');
        window.location.reload(false);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEditorChange = (content) => {
    setBody(content);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
      <div style={{ width: '80%' }}>
        <br />
        <h3 className="text-2xl font-medium mb-4">
          Create a new post related to this topic
        </h3>
        <form onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="body"
            >
              Body:
            </label>
            <ReactQuill
              theme="snow"
              style={{ height: '300px' }}
              modules={modules}
              onChange={handleEditorChange}
              value={body}
            />
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
              type="submit"
            >
              Add a new post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// orignial
// import { useState } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { modules, formats, QuillToolbar } from './EditorToolbar';

// export default function CreateAPost({ id }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [image, setImage] = useState('');
//   const [setErrorMessage] = useState('');

//   const handleSubmit = (event) => {

//     event.preventDefault();
//     const data = new FormData();
//     data.append('file', image);
//     data.append('upload_preset', 'auh8nzbq');
//     data.append('cloud_name', 'be-chef');

//     fetch('https://api.cloudinary.com/v1_1/be-chef/image/upload', {
//       method: 'post',
//       body: data,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const storedToken = localStorage.getItem('authToken');
//         const requestBody = {
//           title: title,
//           body: body,
//           topicId: data.topic,
//           publicId: data.public_id,
//           imgUrl: data.url,
//         };
//         if (data.url.length > 1) {
//           axios
//             .post(`/api/post/`, requestBody, {
//               headers: { Authorization: `Bearer ${storedToken}` },
//             })
//             .then((response) => {
//               console.log(response.data.newPost);
//               setTitle(title);
//               setBody(body);
//               window.location.reload(false);
//             });
//         }
//       })
//       .catch((err) => {
//         const errorDescription = err.response.data.message;
//         setErrorMessage(errorDescription);
//       });

//       setImage('');
//   };
//   const handleEditorChange = (content) => {
//     setBody(content);
//   };

//   return (
//     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">

//       <div style={{ width: '80%' }}>
//         <br />
//         <h3 className="text-2xl font-medium mb-4">
//           Create a new post related to this topic
//         </h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="title"
//             >
//               Title:
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="body"
//             >
//               Body:
//             </label>
//             <ReactQuill
//               theme="snow"
//               style={{ height: '300px' }}
//               formats={formats}
//               onChange={handleEditorChange}
//               value={body}
//             />
//           </div>
//           <div className="mb-4">
//             <br />
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="image"
//             >
//               Image:
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="image"
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               required
//             />
//           </div>
//           <div className="flex">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
//               type="submit"
//             >
//               Add a new post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useCallback, useRef, useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import axios from 'axios';
// import 'react-quill/dist/quill.snow.css';
// import { modules, formats, QuillToolbar } from './EditorToolbar';


// export default function CreateAPost({ id }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const quillRef = useRef();
// //   const quillRef = useRef();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const storedToken = localStorage.getItem('authToken');
//     const requestBody = {
//       title: title,
//       body: body,
//       topicId: id,
//     };
//     try {
//       const response = await axios.post(`/api/post/`, requestBody, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });
//       console.log(response.data.newPost);
//       setTitle('');
//       setBody('');
//       window.location.reload(false);
//     } catch (err) {
//       const errorDescription = err.response.data.message;
//       setErrorMessage(errorDescription);
//     }
//   };

//   const handleEditorChange = (content) => {
//     setBody(content);
//   };

//   const imageHandler = useCallback(() => {
//     const input = document.createElement('input');

//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();

//       formData.append('image', file);

//       const res = await axios.post(
//         'https://api.cloudinary.com/v1_1/be-chef/image/upload',
//         formData,
//       );
//       const imageUrl = res.data;

//       const editor = quillRef.current.getEditor();
//       const range = editor.getSelection(true);
//       editor.insertEmbed(range.index, 'image', imageUrl);
//     };
//   }, []);

//   React.useEffect(() => {
//     const editor = quillRef.current.getEditor();
//     editor.getModule('toolbar').addHandler('image', imageHandler);
//   }, [imageHandler]);

//   return (
//     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
//       <div style={{ width: '80%' }}>
//         <h3 className="text-2xl font-medium mb-4">
//           Create a new post related to this topic
//         </h3>
//         <form onSubmit={handleSubmit}>
//           <QuillToolbar />
//           <ReactQuill
//             ref={quillRef}
//             theme="snow"
//             modules={modules}
//             formats={formats}
//             style={{ height: '300px' }}
//             onChange={handleEditorChange}
//             value={body}
//           />
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="title"
//             >
//               Title:
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
//               type="submit"
//             >
//               Add a new post
//             </button>
//           </div>
//           {errorMessage && (
//             <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

