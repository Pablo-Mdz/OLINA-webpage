import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
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


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#9f1ee8] bg-opacity-25 ">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </div>

      <div className="flex items-center m-2">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">
            Created by: {post.author.name}
          </p>
          <p className="text-gray-600">
            Date: {new Date(date).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
      <div>
      
     
      <div className='flex flex-row p-2 m-2'>
        <FacebookShareButton quote={post.title} url={window.location.href} hashtag="#myblog">
          <FaFacebook size={20} />
        </FacebookShareButton>
        <TwitterShareButton title={post.title} url={window.location.href} via="@myblog">
          <FaTwitter size={20} />
        </TwitterShareButton>
        <LinkedinShareButton>
          <FaLinkedin size={20} />
        </LinkedinShareButton>
        <button onClick={copyToClipboard}>
        {isCopied ? 'Copied!' : <FaLink />}
      </button>
      </div>
    
    </div>
      {isLoggedIn && post.author._id === user._id && (
        <button
          onClick={() => handleEditClick(post)}
          className="bg-cyan-500 text-white font-medium px-4 py-2 my-2 rounded-full mt-4"
        >
          Edit
        </button>
      )}
    </div>
  );
}
