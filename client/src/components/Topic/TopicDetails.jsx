import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../Blog/PostCard';
import CreateAPost from '../Blog/CreateAPost';
import EditPostCard from '../Blog/EditPostCard';
import { AuthContext } from '../../context/auth.context';
import EditTopic from './EditTopic';
import TopicPage from '../../pages/TopicPage';

export default function TopicDetails() {
  const params = useParams();
  const id = params.id;

  const { isLoggedIn } = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [topicBeingEdited, setTopicBeingEdited] = useState({});

  const handleEditPost = (post) => {
    setPostBeingEdited(post);
  };

  const handleEditTopic = (topic) => {
    setTopicBeingEdited(topic);
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
    setTopicBeingEdited({});
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-pop mt-6">
        TOPIC: {topic.title}
      </h1>
      <EditTopic
        topic={topic}
      />
      
      <div className="flex px-1 justify-items-end "></div>

      {/* {!topicBeingEdited === topic ? (
          ) : (
        <postsCard />
      )} */}
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
                    <PostCard className="py-2" post={post} onEdit={handleEditPost} />
                    )}
            {/* <div className="p-6">
              <p className="text-gray-800 text-base">Date: {new Date(post.createdAt).toLocaleDateString('es-ES')}</p>
            </div> */}
          </div>
        ))}
      </div>
      {isLoggedIn && <CreateAPost setPosts={setPosts} posts={posts} />}
    </>
  );
}
