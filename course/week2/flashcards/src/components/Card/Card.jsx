import { useState } from 'react'


function Card({question, answer}) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
        console.log('CARD CLICKED')
    }
    

    return (
        <div className="card" onClick={handleFlip}>
            <h1>{isFlipped ? answer: question}</h1>
        </div>
    )
}

export default Card;