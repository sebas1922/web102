import ListingCard from '../ListingCard/ListingCard.jsx';
import style from './MainContent.module.css';

const MainContent = ({ listings, isLoading }) => {
    if (isLoading) {
        return (
            <main className={`${style.mainContent} ${style.loading}`}>
                <div className={style.spinner}></div>
                <h2>Loading Listings...</h2>
            </main>
        )
    }

    return (
        <main className={style.mainContent}>
            {listings.length > 0 ? (
                <div className={style.listingsGrid}>
                    {listings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className={style.noResults}>
                    <h2>No listings found.</h2>
                    <p>Try adjusting your filters or searching a new zip code.</p>
                </div>
            )}
        </main>
    );
};

export default MainContent; 