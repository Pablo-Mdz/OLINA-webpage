import { useState, useContext, useMemo } from 'react';
import { CreateATopic, EditTopic } from '..';
import { AuthContext } from '../../context/auth.context';
import { useQueryClient } from '@tanstack/react-query';
import { useTopics } from '../../hooks';

export function TopicsSection({ setSelectedTopicId }) {
  const queryClient = useQueryClient();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [addTopic, setAddTopic] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  const { topics, isFetching } = useTopics();

  const TopicsSortedByDate = useMemo(() => {
    if (!topics) return [];
    return topics.topics.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [topics]);

  const handleTopicCreated = () => {
    queryClient.invalidateQueries(['topics']);
  };

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

  const hideCreateTopic = () => {
    setAddTopic(false);
  };

  isFetching && <div>Cargando...</div>;

  return (
    <div className="md:w-1/5 bg-opacity-50 mt-10">
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
  );
}
