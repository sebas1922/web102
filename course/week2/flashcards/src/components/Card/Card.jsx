import { useState } from 'react'
import styles from './Card.module.css'

function Card({question, answer}) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
        console.log('CARD CLICKED')
    }
    
    const cardClasses = `${styles.card} ${isFlipped ? styles.flipped: ''}`

    return (
        <div className={cardClasses} onClick={handleFlip}>
            <h1 className={styles.cardText}>{isFlipped ? answer: question}</h1>
        </div>
    )
}

export default Card;