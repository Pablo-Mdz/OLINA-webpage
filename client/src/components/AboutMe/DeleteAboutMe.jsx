import axios from 'axios';

export function DeleteAboutMe({ aboutMe }) {
  const id = aboutMe._id;

  const deleteAboutme = () => {
    axios
      .delete(`/api/about-me/delete/${id}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        type="button"
        className="px-4 py-1 border-2 border-gray-900 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={deleteAboutme}
      >
        Delete about me
      </button>
    </div>
  );
}
