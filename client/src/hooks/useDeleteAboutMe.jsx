import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actions } from '../services';

export const useDeleteAboutMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => actions.deleteAboutMe(id),
    onSuccess: () => {
      queryClient.invalidateQueries('aboutMe');
    },
    onError: (error) => {
      console.error('Error deleting About Me:', error);
    },
  });
};
