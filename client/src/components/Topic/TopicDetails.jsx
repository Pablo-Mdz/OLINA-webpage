import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import PostCard from '../Blog/PostCard';

export default function TopicDetails() {
  const params = useParams();
  console.log(params);
  const id = params.id;

  const [topic, setTopic] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/api/topic/details/${id}`).then((response) => {
      setTopic(response?.data?.topic);
    });
  }, []);

  return <div>TopicDetails</div>;
}
