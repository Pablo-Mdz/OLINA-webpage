import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
  }


  useEffect(() => {
    axios.get(`/api/topic/details/${id}`)
        .then(response => {
            setTopic(response?.data?.topic);
            setPosts(response?.data?.topic?.posts)
        })
        .catch(err => console.log(err))
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
          postBeingEdited={postBeingEdited}
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
