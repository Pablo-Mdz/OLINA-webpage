import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useLayoutEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useReactToPrint } from 'react-to-print';
import EditPostCard from './EditPostCard';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FaFacebook, FaTwitter, FaLink, FaLinkedin } from 'react-icons/fa';
import { ReadingTime } from '../Words/ReadingTime';
import LikeButton from './LikeButton';

export const SinglePost = ({ onEdit }) => {
  const [post, setPost] = useState(null);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const editPostRef = useRef(null);
  const { id } = useParams();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((response) => {
      setPost(response.data);
      setPostBeingEdited(response.data);
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && editPostRef.current) {
      editPostRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  useLayoutEffect(() => {
    if (isEditing && editPostRef.current) {
      editPostRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isEditing]);

  return (
    <>
      <div
        ref={componentRef}
        className="flex justify-center items-center relative bg-gray-200 pt-5 pb-10 font-pop"
      >
        {postBeingEdited && (
          <div className="max-w-4xl mt-5 bg-gray-50 rounded-2xl overflow-hidden shadow-lg ">
            {!post?.imgUrl && (
              <img
                alt="pic"
                className="w-full h-auto  rounded-t-2xl"
                src="https://picsum.photos/500/300"
              />
            )}
            {post?.imgUrl && (
              <img
                alt="user"
                className="w-full h-auto  rounded-t-2xl "
                src={post?.imgUrl}
              />
            )}
            <div className="px-6 py-4 place-self-start">
              {post && <ReadingTime text={post.body} />}
              <div className="my-8 text-4xl font-bold ">
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
            <LikeButton id={id} initialLikes={post?.likes} />
            <div className="my-1 space-x-4">
              <FacebookShareButton
                quote={post?.title}
                url={window.location.href}
                hashtag="#myblog"
              >
                <FaFacebook size={20} />
              </FacebookShareButton>
              <TwitterShareButton
                title={post?.title}
                url={window.location.href}
                via="@myblog"
              >
                <FaTwitter size={20} />
              </TwitterShareButton>
              <LinkedinShareButton>
                <FaLinkedin size={20} />
              </LinkedinShareButton>
              <button onClick={copyToClipboard}>
                {isCopied ? 'Copied!' : <FaLink />}
              </button>
            </div>
            {isLoggedIn && user?._id === post?.author?._id && (
              <button
                onClick={handleEdit}
                className="bg-cyan-500 text-white font-medium px-8 py-1 my-1 rounded mt-2"
              >
                {!isEditing ? 'Edit' : 'finish edition'}
              </button>
            )}
            {isEditing && (
              <div ref={editPostRef}>
                <EditPostCard
                  postBeingEdited={postBeingEdited}
                  onCancel={cancelEditing}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
