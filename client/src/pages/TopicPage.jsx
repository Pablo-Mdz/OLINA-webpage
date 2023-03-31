import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Post from "../components/Blog/Post";
import TopicCard from "../components/Topic/TopicCard";

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const { isLoggedIn, user } = useContext(AuthContext);
  

  useEffect(() => {
    axios.get("/api/topic/list-topics")
      .then(response => {
        setTopics(response.data.topics);
      })
  }, []);

  const TopicsSortedByDate = topics.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  return (
    <>
    <h1>Topic Page</h1>
    {/* <Post /> */}

    {TopicsSortedByDate.sort((a,b) => Date(b.createdAt) - Date(a.createdAt)).map(topic => (
      
      <TopicCard key={topic._id} topic={topic}/>
    ))}

      <Link to="/create-topic" className="">Create a topic</Link>
    
    </>
  )
}
