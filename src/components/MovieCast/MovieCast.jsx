import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, getImageUrl } from '../../services/movieAPI.js';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cast.length === 0) return <p>No cast information available</p>;

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.item}>
          <img
            src={getImageUrl(actor.profile_path)}
            alt={actor.name}
            className={styles.image}
          />
          <div className={styles.info}>
            <p className={styles.name}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
