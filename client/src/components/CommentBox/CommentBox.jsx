import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { usePostComment } from '../../hooks/usePostComment';

export function CommentBox({ postId, onCommentMade }) {
  const [comment, setComment] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);

  const { mutate: postComment, isLoading } = usePostComment(
    postId,
    onCommentMade,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() === '') return;

    const commentData = {
      comment,
      postId,
      userId: user._id,
    };

    postComment(commentData, {
      onSuccess: () => {
        setComment('');
      },
    });
  };

  return (
    <div>
      <h3>Leave a Comment:</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start ">
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment.."
            className="bg-blackToPink-200 w-2/5"
          />

          <button
            disabled={!isLoggedIn || isLoading}
            className={`border-0 ${
              isLoggedIn
                ? 'bg-blackToPink-200 hover:bg-blackToPink-300'
                : 'bg-plum-300'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
