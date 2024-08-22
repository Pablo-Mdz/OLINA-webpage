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
              imgElem.classList.add('w-96', 'h-auto');
            });
          }, 50);
        };
      },
    },
  },
};

export function CreateAboutMe() {
  const [aboutMe, setAboutMe] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      aboutMe,
    };

    axios
      .post(`/api/about-me`, requestBody)
      .then((response) => {
        console.log('RESPONSE: ', response);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="mb-8">
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

              <button
                type="submit"
                className="px-4 py-1 mt-12 border-2 border-gray-900 rounded uppercase font-medium text-xs"
              >
                Add About Me
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
