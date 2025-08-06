import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ListingDetail from './components/ListingDetail/ListingDetail.jsx'
import CreateListing from './components/CreateListing/CreateListing.jsx'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </div>
  )
}

export default App

