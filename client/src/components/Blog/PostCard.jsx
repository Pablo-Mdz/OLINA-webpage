import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

export default function PostCard({ onEdit, post }) {
  const { user } = useContext(AuthContext);

  const date = new Date(post.createdAt).toLocaleString();

  const handleEditClick = (postBeingEdited) => {
    onEdit(postBeingEdited);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#9f1ee8] bg-opacity-25 ">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </div>

      <div className="flex items-center mt-4">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">Created by {user?.name}</p>
          <p className="text-gray-600">
            Date: {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => handleEditClick(post)}
        className="bg-cyan-500 text-white font-medium px-4 py-2 my-2 rounded-full mt-4"
      >
        Edit
      </button>
    </div>
  );
}
