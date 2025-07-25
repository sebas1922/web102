import { useState, useEffect } from 'react'
import Sidebar from '../SideBar/SideBar.jsx'
import MainContent from '../MainContent/MainContent.jsx'
import Charts from '../Charts/Charts.jsx'
import { fetchListings } from '../../api/fetchListings.js'
import style from './Dashboard.module.css'

const Dashboard = () => {
  // Load initial state from localStorage if available
  const loadPersistedState = () => {
    try {
      const savedFilters = localStorage.getItem('dashboardFilters');
      const savedListings = localStorage.getItem('dashboardListings');
      const savedFilteredListings = localStorage.getItem('dashboardFilteredListings');
      
      return {
        filters: savedFilters ? JSON.parse(savedFilters) : {
          zipCode: '',
          priceMin: '',
          priceMax: '',
          bedrooms: '',
          bathrooms: '',
        },
        listings: savedListings ? JSON.parse(savedListings) : [],
        filteredListings: savedFilteredListings ? JSON.parse(savedFilteredListings) : []
      };
    } catch (error) {
      console.error('Error loading persisted state:', error);
      return {
        filters: {
          zipCode: '',
          priceMin: '',
          priceMax: '',
          bedrooms: '',
          bathrooms: '',
        },
        listings: [],
        filteredListings: []
      };
    }
  };

  const persistedState = loadPersistedState();
  
  const [filters, setFilters] = useState(persistedState.filters);
  const [listings, setListings] = useState(persistedState.listings);
  const [filteredListings, setFilteredListings] = useState(persistedState.filteredListings);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleFetchListings = async () => {
    if (filters.zipCode.length !== 5) {
      console.error("Attempted to fetch with an invalid zip code.");
      return;
    }
    
    setIsLoading(true);

    // Per the requirements, we only fetch with the zip code.
    // All other filtering is handled on the client-side by the useEffect hook.
    const apiFilters = {
      zipCode: filters.zipCode,
    };
    
    console.log("Sending filters to API:", apiFilters);
    const data = await fetchListings(apiFilters);
    console.log("Raw API Response:", data);
    setListings(data);
    setIsLoading(false);
  };

  // Persist filters whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }, [filters]);

  // Persist listings whenever they change
  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem('dashboardListings', JSON.stringify(listings));
      localStorage.setItem('currentListings', JSON.stringify(listings)); // Keep this for detail view compatibility
    }
  }, [listings]);

  useEffect(() => {
    let result = listings;

    // Client-side filtering after fetching
    if (filters.priceMin) {
      result = result.filter(listing => listing.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(listing => listing.price <= Number(filters.priceMax));
    }
    if (filters.bedrooms) {
      result = result.filter(listing => listing.bedrooms >= Number(filters.bedrooms));
    }
    if (filters.bathrooms) {
      result = result.filter(listing => listing.bathrooms >= Number(filters.bathrooms));
    }

    setFilteredListings(result);
  }, [filters, listings]);

  // Persist filtered listings whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardFilteredListings', JSON.stringify(filteredListings));
  }, [filteredListings]);

  return (
    <div className={style.dashboardContainer}>
      <div className="sidebar-container">
        <Sidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onSubmit={handleFetchListings}
        />
      </div>
      <div className={style.mainContentArea}>
        <div className={style.contentGrid}>
          {filteredListings.length > 0 && !isLoading && (
            <div className={style.chartsSection}>
              <Charts listings={filteredListings} />
            </div>
          )}
          <div className={style.listingsSection}>
            <MainContent listings={filteredListings} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 