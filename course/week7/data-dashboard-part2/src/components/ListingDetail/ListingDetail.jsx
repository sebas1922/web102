import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar.jsx';
import { fetchListings } from '../../api/fetchListings.js';
import style from './ListingDetail.module.css';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    zipCode: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
  });

  // Placeholder functions for sidebar (not used in detail view but required)
  const handleFilterChange = () => {};
  const handleFetchListings = () => {};

  useEffect(() => {
    // Try to find the listing in multiple places for better data availability
    let foundListing = null;
    
    // First, try the current listings (most recent)
    try {
      const savedListings = JSON.parse(localStorage.getItem('currentListings') || '[]');
      foundListing = savedListings.find(l => l.id === id);
    } catch (error) {
      console.error('Error loading currentListings:', error);
    }
    
    // If not found, try the dashboard listings
    if (!foundListing) {
      try {
        const dashboardListings = JSON.parse(localStorage.getItem('dashboardListings') || '[]');
        foundListing = dashboardListings.find(l => l.id === id);
      } catch (error) {
        console.error('Error loading dashboardListings:', error);
      }
    }
    
    if (foundListing) {
      setListing(foundListing);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className={style.detailContainer}>
        <div className="sidebar-container">
          <Sidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onSubmit={handleFetchListings}
          />
        </div>
        <div className={style.detailContent}>
          <div className={style.loading}>
            <div className={style.spinner}></div>
            <h2>Loading listing details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={style.detailContainer}>
        <div className="sidebar-container">
          <Sidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onSubmit={handleFetchListings}
          />
        </div>
        <div className={style.detailContent}>
          <div className={style.notFound}>
            <h2>Listing not found</h2>
            <p>The listing you're looking for could not be found.</p>
            <Link to="/" className={style.backLink}>← Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery
  const galleryImages = Array.from({length: 6}, (_, i) => 
    `https://picsum.photos/seed/${listing.id}-${i}/600/400`
  );

  const imageUrl = `https://picsum.photos/seed/${listing.id}/800/500`;
  const address = listing.formattedAddress || 'Address not available';
  const price = typeof listing.price === 'number' ? listing.price.toLocaleString() : 'N/A';

  return (
    <div className={style.detailContainer}>
      <div className="sidebar-container">
        <Sidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onSubmit={handleFetchListings}
        />
      </div>
      <div className={style.detailContent}>
        <div className={style.breadcrumb}>
          <Link to="/" className={style.breadcrumbLink}>Dashboard</Link>
          <span className={style.breadcrumbSeparator}>›</span>
          <span className={style.breadcrumbCurrent}>Listing Details</span>
        </div>

        <div className={style.listingHeader}>
          <h1 className={style.listingTitle}>{address}</h1>
          <div className={style.priceDisplay}>
            <span className={style.price}>${price}</span>
            <span className={style.priceLabel}>per month</span>
          </div>
        </div>

        <div className={style.mainImage}>
          <img src={imageUrl} alt="Property" className={style.heroImage} />
        </div>

        <div className={style.detailsGrid}>
          <div className={style.propertyDetails}>
            <h2>Property Details</h2>
            <div className={style.detailsList}>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Bedrooms:</span>
                <span className={style.detailValue}>{listing.bedrooms || 0}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Bathrooms:</span>
                <span className={style.detailValue}>{listing.bathrooms || 0}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Square Feet:</span>
                <span className={style.detailValue}>{listing.landArea || 'N/A'} sqft</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Property Type:</span>
                <span className={style.detailValue}>{listing.propertyType || 'Rental'}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Listing Status:</span>
                <span className={style.detailValue}>Available</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Pet Policy:</span>
                <span className={style.detailValue}>Contact for details</span>
              </div>
            </div>
          </div>

          <div className={style.locationInfo}>
            <h2>Location Information</h2>
            <div className={style.detailsList}>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Full Address:</span>
                <span className={style.detailValue}>{address}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Neighborhood:</span>
                <span className={style.detailValue}>Premium Location</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Transportation:</span>
                <span className={style.detailValue}>Near public transit</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Nearby Amenities:</span>
                <span className={style.detailValue}>Shopping, dining, parks</span>
              </div>
            </div>
          </div>
        </div>

        <div className={style.imageGallery}>
          <h2>Property Photos</h2>
          <div className={style.galleryGrid}>
            {galleryImages.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Property view ${index + 1}`} 
                className={style.galleryImage}
              />
            ))}
          </div>
        </div>

        <div className={style.description}>
          <h2>Description</h2>
          <p>
            This beautiful rental property offers modern living in a prime location. 
            With {listing.bedrooms || 0} bedroom{(listing.bedrooms || 0) !== 1 ? 's' : ''} and {listing.bathrooms || 0} bathroom{(listing.bathrooms || 0) !== 1 ? 's' : ''}, 
            this home provides comfortable living space for individuals or families. 
            The property features updated amenities and is conveniently located near shopping, 
            dining, and entertainment options. Contact us today to schedule a viewing!
          </p>
        </div>

        <div className={style.contactSection}>
          <h2>Contact Information</h2>
          <div className={style.contactCard}>
            <div className={style.contactInfo}>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Email:</strong> contact@propertyrentals.com</p>
              <p><strong>Office Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 