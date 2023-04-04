import { Link } from 'react-router-dom';


export default function TopicCard({ topic }) {

  const date = new Date(topic.createdAt).toLocaleString();
  console.log(topic.author.name)

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
    
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{topic.title}</div>
    </div>
    <Link to={`/topics/${topic._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
      <div className="flex items-center mt-4">
        <img className="w-10 h-10 rounded-full mr-4" src="" alt="" />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Created by: {topic?.author?.name} </p>
          <p className="text-gray-600">{date}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}
