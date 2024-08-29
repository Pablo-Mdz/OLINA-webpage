// getPostById
import { useQuery } from '@tanstack/react-query';
import { actions } from '../services';

export const usePost = (postId) => {
  const { data: post = {}, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const post = await actions.getPostById(postId);
      return post;
    },
  });
  return { post, isFetching };
};
