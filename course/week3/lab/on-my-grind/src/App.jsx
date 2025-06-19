import { useState } from 'react'
import './App.css'
import BaristaForm from './Components/BaristaForm'

function App() {

  return (
    <>
      <div className="title-container">
        <h1 className="title">On My Grind</h1>
        <p>So you think you can baerista? Let's put that to the test...</p>
      </div>
      <div>
        <BaristaForm/>
      </div>
    </>
  )
}

export default App
