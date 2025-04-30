import axios from 'axios';

export async function getAllData(url) {
  let token = localStorage.getItem('access_token');

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('getAllData fetch error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
}