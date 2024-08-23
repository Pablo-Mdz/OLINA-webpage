import { useQueryClient } from '@tanstack/react-query';
import { postActions } from '../services';

export const usePrefetchPosts = () => {
  const queryClient = useQueryClient();

  const prefetchPosts = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 'all', ''],
      queryFn: () => postActions.getPosts(),
    });
  };

  return prefetchPosts;
};
