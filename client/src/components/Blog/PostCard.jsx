import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';

export default function PostCard({ post }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  
  const date = new Date(post.createdAt).toLocaleString();
  
  
  

  const postBodyPreview = () => {
    const words = post.body.split(' ');
    const maxLength = 12;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };
  return (
    <div className="w-96 h-80 rounded overflow-hidden shadow-lg bg-opacity-25 relative">
      <div className="px-6 py-4">
        <h1 className="text-2xl mb-2">{post.title}</h1>
      </div>
      <div className="align-start">
        <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
      </div>
      <div className="flex items-center m-2"></div>
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">
            Created by: {post.author.name}
          </p>
          <p className="text-gray-600">
            Date: {new Date(date).toLocaleDateString('es-ES')}
          </p>
          
        </div>
        <div className="absolute bottom-0  right-0 flex flex-col items-center justify-between p-3 ">
          <a
            href={`/post/${post._id}`}
            className="bg-blue-500 text-white font-medium px-2 py-1 my-1 rounded-full mt-2"
          >
            Read more
          </a>
        </div>
      </footer>
    </div>
  );
}
