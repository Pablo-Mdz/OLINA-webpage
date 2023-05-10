import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentBox ({ postId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/post/comments/${postId}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [postId]);

  const handleSubmit = e => {
    e.preventDefault();

    const requestBody = {
      comment,
      postId
    };

    axios.post('/api/post/comments', requestBody)
      .then(res => {
        setComments([...comments, res.data]);
        setComment('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea 
            id="comment" 
            value={comment} 
            onChange={e => setComment(e.target.value)}
            placeholder='Write a comment..'
         />
        </div>
        <button>
            Send
        </button>
      </form>
     </div>
  );
}       
