import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { postActions } from '../services';
import { SearchContext } from '../context/search.context';

export const usePosts = (selectedTopicId) => {
  const { searchTerm } = useContext(SearchContext);
  const { data: postsData = [], isFetching } = useQuery({
    queryKey: ['posts', selectedTopicId],
    queryFn: async () => {
      const { posts, topic } =
        selectedTopicId === 'all'
          ? await postActions.getPosts()
          : await postActions.getPostsByTopicId(selectedTopicId);

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
    staleTime: 1000 * 60 * 5,
  });

  return { postsData, isFetching };
};
