import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import TopicCard from '../components/Topic/TopicCard';

export default function TopicPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('/api/topic/list-topics').then((response) => {
      setTopics(response.data.topics);
    });
  }, []);

  const TopicsSortedByDate = topics.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 font-pop">
      <div className="md:w-1/4 bg-[#9f1ee8] bg-opacity-25">
        {TopicsSortedByDate.map((topic) => (
          <button
            key={topic._id}
            className="text-left w-full text-lg font-medium text-gray-700 hover:text-gray-900 my-2"
          >
           <Link className="text-left w-full text-lg font-medium text-gray-700 hover:text-gray-900" to={`/topics/${topic._id}`} >{topic.title}</Link>  
          </button>
        ))}
        <Link
          to="/create-topic"
          className="mt-4 block text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          + Add a new topic
        </Link>
      </div>
    </div>
  );
}


// original code saved because the new go directly to /create-topic

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// // import { AuthContext } from '../context/auth.context';
// import TopicCard from '../components/Topic/TopicCard';

// export default function TopicPage() {
//   const [topics, setTopics] = useState([]);

// //   const { isLoggedIn, user } = useContext(AuthContext);

//   useEffect(() => {
//     axios.get('/api/topic/list-topics').then((response) => {
//       setTopics(response.data.topics);
//     });
//   }, []);

//   const TopicsSortedByDate = topics.sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//   );

//   return (
//     <>

//       {TopicsSortedByDate.sort(
//         (a, b) => Date(b.createdAt) - Date(a.createdAt),
//       ).map((topic) => (
//         <TopicCard key={topic._id} topic={topic} />
//       ))}

//       <Link to="/create-topic" className="">
//         Create a topic
//       </Link>
//     </>
//   );
// }
