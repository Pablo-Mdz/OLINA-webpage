import React from 'react';
import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post, RTime }) {
  //   const { isLoggedIn, user } = useContext(AuthContext);

  const date = new Date(post.createdAt).toLocaleString();

  const postBodyPreview = () => {
    const words = post.body.split(' ');
    const maxLength = 12;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };

  console.log(post)

  return (
    <>
      <div className="w-full h-96 rounded overflow-hidden shadow-lg bg-opacity-25 relative flex">
        <div className="w-1/2 relative z-10">
          <div className="px-6 py-4">
            <h1 className="text-lg mb-1">{post.title}</h1>
          </div>
          <div
            className="align-start mx-2 my-1 overflow-hidden"
            style={{
              maxHeight: 'calc(100% - 8rem)',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
          </div>
          <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
            <div className="text-sm text-left">
              <ReadingTime text={post.body} />
              <p className="text-gray-600 my-2">
                Date: {new Date(date).toLocaleDateString('es-ES')}
              </p>
              <p className="text-gray-900 font-medium">
                Created by: {post.author.name}
              </p>
              <p>{post.likes} ❤️ </p>
            </div>
          </footer>
        </div>
        <div
          className="w-1/2 h-full bg-cover bg-no-repeat bg-center bg-opacity-75 relative"
          style={{
            backgroundImage: `url(${
              post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
            })`,
          }}
        >
          <a
            href={`/post/${post._id}`}
            className="bg-blue-500 text-white font-medium px-2 py-1 my-1 rounded-full mt-2 absolute bottom-3 right-3"
          >
            Read more
          </a>
        </div>
      </div>
    </>
  );
}
