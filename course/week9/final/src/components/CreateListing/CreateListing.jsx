import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingsAPI } from '../../lib/supabase.js';
import style from './CreateListing.module.css';

const CreateListing = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    bedrooms: '',
    bathrooms: '',
    rent: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert numeric fields
      const listingData = {
        ...formData,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        rent: parseFloat(formData.rent),
        // Remove empty image_url if not provided
        image_url: formData.image_url.trim() || null
      };

      const newListing = await listingsAPI.create(listingData);
      
      // Navigate to the new listing's detail page
      navigate(`/listing/${newListing.id}`);
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={style.createContainer}>
      <div className={style.createContent}>
        <div className={style.header}>
          <h1 className={style.title}>Create New Housing Listing</h1>
          <p className={style.subtitle}>Fill out the form below to post your housing listing</p>
        </div>

        <form onSubmit={handleSubmit} className={style.form}>
          {/* Basic Information */}
          <div className={style.section}>
            <h2 className={style.sectionTitle}>Basic Information</h2>
            
            <div className={style.field}>
              <label htmlFor="title" className={style.label}>
                Listing Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Cozy 2BR Apartment Near Campus"
                className={style.input}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor="content" className={style.label}>
                Description
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Describe your listing, amenities, and what makes it special..."
                className={style.textarea}
                rows="5"
              />
            </div>

            <div className={style.field}>
              <label htmlFor="image_url" className={style.label}>
                Photo URL (optional)
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/photo.jpg"
                className={style.input}
              />
            </div>
          </div>

          {/* Location Information */}
          <div className={style.section}>
            <h2 className={style.sectionTitle}>Location</h2>
            
            <div className={style.field}>
              <label htmlFor="address" className={style.label}>
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className={style.input}
                required
              />
            </div>

            <div className={style.fieldRow}>
              <div className={style.field}>
                <label htmlFor="city" className={style.label}>
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Boston"
                  className={style.input}
                  required
                />
              </div>

              <div className={style.field}>
                <label htmlFor="state" className={style.label}>
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="MA"
                  className={style.input}
                  maxLength="2"
                  required
                />
              </div>

              <div className={style.field}>
                <label htmlFor="zipcode" className={style.label}>
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  placeholder="02115"
                  className={style.input}
                  maxLength="10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={style.section}>
            <h2 className={style.sectionTitle}>Property Details</h2>
            
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label htmlFor="bedrooms" className={style.label}>
                  Bedrooms *
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className={style.select}
                  required
                >
                  <option value="">Select</option>
                  <option value="0">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              <div className={style.field}>
                <label htmlFor="bathrooms" className={style.label}>
                  Bathrooms *
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className={style.select}
                  required
                >
                  <option value="">Select</option>
                  <option value="1">1 Bathroom</option>
                  <option value="1.5">1.5 Bathrooms</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="2.5">2.5 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="3.5">3.5 Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                </select>
              </div>

              <div className={style.field}>
                <label htmlFor="rent" className={style.label}>
                  Monthly Rent ($) *
                </label>
                <input
                  type="number"
                  id="rent"
                  name="rent"
                  value={formData.rent}
                  onChange={handleInputChange}
                  placeholder="2400"
                  className={style.input}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={style.actions}>
            <button
              type="button"
              onClick={handleCancel}
              className={style.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={style.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;