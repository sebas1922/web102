import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listingsAPI, commentsAPI } from '../../lib/supabase.js';
import style from './ListingDetail.module.css';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isUpvoting, setIsUpvoting] = useState(false);

  // Fetch listing and comments from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch listing details
        const listingData = await listingsAPI.getById(id);
        setListing(listingData);
        setEditForm(listingData); // Initialize edit form with current data

        // Fetch comments for this listing
        const commentsData = await commentsAPI.getByListingId(id);
        setComments(commentsData || []);
      } catch (error) {
        console.error('Error fetching listing data:', error);
        setListing(null);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpvote = async () => {
    if (isUpvoting) return; // Prevent multiple rapid clicks
    
    setIsUpvoting(true);
    
    // Optimistic update - immediately update UI
    const originalUpvotes = listing.upvotes;
    setListing(prev => ({
      ...prev,
      upvotes: prev.upvotes + 1
    }));
    
    try {
      await listingsAPI.upvote(id);
      // Refresh listing data to get the actual count from database
      const updatedListing = await listingsAPI.getById(id);
      setListing(updatedListing);
    } catch (error) {
      console.error('Error upvoting listing:', error);
      // Revert optimistic update on error
      setListing(prev => ({
        ...prev,
        upvotes: originalUpvotes
      }));
      alert('Failed to update interest. Please try again.');
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = {
        listing_id: id,
        content: newComment.trim(),
        author_name: commentAuthor.trim() || 'Anonymous'
      };

      await commentsAPI.create(comment);
      
      // Refresh comments
      const updatedComments = await commentsAPI.getByListingId(id);
      setComments(updatedComments || []);
      
      // Clear form
      setNewComment('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(listing); // Reset form to original data
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields
      const updates = {
        ...editForm,
        bedrooms: parseInt(editForm.bedrooms),
        bathrooms: parseFloat(editForm.bathrooms),
        rent: parseFloat(editForm.rent),
        image_url: editForm.image_url?.trim() || null
      };

      const updatedListing = await listingsAPI.update(id, updates);
      setListing(updatedListing);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing. Please try again.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this listing? This action cannot be undone.'
    );
    
    if (confirmDelete) {
      try {
        await listingsAPI.delete(id);
        navigate('/'); // Redirect to home page
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className={style.detailContent}>
        <div className={style.loading}>
          <div className={style.spinner}></div>
          <h2>Loading listing details...</h2>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={style.detailContent}>
        <div className={style.notFound}>
          <h2>Listing not found</h2>
          <p>The listing you're looking for could not be found.</p>
          <Link to="/" className={style.backLink}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={style.detailContent}>
        <div className={style.notFound}>
          <h2>Listing not found</h2>
          <p>The listing you're looking for could not be found.</p>
          <Link to="/" className={style.backLink}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={style.detailContainer}>
      <div className={style.detailContent}>
        <div className={style.breadcrumb}>
          <Link to="/" className={style.breadcrumbLink}>Home</Link>
          <span className={style.breadcrumbSeparator}>›</span>
          <span className={style.breadcrumbCurrent}>{listing.title}</span>
        </div>

        <div className={style.listingHeader}>
          <h1 className={style.listingTitle}>{listing.title}</h1>
          <div className={style.priceDisplay}>
            <span className={style.price}>${listing.rent.toLocaleString()}</span>
            <span className={style.priceLabel}>per month</span>
          </div>
        </div>

        {isEditing && (
          <div className={style.editModal}>
            <div className={style.editForm}>
              <h2>Edit Listing</h2>
              <form onSubmit={handleSaveEdit}>
                <div className={style.editGrid}>
                  <div className={style.editField}>
                    <label>Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  
                  <div className={style.editField}>
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={editForm.address || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className={style.editField}>
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={editForm.city || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className={style.editField}>
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={editForm.state || ''}
                      onChange={handleEditInputChange}
                      maxLength="2"
                      required
                    />
                  </div>

                  <div className={style.editField}>
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={editForm.zipcode || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className={style.editField}>
                    <label>Bedrooms *</label>
                    <select
                      name="bedrooms"
                      value={editForm.bedrooms || ''}
                      onChange={handleEditInputChange}
                      required
                    >
                      <option value="0">Studio</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5">5+ Bedrooms</option>
                    </select>
                  </div>

                  <div className={style.editField}>
                    <label>Bathrooms *</label>
                    <select
                      name="bathrooms"
                      value={editForm.bathrooms || ''}
                      onChange={handleEditInputChange}
                      required
                    >
                      <option value="1">1 Bathroom</option>
                      <option value="1.5">1.5 Bathrooms</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="2.5">2.5 Bathrooms</option>
                      <option value="3">3 Bathrooms</option>
                      <option value="3.5">3.5 Bathrooms</option>
                      <option value="4">4+ Bathrooms</option>
                    </select>
                  </div>

                  <div className={style.editField}>
                    <label>Monthly Rent ($) *</label>
                    <input
                      type="number"
                      name="rent"
                      value={editForm.rent || ''}
                      onChange={handleEditInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className={style.editField}>
                    <label>Photo URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={editForm.image_url || ''}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className={style.editFieldFull}>
                    <label>Description</label>
                    <textarea
                      name="content"
                      value={editForm.content || ''}
                      onChange={handleEditInputChange}
                      rows="4"
                    />
                  </div>
                </div>

                <div className={style.editActions}>
                  <button type="button" onClick={handleCancelEdit} className={style.cancelEditButton}>
                    Cancel
                  </button>
                  <button type="submit" className={style.saveEditButton}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {listing.image_url && (
          <div className={style.mainImage}>
            <img src={listing.image_url} alt={listing.title} className={style.heroImage} />
          </div>
        )}

        <div className={style.actionBar}>
          <button 
            onClick={handleUpvote} 
            className={style.upvoteButton}
            disabled={isUpvoting}
          >
            ❤️ {listing.upvotes} {isUpvoting ? 'Adding...' : 'Interested'}
          </button>
          <div className={style.actionButtons}>
            <button onClick={handleEdit} className={style.editButton}>Edit Listing</button>
            <button onClick={handleDelete} className={style.deleteButton}>Delete Listing</button>
          </div>
        </div>

        <div className={style.detailsGrid}>
          <div className={style.propertyDetails}>
            <h2>Property Details</h2>
            <div className={style.detailsList}>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Bedrooms:</span>
                <span className={style.detailValue}>{listing.bedrooms}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Bathrooms:</span>
                <span className={style.detailValue}>{listing.bathrooms}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Monthly Rent:</span>
                <span className={style.detailValue}>${listing.rent.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className={style.locationInfo}>
            <h2>Location</h2>
            <div className={style.detailsList}>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>Address:</span>
                <span className={style.detailValue}>{listing.address}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>City:</span>
                <span className={style.detailValue}>{listing.city}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>State:</span>
                <span className={style.detailValue}>{listing.state}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.detailLabel}>ZIP Code:</span>
                <span className={style.detailValue}>{listing.zipcode}</span>
              </div>
            </div>
          </div>
        </div>

        {listing.content && (
          <div className={style.description}>
            <h2>Description</h2>
            <p>{listing.content}</p>
          </div>
        )}

        <div className={style.commentsSection}>
          <h2>Questions & Reviews</h2>
          <form onSubmit={handleSubmitComment} className={style.commentForm}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className={style.authorInput}
            />
            <textarea 
              placeholder="Ask a question or leave a review..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={style.commentInput}
              required
            />
            <button type="submit" className={style.submitComment}>Post Comment</button>
          </form>
          
          <div className={style.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className={style.comment}>
                  <div className={style.commentHeader}>
                    <span className={style.commentAuthor}>{comment.author_name}</span>
                    <span className={style.commentDate}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={style.commentContent}>{comment.content}</p>
                </div>
              ))
            ) : (
              <p className={style.noComments}>No comments yet. Be the first to ask a question!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 