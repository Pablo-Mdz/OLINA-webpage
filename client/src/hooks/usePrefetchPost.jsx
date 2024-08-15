import { useQueryClient } from '@tanstack/react-query';
import { postActions } from '../services';

export const usePrefetchPost = () => {
  const queryClient = useQueryClient();

  const prefetchPost = (postId) => {
    queryClient.prefetchQuery({
      queryKey: ['post', postId],
      queryFn: () => postActions.getPostById(postId),
      staleTime: 1000 * 60 * 5,
    });
  };

  return prefetchPost;
};
