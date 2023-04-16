import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
import DeletePicture from '../components/Gallery/DeletePicture';

export default function GalleryPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');

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

  return (
    <>
      <Helmet>
        <title>Olina - Blog | Gallery</title>
        <meta
          name="description"
          content="Discover Olina's gallery, where you'll find a collection of images and photos related to our blog."
        />
        <meta property="og:title" content="Olina - Blog | Gallery" />
        <meta
          property="og:description"
          content="Discover Olina's gallery, where you'll find a collection of images and photos related to our blog."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/gallery" />
        <meta
          property="og:image"
          content="https://example.com/featured-image.jpg"
        />
      </Helmet>

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
                      <p>{picture.title}</p>
                      <img
                        alt="gallery"
                        className="block object-cover object-center w-full h-full rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
                        src={picture.imgUrl}
                      />
                    </div>
                    {isLoggedIn && <DeletePicture id={picture._id} />}
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
