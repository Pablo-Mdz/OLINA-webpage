import { api } from '../api/api';

export const getPosts = async () => {
  const { data } = await api.get(`/api/post`);
  return data;
};

export const getPostsByTopicId = async (selectedTopicId) => {
  const { data } = await api.get(`/api/topic/details/${selectedTopicId}`);
  return {
    posts: data.topic.posts,
    topic: data.topic,
  };
};

export const getPostById = async (postId) => {
  const { data } = await api.get(`/api/post/${postId}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await api.get('/api/topic/list-topics');
  return data;
};
