import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroCard.module.css';

const HeroCard = ({ hero }) => {
  return (
    <div className={styles.heroCard}>
      <div className={styles.heroHeader}>
        <h3 className={styles.heroName}>{hero.hero_name}</h3>
        <span className={styles.secretIdentity}>aka {hero.secret_identity}</span>
      </div>
      
      <div className={styles.heroDetails}>
        <div className={styles.heroAttribute}>
          <span className={styles.attributeLabel}>Power Source:</span>
          <span className={styles.attributeValue}>{hero.power_source}</span>
        </div>
        
        <div className={styles.heroAttribute}>
          <span className={styles.attributeLabel}>Weakness:</span>
          <span className={`${styles.attributeValue} ${styles.weakness}`}>{hero.weakness}</span>
        </div>
      </div>
      
      <div className={styles.cardActions}>
        <Link to={`/${hero.id}`} className={styles.editButton}>
          Edit Hero
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;