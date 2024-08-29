import { useDeleteAboutMe } from '../../../hooks';

export function DeleteAboutMe({ aboutMe }) {
  const deleteMutation = useDeleteAboutMe();

  const handleDelete = () => {
    deleteMutation.mutate(aboutMe._id);
  };

  return (
    <div>
      <button
        type="button"
        className="px-4 py-1 border-2 border-gray-900 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={handleDelete}
        disabled={deleteMutation.isLoading}
      >
        {deleteMutation.isLoading ? 'Deleting...' : 'Delete About Me'}
      </button>
    </div>
  );
}
