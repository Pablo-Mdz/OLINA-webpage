import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Post() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <p>Post</p>
      <Link to="/create">Create a Blog Post</Link>
    </div>
  );
}
