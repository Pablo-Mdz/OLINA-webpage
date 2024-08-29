import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { actions } from '../services';
import { SearchContext } from '../context/search.context';

export const usePosts = (selectedTopicId) => {
  const { searchTerm } = useContext(SearchContext);

  const { data: postsData = [], isFetching } = useQuery({
    queryKey: ['posts', selectedTopicId, searchTerm],
    queryFn: async () => {
      const { posts, topic } =
        selectedTopicId === 'all'
          ? await actions.getPosts()
          : await actions.getPostsByTopicId(selectedTopicId);

      const filteredPosts = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      const postSortedByDate = filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      return { posts: postSortedByDate, topic };
    },
  });

  return { postsData, isFetching };
};
