import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { PostCard, CreateAPost } from '..';
import { AuthContext } from '../../context/auth.context';
import { usePosts, usePrefetchPost } from '../../hooks';

export function PostResults({ selectedTopicId }) {
  const { isLoggedIn } = useContext(AuthContext);
  const prefetchPost = usePrefetchPost();

  const [isCreating, setIsCreating] = useState(false);
  const createPostRef = useRef(null);

  const { postsData, isFetching } = usePosts(selectedTopicId);

  const handleCreatePost = () => {
    setIsCreating(!isCreating);
  };

  useLayoutEffect(() => {
    if (isCreating && createPostRef.current) {
      createPostRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCreating]);

  return (
    <div className="topic-details-container w-full px-4 bg-plum-400">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-4xl font-bold text-gray-800 font-pop my-8 ml-24 w-full text-start">
          {!postsData.topic ? 'ALL POSTS' : 'TOPIC:  ' + postsData.topic.title}
        </h1>

        {isLoggedIn && selectedTopicId !== 'all' && (
          <button
            onClick={handleCreatePost}
            className="bg-cyan-500 text-white font-medium px-6 my-4 p-2 rounded mt-2 top-4 right-4 z-10 whitespace-nowrap"
          >
            {!isCreating ? 'Create a Post' : 'hidde menu'}
          </button>
        )}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 mx-auto sm:mx-0"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))' }}
      >
        {isFetching ? (
          <p>Loading...</p>
        ) : postsData && postsData.posts && postsData.posts.length > 0 ? (
          postsData.posts.map((post) => (
            <div key={post._id} className="flex justify-center">
              {post && <PostCard post={post} prefetchPost={prefetchPost} />}
            </div>
          ))
        ) : (
          <p>There are no posts.</p>
        )}
      </div>

      <div className="w-full">
        {isCreating && (
          <div ref={createPostRef}>
            <CreateAPost topicId={selectedTopicId} />
          </div>
        )}
      </div>
    </div>
  );
}
