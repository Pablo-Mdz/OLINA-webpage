import { actions } from '../../../services';

export function DeletePicture({ id }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    actions
      .deletePicture(id)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      type="button"
      className=" bg-red-800  text-white font-bold py-1 px-2  w-full rounded focus:outline-none my-1 "
      onClick={handleSubmit}
    >
      Delete
    </button>
  );
}
