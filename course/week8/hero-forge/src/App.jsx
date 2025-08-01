import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage/CreatePage';
import EditPage from './pages/EditPage/EditPage';
import styles from './App.module.css';

function App() {
  const location = useLocation();

  return (
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.navBrand}>
            Hero Forge
          </Link>
          
          <div className={styles.navLinks}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`${styles.navLink} ${location.pathname === '/create' ? styles.navLinkActive : ''}`}
            >
              Create Hero
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/:id" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;