import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import PostCard from '../Blog/PostCard';
import CreateAPost from "../Blog/CreateAPost";
import EditPostCard from '../Blog/EditPostCard';

export default function TopicDetails() {
  const params = useParams()
  const id = params.id;

  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBeingEdited, setPostBeingEdited] = useState({});

  const handleEdit = (post) => {
    setPostBeingEdited(post);
    //console.log("post being edited: ", post)
  }

  console.log(posts);

  useEffect(() => {
    axios.get(`/api/topic/details/${id}`)
        .then(response => {
            setTopic(response?.data?.topic);
            setPosts(response?.data?.topic?.posts)
        })
  }, []);

  const cancelEditing = () => {
    setPostBeingEdited({});
  }

  return (
    <>
     <h1>{topic.title}</h1>
     {posts.map(post => (
      <div key={post._id}>
       {postBeingEdited === post ?
       <EditPostCard 
        post={post}
        onCancel={cancelEditing}
        /> :
       <PostCard 
          post={post} 
          onEdit={handleEdit}
       /> }
       </div>
      ))
      
      }

     <CreateAPost setPosts={setPosts} posts={posts} />
    </>
  )
}
