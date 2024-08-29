import { useQuery } from '@tanstack/react-query';
import { actions } from '../services';

export const useTopics = () => {
  const { data: topics, isFetching } = useQuery({
    queryKey: ['topics'],
    queryFn: () => actions.getTopics(),
  });

  return { topics, isFetching };
};
