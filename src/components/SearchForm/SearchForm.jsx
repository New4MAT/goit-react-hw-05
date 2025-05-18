import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}