import { useQueryClient } from '@tanstack/react-query';
import { postActions } from '../services';

export const usePrefetchAboutMe = () => {
  const queryClient = useQueryClient();

  const prefetchAboutMe = () => {
    queryClient.prefetchQuery({
      queryKey: ['aboutMe'],
      queryFn: () => postActions.getAboutMe(),
    });
  };

  return prefetchAboutMe;
};
