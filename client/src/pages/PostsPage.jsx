import { useState } from 'react';
import { PostResults, TopicsSection } from '../components';

export function PostsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState('all');

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 font-pop bg-plum-400 min-h-[calc(100vh-3.0rem)]">
      <TopicsSection setSelectedTopicId={setSelectedTopicId} />
      {selectedTopicId !== null ? (
        <PostResults selectedTopicId={selectedTopicId} />
      ) : null}
    </div>
  );
}
