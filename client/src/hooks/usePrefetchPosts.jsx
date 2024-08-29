import { useQueryClient } from '@tanstack/react-query';
import { actions } from '../services';

export const usePrefetchPosts = () => {
  const queryClient = useQueryClient();

  const prefetchPosts = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 'all', ''],
      queryFn: () => actions.getPosts(),
    });
  };

  return prefetchPosts;
};
