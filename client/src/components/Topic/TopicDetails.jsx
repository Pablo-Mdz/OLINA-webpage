import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import PostCard from '../Blog/PostCard';
import CreateAPost from "../Blog/CreateAPost";

export default function TopicDetails() {
  const params = useParams()
  const id = params.id;

  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    axios.get(`/api/topic/details/${id}`)
        .then(response => {
            setTopic(response?.data?.topic);
            setPosts(response?.data?.topic?.posts)
        })
  }, [])

  return (
    <>
     <h1>{topic.title}</h1>
     {posts.map(post => (
       <PostCard key={post._id} post={post} />
      ))}
     <CreateAPost setPosts={setPosts} posts={posts} />
    </>
  )
}
