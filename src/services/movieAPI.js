import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export const fetchTrendingMovies = async () => {
  const response = await axios.get('/trending/movie/day');
  return response.data.results;
};

export const fetchMoviesByQuery = async query => {
  const response = await axios.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = path => {
  return path ? `${IMAGE_BASE_URL}${path}` : null;
};
