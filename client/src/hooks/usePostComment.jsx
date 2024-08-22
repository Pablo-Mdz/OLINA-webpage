import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postActions } from '../services';

export const usePostComment = (postId, onSuccessCallback) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commentData) => postActions.postComment(commentData),
    onSuccess: (data) => {
      // Clear the comment input or do any other necessary updates
      onSuccessCallback();

      // Optionally, invalidate the query to refresh comments for the specific post
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  return mutation;
};
