import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function createPost(postData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, postData);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}