import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { PostCard, CreateAPost } from '../../components';
import { AuthContext } from '../../context/auth.context';
import { SearchContext } from '../../context/search.context';
import { useQuery } from '@tanstack/react-query';
import { postActions } from '../../services';

export function TopicDetails({ id, selectedTopicId }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);
  const [posts, setPosts] = useState([])
  const [isCreating, setIsCreating] = useState(false);
  const createPostRef = useRef(null);

  const { data: postsData = [], isFetching } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const { posts: topicPosts } =
        id === 'all'
          ? await postActions.getPosts()
          : await postActions.getPost(id);

      const filteredPosts = topicPosts.filter(
        (post) =>
          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      const postSortedByDate = filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      return { posts: postSortedByDate };
    },

    // queryFn: async () => {
    //   if (id === 'all') {
    //     const { posts: topicPosts } = await postActions.getPosts();
    //     const filteredPosts = topicPosts.filter(
    //       (post) =>
    //         post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    //     );

    //     const postSortedByDate = filteredPosts.sort(
    //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    //     );

    //     return { posts: postSortedByDate };
    //   } else {
    //     const { topic, posts: topicPosts } = await postActions.getPost(id);

    //     const filteredPosts = topicPosts.filter(
    //       (post) =>
    //         post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    //     );

    //     const postSortedByDate = filteredPosts.sort(
    //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    //     );

    //     return { topic, posts: postSortedByDate };
    //   }
    // },

    staleTime: 1000 * 60 * 5,
  });

  // useEffect(() => {
  //   if (id !== 'all') {
  //     api
  //       .get(`/api/topic/details/${id}`)
  //       .then((response) => {
  //         setTopic(response?.data?.topic);
  //         setPosts(response?.data?.topic?.posts);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [id]);

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
          {/* {!postsData.topic ? 'ALL POSTS' : 'TOPIC:  ' + postsData.topic.title} */}
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
          <p>Cargando...</p>
        ) : postsData && postsData.posts && postsData.posts.length > 0 ? (
          postsData.posts.map((post) => (
            <div key={post._id} className="flex justify-center">
              {post && <PostCard post={post} />}
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>

      <div className="w-full">
        {isCreating && (
          <div ref={createPostRef}>
            <CreateAPost
              id={id}
              posts={postsData.posts || []}
              setPosts={setPosts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
