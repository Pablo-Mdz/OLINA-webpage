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

  console.log(posts);

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


  const postId = postBeingEdited?._id
  console.log("postId: ", postId)

  const deletePost = () => {
    axios.post(`/api/post/delete/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postBeingEdited._id));
      })
      .catch(err => console.log(err))
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
        onDelete={deletePost}
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
