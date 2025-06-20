import './App.css'
import Card from './components/Card/Card'
import card_data from './data/card_data'
import { useState, useEffect } from 'react'

function App() {

  const [index, setIndex] = useState(() => {
    return Math.floor(Math.random() * card_data.length)
  })



  const decrementIndex = () => {
    setIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : card_data.length-1
    })
  }

  const incrementIndex = () => {
    setIndex((prevIndex) => {
      return prevIndex < card_data.length-1 ? prevIndex + 1 : 0
    })
  }

  const { answer, question } = card_data[index]


  return (
    <div className="appContainer">
      <h1>Car Flashcard Quiz</h1>
      <h2>This quiz will test your knowledge on car brands</h2>
      <h3>Total Number of Cards: {card_data.length}</h3>
      <Card key={index} question={question} answer={answer} />
      <div id="button-pair">
        <button onClick={decrementIndex}>
          previous
        </button>
        <button onClick={incrementIndex}>
          next
        </button>
      </div>
    </div>
  )
}

export default App