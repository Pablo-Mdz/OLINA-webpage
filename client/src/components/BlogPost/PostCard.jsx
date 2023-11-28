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
  console.log(post.comments);
  return (
    <>
  <div className="flex flex-wrap -mx-4 mx-10">
    <div className="w-96 rounded overflow-hidden shadow-lg bg-opacity-25 flex flex-col mx-2">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
          })`
        }}
      ></div>

      
      <div className="bg-white border border-black border-opacity-50 p-4 flex-1">
        <h1 className="text-xl font-bold mb-1">{post.title}</h1>
        <div
          className="overflow-hidden"
          style={{ maxHeight: 'calc(100% - 8rem)' }}
        >
          <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
        </div>

        <footer className="mt-4">
          <div className="text-sm">
            <p className="text-gray-600">
              Tiempo de lectura: <ReadingTime text={post.body} />
            </p>
            <p className="text-gray-600">
              Fecha: {new Date(post.date).toLocaleDateString('es-ES')}
            </p>
            <p className="text-gray-900 font-medium">
              Creado por: {post.author.name}
            </p>
            <p>{post.likes} ❤️</p>
            <p>{post.comments.length} Comentarios</p>
          </div>
          <a
            href={`/post/${post._id}`}
            className="bg-blue-500 text-white font-medium px-2 py-1 my-1 rounded-full inline-block mt-2"
          >
            Leer más
          </a>
        </footer>
      </div>
    </div>
  </div>
</>

  );
}

    // <>
    //   <div className="flex flex-wrap -mx-4 mx-10">
    //     <div className="w-96 h-96 rounded overflow-hidden shadow-lg bg-opacity-25 relative  flex mx-2">
    //       {/* <div className='Rectangle w-96 h-96 bg-white rounded-lg border border-black border-opacity-50 '> */}
    //       <div className="w-1/2 relative z-10">
    //         <div
    //           className="w-96 h-1/2 left-0 top-0 absolute bg-white  border border-black border-opacity-50"
    //           //   className="w-1/2 h-full bg-cover bg-no-repeat bg-center bg-opacity-75 relative"
    //           style={{
    //             backgroundImage: `url(${
    //               post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
    //             })`,
    //           }}
    //         >
    //           <div className="w-96 h-96 absolute left-0  top-0">
    //             <div className=" px-6 py-4 ">
    //               <h1 className="text-xl font-bold  mb-1">{post.title}</h1>
    //             </div>
    //           <div
    //             className="align-start mx-2 my-1 overflow-hidden"
    //             style={{
    //                 maxHeight: 'calc(100% - 8rem)',
    //             }}
    //             >
    //             <div
    //               dangerouslySetInnerHTML={{ __html: postBodyPreview() }}
    //               ></div>
    //           </div>
    //               </div>
    //         </div>
    //         <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
    //           <div className="text-sm text-left">
    //             <ReadingTime text={post.body} />
    //             <p className="text-gray-600 my-2">
    //               Date: {new Date(date).toLocaleDateString('es-ES')}
    //             </p>
    //             <p className="text-gray-900 font-medium">
    //               Created by: {post.author.name}
    //             </p>
    //             <p>{post.likes} ❤️ </p>
    //             <p>{post.comments.length} Comments</p>
    //           </div>
    //         </footer>
    //       </div>
    //       <div
    //         className=" Rectangle3 w-20 h-9 left-[112px] top-0 absolute bg-stone-300 bg-opacity-50 rounded-lg"
    //         //   className="w-1/2 h-full bg-cover bg-no-repeat bg-center bg-opacity-75 relative"
    //         style={{
    //           backgroundImage: `url(${
    //             post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
    //           })`,
    //         }}
    //       >
    //         <a
    //           href={`/post/${post._id}`}
    //           className="bg-blue-500 text-white font-medium px-2 py-1 my-1 rounded-full mt-2 absolute bottom-3 right-3"
    //         >
    //           Read more
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </>