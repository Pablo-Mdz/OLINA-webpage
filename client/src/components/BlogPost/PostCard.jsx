import React from 'react';
// import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post, RTime }) {
  const date = new Date(post.createdAt).toLocaleString();

  const postBodyPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.body, 'text/html');
    const textContent = doc.body.textContent || '';
    const words = textContent.split(' ');
    const maxLength = 3;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
};

  const postTitlePreview = () => {
    const words = post.title.split(' ');
    const maxLength = 5;
    return words.slice(0, maxLength).join(' ') + (words.length > maxLength ? '...' : '');
  };

  return (
    <>
      <div className="flex flex-wrap mx-5 ">
        <div className=" w-96 h-96 rounded overflow-hidden shadow-lg bg-opacity-25 flex flex-col ">
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
              })`,
              height: '55%',
            }}
          ></div>

          <div className="bg-white  px-2 flex flex-col " style={{ height: '45%' }}>
            <h1 className="text-2xl font-bold mb-1 flex ml-4">{postTitlePreview()}</h1>
            <p
              className="text-sm text-gray-600 my-2 flex ml-4 "
              style={{ maxHeight: '3rem' }}
            >
              {postBodyPreview()}
            </p>

            <footer className="flex justify-between items-end  py-5 ">
              <div className="text-gray-600 text-xs  ">
                <p className="flex justify-start ">{post.likes} ❤️</p>
                <p>{new Date(date).toLocaleDateString('es-ES')}</p>
              </div>
              <div className="flex justify-start">
                <div className="text-gray-600 text-xs ">
                  <p>{post.comments.length} Comentarios</p>
                </div>
              </div>
              <a
                href={`/post/${post._id}`}
                className="bg-blue-800 text-white font-medium px-2 py-1 mb-3 rounded-lg no-underline hover:bg-blue-700"
              >
                read more
              </a>
            </footer>
          </div>
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
            <p>{post.comments.length} Comments</p>
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
  );
}
