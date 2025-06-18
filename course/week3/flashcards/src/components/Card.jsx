import { useState } from 'react'


function Card(props) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className="card">
            <h1>inner text bruv</h1>
        </div>
    )
}

export default Card;