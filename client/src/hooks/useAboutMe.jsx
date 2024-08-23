import { useQuery } from '@tanstack/react-query';
import { postActions } from '../services';

export const useAboutMe = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['aboutMe'],
    queryFn: () => postActions.getAboutMe(),
  });

  return { data, isFetching };
};
