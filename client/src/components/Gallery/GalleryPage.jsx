import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import DeletePicture from './DeletePicture';
import { EditPicture } from './EditPicture';

export default function GalleryPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('')

  useEffect(() => {
    axios
      .get('/api/gallery')
      .then((response) => {
        setGallery(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = gallery.filter((oneData) => {
    if (!oneData.title) {
      return false;
    } else {
      return (
        oneData.title &&
        oneData.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  });
const editPicture = (selectedPic) => {
    setSelectedPicture(selectedPic._id)
}
const cancelEditing = () => {
    setSelectedPicture(null)
}

  return (
    <>
      {gallery ? (
        <section className="overflow-hidden text-gray-700 mb-32">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <input
              placeholder="Search by name or translation"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex flex-wrap -m-1 md:-m-2">
              {filtered &&
                filtered.map((picture) => (
                  <div className="flex flex-wrap w-1/3" key={picture._id}>
                    <div className="w-full p-1 md:p-2">
                      <div className="flex flex-col items-center">
                          <p>{picture.title}</p>
                        <img
                          alt="gallery"
                          className="block object-cover object-center w-full h-full rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
                          src={picture.imgUrl}
                          />
                      <div className="flex justify-between w-full">
                       <button onClick={() =>editPicture(picture)}>
                       <img
                    src="/editIcon.png"
                    alt="Edit icon"
                    className="inline w-8 h-8 ml-1"
                  />
                       </button>

                        {selectedPicture && picture._id && (<EditPicture picture={picture} onCancel={cancelEditing}/>)}
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : null}
      {isLoggedIn && (
        <div className="flex justify-center">
          <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 w-32 border border-gray-400 rounded shadow flex justify-center mb-36">
            <Link to="/gallery/add-picture">Add picture</Link>
          </div>
        </div>
      )}
    </>
  );
}
