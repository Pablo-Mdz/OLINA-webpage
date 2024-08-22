import { Link } from 'react-router-dom';
import { findFirstImageUrl } from '../../helpers/findFirstImageUrl';

export function PostCard({ post, prefetchPost }) {
  const date = new Date(post.createdAt).toLocaleString();

  const postBodyPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.body, 'text/html');
    const textContent = doc.body.textContent || '';
    const words = textContent.split(' ');
    const maxLength = 3;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };

  const postTitlePreview = () => {
    const words = post.title.split(' ');
    const maxLength = 5;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };

  const imgUrl = findFirstImageUrl(post.body);
  // TODO: create placeholder image to replace picsum.photos

  return (
    <div onMouseEnter={() => prefetchPost && prefetchPost(post._id)}>
      <div className="flex flex-wrap mx-5">
        <div className="w-96 h-96 rounded overflow-hidden shadow-lg bg-opacity-25 flex flex-col">
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                imgUrl ? imgUrl : 'https://picsum.photos/500/300'
              })`,
              height: '55%',
            }}
          />

          <div
            className="bg-white  px-2 flex flex-col "
            style={{ height: '45%' }}
          >
            <h1 className="text-xl font-bold mb-1 flex ml-4">
              {postTitlePreview()}
            </h1>
            <p
              className="text-sm text-gray-600 my-2 flex ml-4 "
              style={{ maxHeight: '3rem' }}
            >
              {postBodyPreview()}
            </p>

            <footer className="flex justify-between items-end  py-5 ">
              <div className="text-gray-600 text-xs  ">
                <p className="flex justify-start ">{post.likes} ❤️</p>
                <p>{new Date(date).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <div className="text-gray-600 text-xs ">
                  {post.comments.length > 0 ? (
                    <p>{post.comments.length} Comments</p>
                  ) : (
                    <p>No Comments yet</p>
                  )}
                </div>
              </div>
              <Link
                to={`/post/${post._id}`}
                className="bg-blue-800 text-white font-medium px-2 py-1 mb-3 rounded-lg no-underline hover:bg-blue-700"
              >
                read more
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
