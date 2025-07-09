import { useState, useEffect } from 'react'
import fetchPlayer from '../api/fetchPlayer'


const MainCard = () => {

    const [hasLoaded, setHasLoaded] = useState(false)

    const handleStartClick = () => {
        setHasLoaded(true)
    }

    useState(() => {
        const ranNum = ;
        fetchPlayer(ranNum)
    }, [hasLoaded])

    const fetchNewItem = () => {
        const { 
            firstname, 
            lastname,
            age,
            nationality,
            photo,
            number,
            position 
        } = fetchPlayer(Math.floor(Math.random() * 100) + 1)
        return (
            <div>
                {firstname} {lastname}
            </div>
        )
    }



    if (!hasLoaded) {
        // Render the initial "Start" screen
        return (
            <div>
                <h1>Footy Finder</h1>
                <p>Click the button to begin discovering players.</p>
                <button onClick={handleStartClick}>Start Discovering</button>
            </div>
        );
    }

    // Otherwise, render your main application view
    return (
        <div>
            {/* Your main card component with the player info */}
            {/* Your ban list component */}
            {/* Your history component */}
            <button onClick={fetchNewItem}>Discover New Player</button>
        </div>
    );
}


export default MainCard