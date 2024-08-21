import React, { useState, useRef, useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';
import { TbPrinter } from 'react-icons/tb';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { usePost } from '../hooks';
import { FaFacebook, FaTwitter, FaLink, FaLinkedin } from 'react-icons/fa';
import {
  ReadingTime,
  LikeButton,
  CommentBox,
  EditPostCard,
} from '../components';

const CommentSection = ({ postId, comments, isLoggedIn, deleteComment }) => {
  const queryClient = useQueryClient();
  return (
    <>
      <CommentBox
        postId={postId}
        onCommentMade={() => {
          queryClient.invalidateQueries(['post', postId]);
        }}
      />
      {comments.length > 0 && <h3>Comments: </h3>}
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.body}</p>
            {isLoggedIn && (
              <button onClick={() => deleteComment(comment._id)}>
                Delete: {comment._id}
              </button>
            )}
          </div>
        ))}
    </>
  );
};

const ShareButtons = ({ postTitle, isCopied, copyToClipboard }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 justify-start">
        <h4 className="text-blackToPink-200 text-xl">Share this: </h4>
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

export const SinglePostPage = () => {
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const editPostRef = useRef(null);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  const { post, isFetching } = usePost(id);

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
        queryClient.invalidateQueries(['post', id]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      ref={componentRef}
      className="flex relative bg-plum-400 pb-10 font-pop sm:px-32"
    >
      {postBeingEdited && (
        <div className="w-full mt-5 bg-plum-400 rounded-2xl overflow-hidden">
          <div>
            <h1 className="text-5xl font-bold text-blackToPink-200 capitalize">
              {post?.title}
            </h1>

            {!isFetching && post && <ReadingTime text={post.body} />}

            <div
              dangerouslySetInnerHTML={{ __html: post?.body }}
              className="post-content"
            />
          </div>

          <div className="flex justify-between my-1 space-x-4 text-blackToPink-100 items-center">
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
              <a href="/posts">
                <span className="inline-block bg-blackToPink-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-blackToPink-200 mr-2 mb-2 hover:text-plum-400">
                  Return to posts
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
                <EditPostCard postBeingEdited={post} onCancel={cancelEditing} />
              </div>
            )}
          </div>
          <div className="mt-20">
            <CommentSection
              postId={id}
              comments={post?.comments}
              isLoggedIn={isLoggedIn}
              reloadComments={() => queryClient.invalidateQueries(['post', id])}
              deleteComment={deleteComment}
            />
          </div>
        </div>
      )}
    </div>
  );
};
