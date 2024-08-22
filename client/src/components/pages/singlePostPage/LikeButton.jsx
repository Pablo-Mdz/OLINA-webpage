import { useState, useEffect } from 'react';
import axios from 'axios';

export function LikeButton({ id, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`/api/post/${id}/likes`);
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
    const newLikes = !liked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    setLiked(!liked);
    localStorage.setItem(`post-${id}`, JSON.stringify(!liked));

    axios
      .put(`/api/post/likes/${id}`, { likes: newLikes })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="inline-block bg-blackToPink-100 rounded-full border-none px-3 py-1 text-sm font-semibold text-gray-700 hover:text-plum-400 hover:bg-blackToPink-200 mr-2 mb-2"
      onClick={handleClick}
    >
      <span className="mr-1">{liked ? '❤️' : '🤍'}</span>
      <span>{likes} Likes</span>
    </button>
  );
}
