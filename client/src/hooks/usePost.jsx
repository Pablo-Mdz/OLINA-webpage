// getPostById
import { useQuery } from '@tanstack/react-query';
import { postActions } from '../services';

export const usePost = (postId) => {
  const { data: post = {}, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const post = await postActions.getPostById(postId);
      return post;
    },
  });
  return { post, isFetching };
};
