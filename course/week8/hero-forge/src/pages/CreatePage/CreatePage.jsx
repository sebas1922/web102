import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import styles from './CreatePage.module.css';

const CreatePage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    hero_name: '',
    secret_identity: '',
    power_source: '',
    weakness: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.hero_name.trim()) {
      newErrors.hero_name = 'Hero name is required';
    }
    
    if (!formData.secret_identity.trim()) {
      newErrors.secret_identity = 'Secret identity is required';
    }
    
    if (!formData.power_source.trim()) {
      newErrors.power_source = 'Power source is required';
    }
    
    if (!formData.weakness.trim()) {
      newErrors.weakness = 'Weakness is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase
        .from('heroes')
        .insert([formData])
        .select();
      
      if (error) {
        throw error;
      }
      
      // Success! Show success message and redirect
      setSuccessMessage('Hero created successfully!');
      
      // Reset form
      setFormData({
        hero_name: '',
        secret_identity: '',
        power_source: '',
        weakness: ''
      });
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating hero:', error);
      setErrors({ submit: 'Failed to create hero. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.createPage}>
      <h1 className={styles.title}>Create New Hero</h1>
      
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.heroForm}>
        <div className={styles.formGroup}>
          <label htmlFor="hero_name" className={styles.label}>
            Hero Name *
          </label>
          <input
            type="text"
            id="hero_name"
            name="hero_name"
            value={formData.hero_name}
            onChange={handleInputChange}
            placeholder="e.g., Spider-Man"
            className={styles.input}
          />
          {errors.hero_name && (
            <div className={styles.errorMessage}>{errors.hero_name}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="secret_identity" className={styles.label}>
            Secret Identity *
          </label>
          <input
            type="text"
            id="secret_identity"
            name="secret_identity"
            value={formData.secret_identity}
            onChange={handleInputChange}
            placeholder="e.g., Peter Parker"
            className={styles.input}
          />
          {errors.secret_identity && (
            <div className={styles.errorMessage}>{errors.secret_identity}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="power_source" className={styles.label}>
            Power Source *
          </label>
          <input
            type="text"
            id="power_source"
            name="power_source"
            value={formData.power_source}
            onChange={handleInputChange}
            placeholder="e.g., Radioactive Spider Bite"
            className={styles.input}
          />
          {errors.power_source && (
            <div className={styles.errorMessage}>{errors.power_source}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="weakness" className={styles.label}>
            Weakness *
          </label>
          <input
            type="text"
            id="weakness"
            name="weakness"
            value={formData.weakness}
            onChange={handleInputChange}
            placeholder="e.g., Responsibility Complex"
            className={styles.input}
          />
          {errors.weakness && (
            <div className={styles.errorMessage}>{errors.weakness}</div>
          )}
        </div>

        {errors.submit && (
          <div className={styles.errorMessage}>{errors.submit}</div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading && <span className={styles.loadingSpinner}></span>}
          {isLoading ? 'Creating Hero...' : 'Create Hero'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;