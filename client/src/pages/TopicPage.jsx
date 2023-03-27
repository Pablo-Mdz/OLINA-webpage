import { useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Blog/Post";

export default function TopicPage() {
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  return (
    <>
    <div>TopicPage</div>
    <Post />
    <Link to="/create-topic">Create a topic</Link>
    </>
  )
}
