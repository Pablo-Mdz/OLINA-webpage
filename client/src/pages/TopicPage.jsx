import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Post from "../components/Blog/Post";

export default function TopicPage() {
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios.get(`/api/topic/details/${id}`)
      .then(response => {
        setTopic(response?.data?.topic);
      })
      .catch(err => console.log(err));
  }, [])
  
  return (
    <>
    <div>TopicPage</div>
    <Post />
    
      <Link to="/create-topic" className="">Create a topic</Link>
    
    </>
  )
}
