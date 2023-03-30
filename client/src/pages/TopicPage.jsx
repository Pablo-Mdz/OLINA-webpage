import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Post from "../components/Blog/Post";
import BlogPostCard from "../components/Blog/BlogPostCard";

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    axios.get("/api/topic/list-topics")
      .then(response => {
        setTopics(response.data.topics)
      })
  }, [])
  
  return (
    <>
    <h1>Topic Page</h1>
    {/* <Post /> */}

    {topics.map(topic => (
      <BlogPostCard key={topic._id} topic={topic}/>
    ))}

      <Link to="/create-topic" className="">Create a topic</Link>
    
    </>
  )
}
