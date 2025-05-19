import { useState, useEffect, useRef } from 'react';
import {
  useParams,
  useNavigate,
  Outlet,
  useLocation,
  Link,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/movieAPI';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Використовуємо useRef для збереження попереднього маршруту
  const fromRef = useRef(location.state?.from || '/movies');

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
    navigate(fromRef.current);
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
            <Link
              to={`/movies/${movieId}/cast`}
              state={{ from: fromRef.current }}
              className={styles.link}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              state={{ from: fromRef.current }}
              className={styles.link}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
