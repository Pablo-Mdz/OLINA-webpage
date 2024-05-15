import { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import { EditPicture } from './EditPicture';

export function GalleryPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get('/api/gallery')
      .then((response) => {
        setGallery(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = useMemo(() => {
    return gallery.filter((oneData) => {
      if (!oneData.title) {
        return false;
      } else {
        return (
          oneData.title &&
          oneData.title.toLowerCase().includes(search.toLowerCase())
        );
      }
    });
  }, [gallery, search]);

  const editPicture = (selectedPic) => {
    setSelectedPicture(selectedPic._id);
  };
  const cancelEditing = () => {
    setSelectedPicture(null);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

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
                  <div
                    className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4"
                    key={picture._id}
                  >
                    <div className="w-full p-1 md:p-2">
                      <div className="flex flex-col items-center">
                        <h2 className="text-xl">{picture.title}</h2>
                        <img
                          alt="gallery"
                          className="block object-cover object-center w-auto h-80 rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
                          src={picture.imgUrl}
                          onClick={() => openModal(picture.imgUrl)}
                        />
                        <p>
                          {' '}
                          {picture.description
                            ? `Description: ${picture.description} `
                            : ''}
                        </p>
                        <div className="flex justify-between w-full">
                          {selectedPicture === picture._id && isLoggedIn && (
                            <EditPicture
                              picture={picture}
                              onCancel={cancelEditing}
                              id={picture._id}
                            />
                          )}
                          {selectedPicture !== picture._id && isLoggedIn ? (
                            <div className="flex justify-end w-full">
                              <button
                                className=""
                                onClick={() => editPicture(picture)}
                              >
                                <img
                                  src="/editIcon.png"
                                  alt="Edit icon"
                                  className="inline w-8 h-8 ml-1"
                                />
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : null}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center py-4"
          onClick={closeModal}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre el modal al hacer clic en la imagen
          />
        </div>
      )}

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
