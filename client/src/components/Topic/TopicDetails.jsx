import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../Blog/PostCard';
import CreateAPost from '../Blog/CreateAPost';
import EditPostCard from '../Blog/EditPostCard';
import { AuthContext } from '../../context/auth.context';
import EditTopic from './EditTopic';

export default function TopicDetails() {
  const params = useParams();
  const id = params.id;

  const { isLoggedIn } = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBeingEdited, setPostBeingEdited] = useState({});

  const handleEditPost = (post) => {
    setPostBeingEdited(post);
  };

  useEffect(() => {
    axios
      .get(`/api/topic/details/${id}`)
      .then((response) => {
        setTopic(response?.data?.topic);
        setPosts(response?.data?.topic?.posts);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const cancelEditing = () => {
    setPostBeingEdited({});
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-pop mt-6">
        TOPIC: {topic.title}
      </h1>
      <EditTopic topic={topic} />
      <div className="flex px-1 justify-items-end "></div>
      <Link
        to="/topics"
        className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full my-4"
      >
        return to topics
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {postBeingEdited === post ? (
              <EditPostCard
                postBeingEdited={postBeingEdited}
                onCancel={cancelEditing}
              />
            ) : (
              <PostCard post={post} onEdit={handleEditPost} />
            )}
          </div>
        ))}
      </div>
      {isLoggedIn && <CreateAPost setPosts={setPosts} posts={posts} />}
    </>
  );
}
