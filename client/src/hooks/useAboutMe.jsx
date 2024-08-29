import { useQuery } from '@tanstack/react-query';
import { actions } from '../services';

export const useAboutMe = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['aboutMe'],
    queryFn: () => actions.getAboutMe(),
  });

  return { data, isFetching };
};
