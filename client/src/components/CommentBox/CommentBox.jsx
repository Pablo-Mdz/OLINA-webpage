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
        // console.log(response)

        setComment('');
        onCommentMade();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div></div>
      <h3>Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment.."
          />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
}
