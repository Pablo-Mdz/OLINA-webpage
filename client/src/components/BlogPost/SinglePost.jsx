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
import { TbPrinter } from 'react-icons/tb';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FaFacebook, FaTwitter, FaLink, FaLinkedin } from 'react-icons/fa';
import {
  ReadingTime,
  LikeButton,
  CommentBox,
  EditPostCard,
} from '../../components';

const CommentSection = ({
  postId,
  comments,
  isLoggedIn,
  reloadComments,
  deleteComment,
}) => {
  return (
    <>
      <CommentBox postId={postId} onCommentMade={reloadComments} />
      {comments && <h3>comments: </h3>}
      {comments?.map((comment) => (
        <div key={comment._id}>
          <p>{comment.body}</p>
          {isLoggedIn && (
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          )}
        </div>
      ))}
    </>
  );
};

const ShareButtons = ({ postTitle, isCopied, copyToClipboard }) => {
  return (
    <div className="flex justify-between w-2/5 pl-6">
      <h4 className="text-blackToPink-200 text-xl">Share this</h4>
      <div className="flex gap-4">
        <FacebookShareButton
          quote={postTitle}
          url={window.location.href}
          hashtag="#myblog"
        >
          <FaFacebook size={20} />
        </FacebookShareButton>

        <TwitterShareButton
          title={postTitle}
          url={window.location.href}
          via="@myblog"
        >
          <FaTwitter size={20} />
        </TwitterShareButton>

        <LinkedinShareButton url={window.location.href}>
          <FaLinkedin size={20} />
        </LinkedinShareButton>

        <div className="flex items-center h-20">
          <button
            className="bg-blackToPink-200 border-none text-plum-400"
            onClick={copyToClipboard}
          >
            {isCopied ? 'Copied!' : <FaLink />}
          </button>
        </div>
      </div>
    </div>
  );
};

export const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);
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
      console.log(response.data);
      setPostBeingEdited(response.data);
    });
  }, [id, reloadTrigger]);

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

  const deleteComment = (commentId) => {
    axios
      .delete(`/api/comment/${commentId}`)
      .then(() => {
        setReloadTrigger(!reloadTrigger);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div
        ref={componentRef}
        className="flex relative bg-plum-400 pb-10 font-pop"
      >
        {postBeingEdited && (
          <div className="w-full mt-5 bg-plum-400 rounded-2xl overflow-hidden">
            <div className="flex justify-between">
              <div className="px-6">
                <h1 className="text-5xl font-bold text-blackToPink-200 capitalize">
                  {post?.title}
                </h1>

                {post && <ReadingTime text={post.body} />}

                <div
                  dangerouslySetInnerHTML={{ __html: post?.body }}
                  className="post-content"
                />
              </div>
              <div className="mt-28 w-3/5 ">
                <CommentSection
                  postId={id}
                  comments={post?.comments}
                  isLoggedIn={isLoggedIn}
                  reloadComments={() => setReloadTrigger(!reloadTrigger)}
                  deleteComment={deleteComment}
                />
              </div>
            </div>

            <div className="flex w-2/5 justify-between my-1 space-x-4 text-blackToPink-100 items-center">
              <ShareButtons
                postTitle={post?.title}
                isCopied={isCopied}
                copyToClipboard={copyToClipboard}
              />

              <div>
                <span
                  onClick={handlePrint}
                  className="m-2 px-2 py-1 inline-block rounded-full bg-transparent text-blackToPink-200 hover:text-plum-400 hover:bg-blackToPink-200"
                >
                  <TbPrinter className="text-lg items-center" />
                </span>
                <a href="/topics">
                  <span className="inline-block bg-blackToPink-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-blackToPink-200 mr-2 mb-2 hover:text-plum-400">
                    Return to topics
                  </span>
                </a>
                <LikeButton id={id} initialLikes={post?.likes} />
              </div>
            </div>

            <div className="flex justify-center w-2/5 my-1 space-x-4 text-blackToPink-100 items-center">
              {isLoggedIn && user?._id === post?.author?._id && (
                <button
                  onClick={handleEdit}
                  className="bg-cyan-500 text-white font-medium px-8 py-1 my-1 rounded mt-2"
                >
                  {!isEditing ? 'Edit post' : 'finish edition'}
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
          </div>
        )}
      </div>
    </>
  );
};
