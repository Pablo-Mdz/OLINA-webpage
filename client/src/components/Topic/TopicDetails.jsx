import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from '../Blog/PostCard';
import CreateAPost from '../Blog/CreateAPost';
import EditPostCard from '../Blog/EditPostCard';
import { AuthContext } from '../../context/auth.context';

export default function TopicDetails({ id }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  const [search, setSearch] = useState('');

  const filteredPost = posts.filter(
    (post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const postSortedByDate = filteredPost.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const handleEditPost = (post) => {
    setPostBeingEdited(post);
  };

  useEffect(() => {
    axios
      .get(`/api/topic/details/${id}`)
      .then((response) => {
        setTopic(response?.data?.topic);
        setPosts(response?.data?.topic?.posts);
        console.log('afrer set axios');
      })
      .catch((err) => console.log(err));
  }, [id, search]);
  console.log('id', id);
  console.log('post be edited', postBeingEdited);

  const cancelEditing = () => {
    setPostBeingEdited({});

  };

  return (
    <div className="topic-details-container w-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 font-pop mt-6">
        TOPIC: {topic.title}
      </h1>
      <div className="flex px-1 justify-items-end "></div>

      <label
        htmlFor="description"
        className="block text-gray-700 font-semibold mb-2"
      >
        SEARCH BAR
      </label>
      <input
        placeholder="Search by keywords.."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {postSortedByDate.map((post) => (
          <div
            key={post._id}
            // className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-102 transition duration-300"
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
      <div className=''>
      {isLoggedIn && <CreateAPost id={id} setPosts={setPosts} posts={posts} />}
      </div>
    </div>
  );
}

