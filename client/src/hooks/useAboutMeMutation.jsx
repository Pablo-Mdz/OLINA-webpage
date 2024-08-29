import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actions } from '../services';

export const useAboutMeMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: actions.postAboutMe,

    // Optimistically update the cache before the mutation occurs
    onMutate: async (newAboutMe) => {
      // Create an optimistic response with a temporary ID
      const optimisticAboutMe = { ...newAboutMe, id: Math.random() };
      console.log('optimisticProduct: ', optimisticAboutMe);

      // Add the optimistic response to the cache under the 'aboutMe' key
      queryClient.setQueryData(['aboutMe'], (oldData) => {
        if (!oldData) return [optimisticAboutMe];
        return [...oldData, optimisticAboutMe];
      });

      // Return the optimistic response so it can be used in case of rollback
      return { optimisticAboutMe };
    },

    // On successful mutation
    onSuccess: (data, variables, context) => {
      console.log('On successful mutation', { data, variables, context });

      // Remove the optimistic response from the cache
      queryClient.removeQueries({
        queryKey: ['aboutMe', context?.optimisticAboutMe.id],
        exact: true,
      });

      // Replace the optimistic response with the actual data from the server
      queryClient.setQueryData(['aboutMe'], (oldData) => {
        if (!oldData) return [data];
        return oldData.map((cacheProduct) =>
          cacheProduct.id === context?.optimisticAboutMe.id
            ? data
            : cacheProduct,
        );
      });
    },

    // On error during the mutation
    onError: (error, variables, context) => {
      console.log({ error, variables, context });

      // Remove the optimistic response from the cache
      queryClient.removeQueries({
        queryKey: ['aboutMe', context?.optimisticAboutMe.id],
        exact: true,
      });

      // Filter out the optimistic response from the cache
      queryClient.setQueryData(['aboutMe'], (oldData) => {
        if (!oldData) return [];
        return oldData.filter(
          (product) => product.id !== context?.optimisticAboutMe.id,
        );
      });
    },
  });

  return mutation;
};
