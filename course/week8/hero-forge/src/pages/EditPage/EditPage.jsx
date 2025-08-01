import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import styles from './EditPage.module.css';

const EditPage = () => {
  const { id } = useParams(); // Extract hero ID from URL
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    hero_name: '',
    secret_identity: '',
    power_source: '',
    weakness: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [notFound, setNotFound] = useState(false);

  // Fetch hero data when component mounts
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('heroes')
          .select('*')
          .eq('id', id)
          .single(); // .single() expects exactly one result
        
        if (error) {
          if (error.code === 'PGRST116') {
            // No rows found
            setNotFound(true);
          } else {
            throw error;
          }
          return;
        }
        
        // Pre-populate form with existing data
        setFormData({
          hero_name: data.hero_name || '',
          secret_identity: data.secret_identity || '',
          power_source: data.power_source || '',
          weakness: data.weakness || ''
        });
        
      } catch (error) {
        console.error('Error fetching hero:', error);
        setErrors({ fetch: 'Failed to load hero data. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHero();
  }, [id]);

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

  // Form validation (same as CreatePage)
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
    
    setIsSaving(true);
    setErrors({});
    
    try {
      const { error } = await supabase
        .from('heroes')
        .update(formData) // UPDATE instead of INSERT
        .eq('id', id); // WHERE id = current hero ID
      
      if (error) {
        throw error;
      }
      
      // Success! Show success message and redirect
      setSuccessMessage('Hero updated successfully!');
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating hero:', error);
      setErrors({ submit: 'Failed to update hero. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.editPage}>
        <div className={styles.loadingMessage}>Loading hero data...</div>
      </div>
    );
  }

  // Hero not found
  if (notFound) {
    return (
      <div className={styles.editPage}>
        <div className={styles.notFound}>
          <h1 className={styles.title}>Hero Not Found</h1>
          <p>The hero you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className={styles.backButton}
          >
            Back to Heroes
          </button>
        </div>
      </div>
    );
  }

  // Fetch error
  if (errors.fetch) {
    return (
      <div className={styles.editPage}>
        <div className={styles.errorMessage}>
          {errors.fetch}
          <button 
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.editPage}>
      <h1 className={styles.title}>Edit Hero</h1>
      
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

        <div className={styles.buttonGroup}>
          <button 
            type="button"
            onClick={() => navigate('/')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={isSaving}
            className={styles.submitButton}
          >
            {isSaving && <span className={styles.loadingSpinner}></span>}
            {isSaving ? 'Updating Hero...' : 'Update Hero'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;