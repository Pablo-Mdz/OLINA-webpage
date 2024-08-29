import { useQueryClient } from '@tanstack/react-query';
import { actions } from '../services';

export const usePrefetchPost = () => {
  const queryClient = useQueryClient();

  const prefetchPost = (postId) => {
    queryClient.prefetchQuery({
      queryKey: ['post', postId],
      queryFn: () => actions.getPostById(postId),
    });
  };

  return prefetchPost;
};
