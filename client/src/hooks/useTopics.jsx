import { useQuery } from '@tanstack/react-query';
import { postActions } from '../services';

export const useTopics = () => {
  const { data: topics, isFetching } = useQuery({
    queryKey: ['topics'],
    queryFn: () => postActions.getTopics(),
    staleTime: 1000 * 60 * 5,
  });
  
  return { topics, isFetching };
};
