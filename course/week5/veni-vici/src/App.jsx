import { useState } from 'react'
import './App.css'
import MainCard from './components/MainCard'
import BanListSidebar from './components/BanListSidebar'

function App() {

  const [banList, setBanList] = useState({
    number: [],
    age: [],
    height: [],
    position: [],
    nationality: []
  });

  const handleAddToBanList = (attribute, value) => {
    // Prevent adding duplicates or null/undefined values
    if (!value || banList[attribute].includes(value)) {
      return;
    }

    setBanList(prevBanList => ({
      ...prevBanList,
      [attribute]: [...prevBanList[attribute], value]
    }));
  };

  return (
    <div className="app-container">
      <img className="background" src="src/assets/liverpool.jpg"></img>
      <aside className="sidebar-left">
      </aside>
      <main className="main-content">
        <MainCard onBanAttribute={handleAddToBanList} banList={banList} />
      </main>
      <BanListSidebar banList={banList} className="sidebar-right"/>
    </div>

  )
}

export default App
