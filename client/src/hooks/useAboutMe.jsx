import { useQuery } from '@tanstack/react-query';
import { postActions } from '../services';

export const useAboutMe = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['aboutMe'],
    queryFn: () => postActions.getAboutMe(),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isFetching };
};
