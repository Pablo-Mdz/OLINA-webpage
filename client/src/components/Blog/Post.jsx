import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Post() {
  const {  user } = useContext(AuthContext);
//   console.log(user);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold text-xl mb-2">Post</h1>
        <Link
          to="/create-post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create a Blog Post
        </Link>
      </div>
    </>
  );
}
