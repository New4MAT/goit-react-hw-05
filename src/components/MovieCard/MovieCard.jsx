import { getImageUrl } from '../../services/movieAPI.js';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const { title, poster_path, vote_average, overview, genres } = movie;

  return (
    <div className={styles.card}>
      <img
        src={getImageUrl(poster_path)}
        alt={title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.score}>
          User Score: {Math.round(vote_average * 10)}%
        </p>
        <h3 className={styles.subtitle}>Overview</h3>
        <p className={styles.text}>{overview}</p>
        <h3 className={styles.subtitle}>Genres</h3>
        <p className={styles.text}>
          {genres?.map(genre => genre.name).join(', ')}
        </p>
      </div>
    </div>
  );
}
