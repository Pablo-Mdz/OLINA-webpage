import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  //console.log(post)

  const date = new Date(post.createdAt).toLocaleString();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200">
    
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{post.title}</div>
      <p className="text-gray-700 text-base">
        {post.body}
      </p>
    </div>

    <div className="flex items-center mt-4">
      <img className="w-10 h-10 rounded-full mr-4" src="" alt="" />
      <div className="text-sm">
        <p className="text-gray-900 leading-none">Created by: {user.name} </p>
        <p className="text-gray-600">{date}</p>
      </div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div>
  )
}
