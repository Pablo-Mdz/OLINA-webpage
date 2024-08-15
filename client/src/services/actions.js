import { api } from '../api/api';

export const getPosts = async () => {
  const { data } = await api.get(`/api/post`);
  return data;
};

export const getPost = async (id) => {
  const { data } = await api.get(`/api/topic/details/${id}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await api.get('/api/topic/list-topics');
  return data;
};
