import { useQuery } from '@tanstack/react-query';
import { postActions } from '../services';

export const useTopics = () => {
  const { data: topics, isFetching } = useQuery({
    queryKey: ['topics'],
    queryFn: () => postActions.getTopics(),
  });

  return { topics, isFetching };
};
