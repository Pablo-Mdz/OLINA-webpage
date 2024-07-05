import { useState } from 'react';
import axios from 'axios';

export function CommentBox({ postId, onCommentMade }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      comment,
      postId,
    };

    axios
      .post('/api/comment', requestBody)
      .then((response) => {
        setComment('');
        onCommentMade();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Leave a Comment:</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center ">
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment.."
            className="bg-blackToPink-200 w-2/5"
          />
          <button className="bg-blackToPink-200 border-0 hover:bg-blackToPink-300">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
