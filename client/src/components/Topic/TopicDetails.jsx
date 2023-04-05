import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../Blog/PostCard';
import CreateAPost from '../Blog/CreateAPost';
import EditPostCard from '../Blog/EditPostCard';
import { Link } from 'react-router-dom';

export default function TopicDetails() {
  const params = useParams();
  const id = params.id;

  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBeingEdited, setPostBeingEdited] = useState({});

  const handleEdit = (post) => {
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-pop mt-6">TOPIC: {topic.title}</h1>
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
              <PostCard post={post} onEdit={handleEdit} />
            )}
            <div className="p-6">
              <p className="text-gray-800 text-base">Date: {post.createdAt}</p>
            </div>
          </div>
        ))}
      </div>

      <CreateAPost setPosts={setPosts} posts={posts} />
    </>
  );
}
