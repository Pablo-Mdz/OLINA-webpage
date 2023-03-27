import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

export default function AddPicture() {
  const [image, setImage] = useState("");
  const [setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "auh8nzbq");
    data.append("cloud_name", "be-chef");
    fetch("https://api.cloudinary.com/v1_1/be-chef/image/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const requestBody = {
          publicId: data.public_id,
          imgUrl: data.url,
        };
        if (data.url.length > 1) {
          axios
            .post(`/api/gallery/add-photo`, requestBody)
            .then((response) => {
              /* if (response) {
                Swal.fire({
                  icon: "success",
                  title: "The picture has been saved",
                  showConfirmButton: false,
                  timer: 500,
                });
              } */
              navigate('/gallery')
            });
        }
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
    setImage("");
  };

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto mt-6">
        <form>
          <div className="form-group mb-6">
            <input
              type="file"
              className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Add a picture"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            px-6
            py-2.5
            bg-gray-900
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-gray-700 hover:shadow-lg
            focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-gray-800 active:shadow-lg
           
            transition
            duration-150
            ease-in-out"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}
