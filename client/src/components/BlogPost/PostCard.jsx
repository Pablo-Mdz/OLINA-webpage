// import React from 'react';
// import { ReadingTime } from '../Words/ReadingTime';

// export default function PostCard({ post, RTime }) {
//   //   const { isLoggedIn, user } = useContext(AuthContext);

// //   if (!post) {
// //     return null;
// //   }
  
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
//       {/* <div className="w-full h-96 rounded overflow-hidden shadow-lg bg-opacity-25 relative flex">
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
//                 Created by: {post.author?.name}
//               </p>
//               <p>{post.likes} ❤️ </p>
//               <p>{post.comments.length} Comments</p>
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
//       </div> */}
//    <div className="w-[405px] h-[420px] relative bg-white rounded-xl border border-black border-opacity-70">
//   <div className="w-[380px] h-[400px] left-[13px] top-[10px] absolute bg-white" />
//   <div className="w-[120px] h-[92px] left-[43px] top-[105px] absolute text-stone-900 text-opacity-80 text-sm font-medium font-['Inter']">Lorem ipsum dolor sit amet consectetur. Elit justo volutpat id sem ullamcorper viverra lobortis.</div>
//   <div className="w-[147px] left-[33px] top-[24px] absolute text-stone-900 text-sm font-bold font-['Inter']">{post.title}</div>
//   <img className="w-[190px] h-[400px] left-[207px] top-[10px] absolute rounded-[10px]" src="https://via.placeholder.com/190x400" />
//   <div className="px-1 py-1.5 left-[312px] top-[370px] absolute bg-sky-500 rounded-md border border-black border-opacity-70 justify-center items-center gap-2.5 inline-flex">
//     <div className="text-black text-xs font-normal font-['Inter']">Read  More</div>
//   </div>
//   <div className="h-[76px] px-2 left-[2px] top-[330px] absolute flex-col justify-start items-start gap-[5px] inline-flex">
//     <div className="w-[105px] justify-between items-center inline-flex">
//       <div className="text-black text-xs font-normal font-['Inter']">0</div>
//     </div>
//     <div className="w-[105px] justify-between items-start inline-flex">
//       <div className="text-black text-xs font-normal font-['Inter']">Comments</div>
//       <div className="text-stone-900 text-xs font-normal font-['Inter']">0</div>
//     </div>
//     <div className="w-[163px] justify-between items-start inline-flex">
//       <div className="text-black text-xs font-normal font-['Inter']">Date:</div>
//       <div className="text-stone-900 text-xs font-normal font-['Inter']">20.04.2023</div>
//     </div>
//     <div className="text-stone-900 text-opacity-70 text-xs font-normal font-['Inter']">Aprox reading time: 5 min</div>
//   </div>
// </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post, RTime }) {
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
      <div className="w-[405px] h-[420px] relative bg-white rounded-xl border border-black border-opacity-70">
        <div className="w-[380px] h-[400px] left-[13px] top-[10px] absolute bg-white" />
        <div className="w-[120px] h-[92px] left-[43px] top-[105px] absolute text-stone-900 text-opacity-80 text-sm font-medium font-['Inter']">
              <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
        </div>
        <div className="w-[147px] left-[33px] top-[24px] absolute text-stone-900 text-sm font-bold font-['Inter']">
          {post.title}
        </div>
        <img className="w-[190px] h-[auto] left-[207px] top-[10px] absolute rounded-[10px]" src={post.imgUrl ? post.imgUrl : 'https://via.placeholder.com/190x400'} alt="Post" />
        <div className="px-1 py-1.5 left-[312px] top-[370px] absolute bg-sky-500 rounded-md border border-black border-opacity-70 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-xs font-normal font-['Inter']">Read More</div>
        </div>
        <div className="h-[76px] px-2 left-[2px] top-[330px] absolute flex-col justify-start items-start gap-[5px] inline-flex">
          <div className="w-[105px] justify-between items-center inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">{post.likes} ❤️</div>
          </div>
          <div className="w-[105px] justify-between items-start inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">Comments</div>
            <div className="text-stone-900 text-xs font-normal font-['Inter']">{post.comments.length}</div>
          </div>
          <div className="w-[163px] justify-between items-start inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">Date:</div>
            <div className="text-stone-900 text-xs font-normal font-['Inter']">{new Date(date).toLocaleDateString('es-ES')}</div>
          </div>
          <div className="text-stone-900 text-opacity-70 text-xs font-normal font-['Inter']">
          <ReadingTime text={post.body} />
          </div>
        </div>
      </div>
    </>
  );
}
