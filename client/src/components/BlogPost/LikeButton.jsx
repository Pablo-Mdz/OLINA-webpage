import { useState, useEffect } from 'react';
import axios from "axios";

export default function LikeButton({ id, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const response = await axios.get(`/api/post/${id}/likes`);
            console.log("RESPONSE: ", response.data)
            setLikes(response.data.likes);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLikes();
      }, [id]);
  
    const handleClick = () => {
      const newLikes = liked ? likes - 1 : likes + 1;
      setLikes(newLikes);
      setLiked(!liked);
  
      axios.put(`/api/post/${id}`, { likes: newLikes })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.log(error));
        
    };

  return (
    <button onClick={handleClick}>
      <span>{liked ? '❤️' : '🤍'}</span>
      <span>{likes} Likes</span>
    </button>
  );
}

