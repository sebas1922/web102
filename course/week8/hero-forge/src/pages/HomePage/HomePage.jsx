import React, { useState, useEffect } from 'react';
import HeroCard from '../../components/HeroCard/HeroCard';
import { supabase } from '../../api/supabaseClient';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch heroes from Supabase
  const fetchHeroes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('heroes')
        .select('*')
        .order('created_at', { ascending: false }); // Most recent first
      
      if (error) {
        throw error;
      }
      
      setHeroes(data || []);
    } catch (error) {
      console.error('Error fetching heroes:', error);
      setError('Failed to load heroes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch heroes on component mount
  useEffect(() => {
    fetchHeroes();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.homePage}>
        <h1 className={styles.title}>Hero Registry</h1>
        <div className={styles.loadingMessage}>Loading heroes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.homePage}>
        <h1 className={styles.title}>Hero Registry</h1>
        <div className={styles.errorMessage}>
          {error}
          <button onClick={fetchHeroes} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Hero Registry</h1>
      
      {heroes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No heroes found. Create your first hero!</p>
        </div>
      ) : (
        <div className={styles.heroesGrid}>
          {heroes.map(hero => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;