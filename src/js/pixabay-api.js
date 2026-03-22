import axios from 'axios';

const API_KEY = '55037996-6d12f501f9d1bfe9be3ac7844';

const api = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  },
});

export async function getImagesByQuery(query, page = 1) {
  const response = await api.get('/', {
    params: {
      q: query,
      page: page,
    },
  });
  return response.data;
}
