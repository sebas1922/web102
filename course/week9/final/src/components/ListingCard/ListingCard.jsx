import { Link } from 'react-router-dom'
import { useState } from 'react'
import { listingsAPI } from '../../lib/supabase.js'
import style from './ListingCard.module.css'

const ListingCard = ({ listing, onListingUpdate }) => {
  const [currentListing, setCurrentListing] = useState(listing);
  const [isUpvoting, setIsUpvoting] = useState(false);

  // Use the provided image URL or a placeholder
  const imageUrl = currentListing.image_url || `https://picsum.photos/seed/${currentListing.id}/300/200`;

  // Format the address from our database fields
  const address = `${currentListing.address}, ${currentListing.city}, ${currentListing.state} ${currentListing.zipcode}`;
  
  // Format the rent price
  const price = typeof currentListing.rent === 'number' ? currentListing.rent.toLocaleString() : 'N/A';
  
  // Format created date for display
  const createdDate = new Date(currentListing.created_at).toLocaleDateString();

  const handleQuickUpvote = async (e) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation();
    
    if (isUpvoting) return;
    
    setIsUpvoting(true);
    
    // Optimistic update
    const originalUpvotes = currentListing.upvotes;
    setCurrentListing(prev => ({
      ...prev,
      upvotes: prev.upvotes + 1
    }));
    
    try {
      await listingsAPI.upvote(currentListing.id);
      // Get updated data
      const updated = await listingsAPI.getById(currentListing.id);
      setCurrentListing(updated);
      
      // Notify parent component if callback provided
      if (onListingUpdate) {
        onListingUpdate(updated);
      }
    } catch (error) {
      console.error('Error upvoting listing:', error);
      // Revert on error
      setCurrentListing(prev => ({
        ...prev,
        upvotes: originalUpvotes
      }));
    } finally {
      setIsUpvoting(false);
    }
  };

  return (
    <Link to={`/listing/${currentListing.id}`} className={style.cardLink}>
      <div className={style.card}>
        <img src={imageUrl} alt={currentListing.title} className={style.cardImage} />
        <div className={style.cardContent}>
          <div className={style.header}>
            <h3 className={style.title}>{currentListing.title}</h3>
            <div className={style.meta}>
              <span className={style.date}>{createdDate}</span>
              <button 
                onClick={handleQuickUpvote}
                className={style.quickUpvoteButton}
                disabled={isUpvoting}
                title="Show interest in this listing"
              >
                ❤️ {currentListing.upvotes || 0}
              </button>
            </div>
          </div>
          <div className={style.location}>
            {address}
          </div>
          <div className={style.details}>
            <span className={style.price}>${price}/mo</span>
            <span className={style.beds}>{currentListing.bedrooms || 0} {currentListing.bedrooms === 1 ? 'bed' : 'beds'}</span>
            <span className={style.baths}>{currentListing.bathrooms || 0} {currentListing.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
        </div>
        <div className={style.viewDetailsOverlay}>
          <span>Click to view details</span>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard