import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContent from '../MainContent/MainContent.jsx'
import FilterSidebar from '../FilterSidebar/FilterSidebar.jsx'
import { listingsAPI } from '../../lib/supabase.js'
import style from './Dashboard.module.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at'); // 'created_at' or 'upvotes'
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    state: '',
    zipcode: '',
    minUpvotes: '',
    daysOld: ''
  });

  // Fetch listings from Supabase with filters
  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const data = await listingsAPI.getAll(sortBy, filters);
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCreateListing = () => {
    navigate('/create');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      city: '',
      state: '',
      zipcode: '',
      minUpvotes: '',
      daysOld: ''
    });
  };

  // Fetch listings on component mount and when sort or filters change
  useEffect(() => {
    fetchListings();
  }, [sortBy, filters]);

  // Filter listings based on search term (sorting is handled by Supabase)
  useEffect(() => {
    if (searchTerm.trim()) {
      // Perform search via Supabase
      const performSearch = async () => {
        setIsLoading(true);
        try {
          const data = await listingsAPI.search(searchTerm, sortBy, filters);
          setFilteredListings(data || []);
        } catch (error) {
          console.error('Error searching listings:', error);
          setFilteredListings([]);
        } finally {
          setIsLoading(false);
        }
      };
      performSearch();
    } else {
      // No search term, show all listings
      setFilteredListings(listings);
    }
  }, [listings, searchTerm, sortBy]);

  return (
    <div className={style.dashboardContainer}>
      <div className={style.sidebarArea}>
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      </div>
      <div className={style.mainContentArea}>
        <div className={style.header}>
          <div className={style.titleRow}>
            <h1 className={style.title}>Student Housing Board</h1>
            <button onClick={handleCreateListing} className={style.createButton}>
              + Create Listing
            </button>
          </div>
          <div className={style.controls}>
            <div className={style.searchContainer}>
              <input
                type="text"
                placeholder="Search listings by title..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={style.searchInput}
              />
            </div>
            <div className={style.sortContainer}>
              <label htmlFor="sort-select" className={style.sortLabel}>Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className={style.sortSelect}
              >
                <option value="created_at">Newest First</option>
                <option value="upvotes">Most Interested</option>
                <option value="rent">Price: Low to High</option>
                <option value="rent_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className={style.listingsSection}>
          <MainContent 
            listings={filteredListings} 
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard 