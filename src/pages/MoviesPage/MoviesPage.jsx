import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/movieAPI.js';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') ?? '';

  const handleSearch = async searchQuery => {
    try {
      setIsLoading(true);
      const foundMovies = await fetchMoviesByQuery(searchQuery);
      setMovies(foundMovies);
      setSearchParams({ query: searchQuery });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {query && movies.length === 0 && !isLoading && (
        <p>No movies found for "{query}"</p>
      )}
    </div>
  );
}
