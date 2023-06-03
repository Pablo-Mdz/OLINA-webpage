import { useState, useEffect } from 'react';
import axios from "axios";

export default function LikeButton({ id, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const response = await axios.get(`/api/post/${id}/likes`);
            // console.log("RESPONSE: ", response.data)
            setLikes(response.data.likes);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLikes();
      }, [id]);

      useEffect(() => {
        const isLiked = JSON.parse(localStorage.getItem(`post-${id}`));
        if (isLiked) {
          setLiked(true);
        }
      }, [id]);  
  
    const handleClick = () => {
      const newLikes = !liked ? likes + 1 : likes - 1 ;
      setLikes(newLikes);
      setLiked(!liked);
      localStorage.setItem(`post-${id}`, JSON.stringify(!liked));
  
      axios.put(`/api/post/likes/${id}`, { likes: newLikes })
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => console.log(error));
        
    };

  return (
    <button onClick={handleClick} >
      <span>{liked ? '❤️' : '🤍'}</span>
      <span>{likes} Likes</span>
    </button>
  );
}

