import axios from "axios";


export const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
  
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
  
        ['clean'],                                         // remove formatting button
  
        ['link', 'image', 'video'],                        // link and image, video
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
                imgElem.classList.add('w-60', 'h-auto');
              });
            }, 50);
          };
        },
      },
    },
  };
  
