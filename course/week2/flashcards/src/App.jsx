import './App.css'
import Card from './components/Card/Card'
import card_data from './data/card_data'
import { useState } from 'react'

function App() {

  const [index, setIndex] = useState(0)
  
  const decrementIndex = () => {
    setIndex( (prevIndex) => {
      return prevIndex--
    })
    console.log('button clicked')
  }

  const incrementIndex = () => {
    setIndex( (prevIndex) => {
      return prevIndex++
    })
  }

  const {answer, question} = card_data[index]
  

  return (
    <div>
      <h1>Random Quiz cuh</h1>
      <h2>This quiz is about this randomahh shit</h2>
      <Card question={question} answer={answer}/>
      <div id="button-pair">
        <button onClick={decrementIndex}>
          back
        </button>
        <button onClick={incrementIndex}>
          forward
        </button>
      </div>
    </div>
  )
}

export default App