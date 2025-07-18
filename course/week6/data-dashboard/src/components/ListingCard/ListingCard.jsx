import style from './ListingCard.module.css'

const ListingCard = ({ listing }) => {
  // Use a placeholder service for images, seeded with the listing ID for consistency.
  const imageUrl = `https://picsum.photos/seed/${listing.id}/300/200`;

  // The API provides the full address in the 'formattedAddress' field.
  const address = listing.formattedAddress || 'Address not available';
  
  // Safely format the price to avoid errors if it's not a number.
  const price = typeof listing.price === 'number' ? listing.price.toLocaleString() : 'N/A';

  return (
    <div className={style.card}>
      <img src={imageUrl} alt="Stock photo of a house" className={style.cardImage} />
      <div className={style.cardContent}>
        <div className={style.location}>
          {address}
        </div>
        <div className={style.details}>
          <span className={style.price}>${price}</span>
          <span className={style.beds}>{listing.bedrooms || 0} beds</span>
          <span className={style.baths}>{listing.bathrooms || 0} baths</span>
          <span className={style.sqft}>{listing.landArea || 0} sqft</span>
        </div>
      </div>
    </div>
  )
}

export default ListingCard