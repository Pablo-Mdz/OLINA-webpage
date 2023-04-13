import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FaFacebook, FaTwitter, FaLink, FaLinkedin } from 'react-icons/fa';


export default function PostCard({ onEdit, post }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isCopied, setIsCopied] = useState(false);

  const date = new Date(post.createdAt).toLocaleString();

  const handleEditClick = (postBeingEdited) => {
    onEdit(postBeingEdited);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  const postBodyPreview = () => {
    const words = post.body.split(' ');
    const maxLength = 12;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };
  return (
    <div className="w-92 h-64 rounded overflow-hidden shadow-lg bg-opacity-25 relative">
      <div className="px-6 py-4">
        <h1 className="text-2xl mb-2">{post.title}</h1>
      </div>
      <div className="align-start">
        <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
      </div>
      <div className="flex items-center m-2"></div>
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">
            Created by: {post.author.name}
          </p>
          <p className="text-gray-600">
            Date: {new Date(date).toLocaleDateString('es-ES')}
          </p>
          
        </div>
        <div className="flex flex-row space-x-2">
          <FacebookShareButton
            quote={post.title}
            url={window.location.href}
            hashtag="#myblog"
          >
            <FaFacebook size={20} />
          </FacebookShareButton>
          <TwitterShareButton
            title={post.title}
            url={window.location.href}
            via="@myblog"
          >
            <FaTwitter size={20} />
          </TwitterShareButton>
          <LinkedinShareButton>
            <FaLinkedin size={20} />
          </LinkedinShareButton>
          <button onClick={copyToClipboard}>
            {isCopied ? 'Copied!' : <FaLink />}
          </button>
        </div>
        <div>
        {isLoggedIn && post.author._id === user._id && (
            <button
              onClick={() => handleEditClick(post)}
              className="bg-cyan-500 text-white font-medium px-2 py-1 my-2 rounded-full mt-2"
            >
              Edit
            </button>
          )}
          <a
          href={`/post/${post._id}`}
          className="bg-blue-500 text-white font-medium px-2 py-1 my-2 rounded-full mt-2">Read more</a>
        </div>
      </footer>
    </div>
  );
  
}
