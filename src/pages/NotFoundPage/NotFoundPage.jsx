import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.link}>
        Go to home page
      </Link>
    </div>
  );
}