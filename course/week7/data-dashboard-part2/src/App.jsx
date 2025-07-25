import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainHeader from './components/MainHeader/Mainheader.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ListingDetail from './components/ListingDetail/ListingDetail.jsx'

function App() {
  return (
    <div className="app-container">
      <MainHeader />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

