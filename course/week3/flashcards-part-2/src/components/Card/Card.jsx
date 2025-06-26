import { useState, useEffect } from 'react'
import styles from './Card.module.css'

function Card({question, answer, index}) {
    const [isFlipped, setIsFlipped] = useState(false)
    
    useEffect(() => {
        setIsFlipped(false)
    }, [question, answer, index])

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }
    
    const cardClasses = `${styles.card} ${isFlipped ? styles.flipped: ''}`

    return (
        <div className={cardClasses} onClick={handleFlip}>
            <h1 className={styles.cardText}>{isFlipped ? answer: question}</h1>
        </div>
    )
}

export default Card