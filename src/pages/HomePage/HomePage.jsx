import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/movieAPI.js';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
