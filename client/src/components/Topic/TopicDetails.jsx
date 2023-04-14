import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from '../Blog/PostCard';
import CreateAPost from '../Blog/CreateAPost';
import { AuthContext } from '../../context/auth.context';

export default function TopicDetails({ id }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const filteredPost = posts.filter(
    (post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const postSortedByDate = filteredPost.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  useEffect(() => {
    axios
      .get(`/api/topic/details/${id}`)
      .then((response) => {
        setTopic(response?.data?.topic);
        setPosts(response?.data?.topic?.posts);
      })
      .catch((err) => console.log(err));
  }, [id, search]);

  return (
    <div className="topic-details-container w-full px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 font-pop mt-6">
        TOPIC: {topic.title}
      </h1>

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
        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6 mx-auto sm:mx-0">
        {postSortedByDate.map((post) => (
          <div key={post._id}>{post && <PostCard post={post} />}</div>
        ))}
      </div>
      <div className="">
        {isLoggedIn && (
          <CreateAPost id={id} setPosts={setPosts} posts={posts} />
        )}
      </div>
    </div>
  );
}
