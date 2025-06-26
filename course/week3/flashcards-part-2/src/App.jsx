import './App.css'
import Card from './components/Card/Card'
import card_data from './data/card_data'
import { useState, useEffect } from 'react'

function App() {

  //track and set card cardIndex
  const [cardIndex, setCardIndex] = useState(() => {
    return Math.floor(Math.random() * card_data.length)
  })

  //set answer and question based on current card
  const { answer, question } = card_data[cardIndex]

  //Navigation handlers
  const decrementcardIndex = () => {
    setCardIndex((prevCardIndex) => {
      return prevCardIndex > 0 ? prevCardIndex - 1 : prevCardIndex
    })
  }

  const incrementcardIndex = () => {
    setCardIndex((prevCardIndex) => {
      return prevCardIndex < card_data.length - 1 ? prevCardIndex + 1 : prevCardIndex
    })
  }

  //handle input of users guess keeping track of users guess and currently displayed 
  const [guess, setGuess] = useState('')
  const [guessStatus, setGuessStatus] = useState('')

  //handle guess submission
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!guess.trim()) {
      setGuessStatus('incorrect')
      return
    }
  
    const status = guess.trim().toLowerCase() == answer.toLowerCase() ? 'correct' : 'incorrect'
    setGuessStatus(status)
  }

  //dynamic input class and message
  let inputClassName = 'guess-input'
  let submitMessage = ''
  if (guessStatus == 'correct') {
    inputClassName += '-correct'
    submitMessage = 'Correct!'
  }
  else if (guessStatus == 'incorrect') {
    inputClassName += '-incorrect'
    submitMessage = 'Incorrect :('
  }

  //

  //reset guess and status on changing card
  useEffect(() => {
    setGuess('')
    setGuessStatus('none')

  }, [cardIndex])

  // Determine if navigation is possible
  const atFirstCard = cardIndex === 0
  const atLastCard = cardIndex === card_data.length - 1

  return (
    <div className="appContainer">

      <h1>Car Flashcard Quiz</h1>
      <h2>This quiz will test your knowledge on car brands</h2>
      <h3>Total Number of Cards: {card_data.length}</h3>

      <Card key={cardIndex} question={question} answer={answer} />

      <div className="input">
        <h3>Guess: </h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Answer'
            className={inputClassName}
            value={guess}
            onChange={(event) => { setGuess(event.target.value) }}
          />
          <button>submit</button>
        </form>
      </div>

      <div>
        <h4>{submitMessage}</h4>
      </div>

      <div className="button-container">
        <button
          className={`nav-button${atFirstCard ? ' nav-button-disabled' : ''}`}
          type="button"
          onClick={decrementcardIndex}
          disabled={atFirstCard}
        >
          previous
        </button>
        <button
          className={`nav-button${atLastCard ? ' nav-button-disabled' : ''}`}
          type="button"
          onClick={incrementcardIndex}
          disabled={atLastCard}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default App