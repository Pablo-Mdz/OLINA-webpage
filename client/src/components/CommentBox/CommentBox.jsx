import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentBox ({ postId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);



 /*  useEffect(() => {
    axios.get(`/api/comment/`)
      .then(response => {
        setComments(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [postId]); */

  const handleSubmit = e => {
    e.preventDefault();

    const requestBody = {
      comment,
      postId
    };

    axios.post('/api/comment', requestBody)
      .then(response => {
        console.log(response)
        setComment('');
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div>
      <div>
      {/* {
        comments?.commentsFromDB?.map((comment) => (
        <div key={comment._id}>
          <p>{comment.body}</p>
        </div>
      ))} */}
      </div>
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
