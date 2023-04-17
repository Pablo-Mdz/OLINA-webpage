import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TopicDetails from '../components/Topic/TopicDetails';
import EditTopic from '../components/Topic/EditTopic';
import CreateATopic from '../components/Topic/CreateATopic';
import { AuthContext } from '../context/auth.context';

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [refreshTopics, setRefreshTopics] = useState(false);
  const [addTopic, setAddTopic] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('/api/topic/list-topics')
      .then((response) => {
        setTopics(response.data.topics);
        setRefreshTopics();
      })
      .catch((err) => console.log(err));
  }, [refreshTopics]);

  const TopicsSortedByDate = topics.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const handleClickTopic = (topicId) => {
    setSelectedTopicId(topicId);
  };
  const editTitle = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
  };

  const cancelEditing = () => {
    setSelectedTopic(null);
  };
  const addTopicButton = () => {
    setAddTopic(true);
  };
  const handleTopicCreated = () => {
    setRefreshTopics(true);
  };
  const hideCreateTopic = () => {
    setAddTopic(false);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 font-pop">
     <div className="md:w-1/5 bg-violetPro bg-opacity-50 !important">
        {TopicsSortedByDate.map((topic) => (
          <div key={topic._id} className="flex flex-col mb-2 ml-1">
            <div className="flex justify-between">
              <button
                className="text-left w-full text-lg font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleClickTopic(topic._id)}
              >
                {topic.title}
              </button>
              {isLoggedIn && topic.author._id === user.id && (
                <button className="mx-2" onClick={() => editTitle(topic)}>
                  <img
                    src="/editIcon.png"
                    alt="Edit icon"
                    className="inline w-8 h-8 ml-1"
                  />
                </button>
              )}
              {/* veryfy author not working <check populate> */}
            </div>
            {selectedTopic === topic && (
              <div className="mt-2">
                <EditTopic topic={selectedTopic} onCancel={cancelEditing} />
              </div>
            )}
          </div>
        ))}
        <button
          onClick={addTopicButton}
          className="mt-4 ml-1 block text-lg font-medium text-gray-700 hover:text-gray-900"
        >
          + Add a new topic
        </button>
        {addTopic && (
          <CreateATopic
            onTopicCreated={handleTopicCreated}
            hideCreateTopic={hideCreateTopic}
          />
        )}
      </div>
      {selectedTopicId !== null ? (
        <TopicDetails id={selectedTopicId} selectedTopicId={selectedTopicId} />
      ) : null}
    </div>
  );
}
