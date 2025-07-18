import './App.css'
import { useState, useEffect } from 'react'
import MainHeader from './components/MainHeader/Mainheader.jsx'
import Sidebar from './components/SideBar/SideBar.jsx'
import MainContent from './components/MainContent/MainContent.jsx'
import { fetchListings } from './api/fetchListings.js'


function App() {
  const [filters, setFilters] = useState({
    zipCode: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
  });
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
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


  return (
    <div className="app-container">
      <MainHeader />
      <div className="content-wrapper">
        <div className="sidebar-container">
          <Sidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onSubmit={handleFetchListings}
          />
        </div>
        <div className="main-content-area"> 
          <MainContent listings={filteredListings} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default App

