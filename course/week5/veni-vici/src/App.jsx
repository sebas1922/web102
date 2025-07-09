import './App.css'
import MainCard from './components/MainCard'

function App() {

  return (
    <div className="app-container">
      <img className="background" src="src/assets/liverpool.jpg"></img>
      <aside className="sidebar-left">
        {/* Left sidebar content goes here */}
      </aside>
      <main className="main-content">
        <MainCard />
      </main>
      <aside className="sidebar-right">
        {/* Right sidebar content goes here */}
      </aside>
    </div>

  )
}

export default App
