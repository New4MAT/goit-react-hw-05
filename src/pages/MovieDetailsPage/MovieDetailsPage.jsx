import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/movieAPI.js';
import MovieCard from '../../components/MovieСard/MovieCard.jsx';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/movies';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(from);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.button}>
        Go back
      </button>
      <MovieCard movie={movie} />
      <div className={styles.additional}>
        <h2 className={styles.title}>Additional information</h2>
        <ul className={styles.list}>
          <li>
            <a
              href={`/movies/${movieId}/cast`}
              state={{ from }}
              className={styles.link}
            >
              Cast
            </a>
          </li>
          <li>
            <a
              href={`/movies/${movieId}/reviews`}
              state={{ from }}
              className={styles.link}
            >
              Reviews
            </a>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
