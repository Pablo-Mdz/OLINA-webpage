import React from 'react';
import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleString();

  const postBodyPreview = () => {
    const words = post.body.split(' ');
    const maxLength = 6;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };

  return (
    <>
      <div className="w-full h-96 md:w-full md:h-96 rounded  overflow-hidden shadow-lg bg-opacity-25 relative flex">
        <div className="w-1/2 relative z-10">
          <div className="px-6 py-4">
            <h1 className="text-lg mb-1 font-semibold" style={{ fontFamily: 'semibold' }}>{post.title}</h1>
          </div>
          <div
            className="align-start mx-2 my-1 overflow-hidden"
            style={{
              maxHeight: 'calc(100% - 8rem)',
            }}
          >
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
          </div>
          <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
            <div className="text-sm text-left">
            <ReadingTime text={post.body} />
              <p className="text-gray-700 my-2">
                Date: {new Date(date).toLocaleDateString('es-ES')}
              </p>
              <p className="text-gray-900 font-medium">
                Created by: {post.author.name}
              </p>
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
            className="bg-violetPro hover:bg-purplePro text-white font-medium px-2 py-1 my-1 rounded-full mt-2 absolute bottom-3 right-3"
          >
            Read more
          </a>
        </div>
      </div>
    </>
  );
}


// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function PostCard({ post, RTime }) {
//   const date = new Date(post.createdAt).toLocaleString();

//   const postBodyPreview = () => {
//     const words = post.body.split(' ');
//     const maxLength = 12;
//     return (
//       words.slice(0, maxLength).join(' ') +
//       (words.length > maxLength ? '...' : '')
//     );
//   };

//   return (
//     <div className="post w-full md:flex gap-4 mb-12 bg-white shadow-md rounded-md p-4">
//       <div className="post-img flex-shrink-0 w-full md:w-1/3">
//         <img
//           className="w-full h-56 md:h-64 object-cover rounded-md"
//           src={post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'}
//           alt="post cover"
//         />
//       </div>
//       <div className="content flex flex-col justify-between w-full md:w-2/3">
//         <div>
//           <Link to={`/post/${post._id}`} className="text-2xl font-bold text-gray-800 mb-4">
//             {post.title}
//           </Link>
//                  <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <div className="text-xs">
//             <p className="font-bold text-gray-800">{post.author.name}</p>
//             <p className="text-gray-600">
//               Date: {new Date(date).toLocaleDateString('es-ES')}
//             </p>
//           </div>
//           <Link to={`/post/${post._id}`} className="text-white">
//             <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition-all duration-200">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { ReadingTime } from '../Words/ReadingTime';

// export default function PostCard({ post, RTime }) {
//   //   const { isLoggedIn, user } = useContext(AuthContext);

//   const date = new Date(post.createdAt).toLocaleString();

//   const postBodyPreview = () => {
//     const words = post.body.split(' ');
//     const maxLength = 12;
//     return (
//       words.slice(0, maxLength).join(' ') +
//       (words.length > maxLength ? '...' : '')
//     );
//   };
//   return (
//     <>
//       <div className="w-full h-96 rounded overflow-hidden shadow-lg bg-opacity-25 relative flex">
//         <div className="w-1/2 relative z-10">
//           <div className="px-6 py-4">
//             <h1 className="text-lg mb-1">{post.title}</h1>
//           </div>
//           <div
//             className="align-start mx-2 my-1 overflow-hidden"
//             style={{
//               maxHeight: 'calc(100% - 8rem)',
//             }}
//           >
//             <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
//           </div>
//           <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
//             <div className="text-sm text-left">
//               <ReadingTime text={post.body} />
//               <p className="text-gray-600 my-2">
//                 Date: {new Date(date).toLocaleDateString('es-ES')}
//               </p>
//               <p className="text-gray-900 font-medium">
//                 Created by: {post.author.name}
//               </p>
//             </div>
//           </footer>
//         </div>
//         <div
//           className="w-1/2 h-full bg-cover bg-no-repeat bg-center bg-opacity-75 relative"
//           style={{
//             backgroundImage: `url(${
//               post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
//             })`,
//           }}
//         >
//           <a
//             href={`/post/${post._id}`}
//             className="bg-blue-500 text-white font-medium px-2 py-1 my-1 rounded-full mt-2 absolute bottom-3 right-3"
//           >
//             Read more
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }



