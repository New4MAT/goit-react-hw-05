import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/movieAPI.js';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const fetchedReviews = await fetchMovieReviews(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews available</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(review => (
        <li key={review.id} className={styles.item}>
          <h3 className={styles.author}>{review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
