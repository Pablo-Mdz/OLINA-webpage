import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

import TopicCard from '../components/Topic/TopicCard';

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/topic/list-topics').then((response) => {
      setTopics(response.data.topics);
    });
  }, []);

  const TopicsSortedByDate = topics.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Topic Page</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
          {/* <Post /> */}
          {TopicsSortedByDate.sort(
            (a, b) => Date(b.createdAt) - Date(a.createdAt),
          ).map((topic) => (
            <div className='transform h-42  duration-500 hover:shadow-xl'>
            <TopicCard  key={topic._id} topic={topic} />
                  </div>
          ))}
        </div>

        <Link
          to="/create-topic"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 inline-block"
        >
          Create a topic
        </Link>
      </div>

    </>
  );
}

// second option
// import { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/auth.context';
// import Post from '../components/Blog/Post';
// import TopicCard from '../components/Topic/TopicCard';

// export default function TopicPage() {
//   const [topics, setTopics] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   const { isLoggedIn, user } = useContext(AuthContext);

//   useEffect(() => {
//     axios.get('/api/topic/list-topics').then((response) => {
//       setTopics(response.data.topics);
//     });
//   }, []);

//   const TopicsSortedByDate = topics.sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//   );

//   const handleTopicSelect = (topic) => {
//     setSelectedTopic(topic);
//     setPosts(topic.posts);
//   };

//   return (
//     <>
//       <div className="flex flex-row flex-wrap justify-between">
//         <div className="w-1/4 bg-gray-100 p-4">
//           <h1 className="text-lg font-bold mb-4">Topics</h1>
//           <ul>
//             {TopicsSortedByDate.map((topic) => (
//               <li
//                 key={topic._id}
//                 className="mb-2 cursor-pointer hover:text-blue-500"
//                 onClick={() => handleTopicSelect(topic)}
//               >
//                 {topic.title}
//               </li>
//             ))}
//           </ul>
//           <Link
//             to="/create-topic"
//             className="bg-blue-500 text-white px-4 py-2 rounded mt-8 inline-block"
//           >
//             <span className="text-xl">+</span> Create a topic
//           </Link>
//         </div>
//         <div className="flex-grow p-4">
//           <h1 className="text-lg font-bold mb-4">
//             {selectedTopic ? selectedTopic.title : 'Select a topic'}
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {posts.map((post) => (
//               <Post key={post._id} post={post} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
