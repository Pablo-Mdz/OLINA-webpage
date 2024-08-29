import { useQueryClient } from '@tanstack/react-query';
import { actions } from '../services';

export const usePrefetchAboutMe = () => {
  const queryClient = useQueryClient();

  const prefetchAboutMe = () => {
    queryClient.prefetchQuery({
      queryKey: ['aboutMe'],
      queryFn: () => actions.getAboutMe(),
    });
  };

  return prefetchAboutMe;
};
