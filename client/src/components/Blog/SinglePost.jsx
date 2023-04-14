import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useReactToPrint } from 'react-to-print';
import EditPostCard from './EditPostCard';

export const SinglePost = ({ onEdit }) => {
  const [post, setPost] = useState(null);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((response) => {
      setPost(response.data);
      setPostBeingEdited(response.data);
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setPostBeingEdited(postBeingEdited);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Como sube y baja',
    pageStyle: 'print',
    onafterprint: () => alert('print success'),
  });

  const cancelEditing = () => {
    setPostBeingEdited({});
    handleEdit();
  };

  return (
    <>
      <div
        ref={componentRef}
        className="flex justify-center items-center relative bg-gray-200 pt-5 pb-10"
      >
        {postBeingEdited && (
          <div className="max-w-2xl mt-5 bg-gray-50 rounded-2xl overflow-hidden shadow-lg ">
            {!post?.image && (
              <img
                alt="pic"
                className="w-full h-auto  rounded-t-2xl"
                src="https://source.unsplash.com/random/500x300"
              />
            )}
            {post?.image && (
              <img
                alt="user"
                className="w-full h-auto  rounded-t-2xl "
                src={post?.image}
              />
            )}
            <div className="px-6 py-4 place-self-start">
              <div className="mb-2 text-4xl font-bold ">
                <h1>{post?.title}</h1>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post?.body }}></div>
            </div>
            <a href="/topics">
              <span className="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-700 mr-2 mb-2  hover:text-white">
                Return to topics
              </span>
            </a>
            <span
              onClick={handlePrint}
              className="mr-2 mb-2  inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
            >
              Print
            </span>
            {isLoggedIn && user?._id === post?.author?._id && (
              <button
                onClick={handleEdit}
                className="bg-cyan-500 text-white font-medium px-8 py-1 my-1 rounded-full mt-2"
              >
                Edit
              </button>
            )}
            {isEditing && (
              <EditPostCard
                postBeingEdited={postBeingEdited}
                onCancel={cancelEditing}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
