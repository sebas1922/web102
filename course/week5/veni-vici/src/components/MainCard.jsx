import { useState, useEffect } from 'react'
import fetchValidPlayer from '../api/fetchPlayer'

const MainCard = ({ onBanAttribute, banList }) => {

    //event handlers
    const onNumberClick = () => onBanAttribute('number', player.number);
    const onAgeClick = () => onBanAttribute('age', player.age);
    const onHeightClick = () => onBanAttribute('height', player.height);
    const onPositionClick = () => onBanAttribute('position', player.position);
    const onNationalityClick = () => onBanAttribute('nationality', player.nationality);

    //will load a certain card based on if the user clicked the first button or not
    const [hasLoaded, setHasLoaded] = useState(false)
    const handleStartClick = () => {
        setHasLoaded(true)
    }

    //load player when card is mounted
    useEffect(() => {
        // Only fetch on initial mount if the game has started
        if (hasLoaded) {
            fetchNewPlayer(banList);
        }
    }, [])

    //handle setting the player
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNewPlayer = async () => {
        setIsLoading(true);
        const newPlayer = await fetchValidPlayer(banList);
        if (newPlayer) {
            setPlayer(newPlayer);
        } else {
            alert("Could not find a new player. Try removing some banned attributes!");
        }
        setIsLoading(false);
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

    if (isLoading) {
        return <div>Searching for a player...</div>;
    }

    if (!player) {
        return <div>Click "Discover" to find your first player! <button onClick={fetchNewPlayer}>Discover</button></div>;
    }

    // Otherwise, render your main application view
    return (
        <div>
            <div className="attribute-buttons">
                <button onClick={onNumberClick}>Shirt number: {player.number}</button>
                <button onClick={onAgeClick}>Age: {player.age}</button>
                <button onClick={onHeightClick}>Height: {player.height}</button>
                <button onClick={onPositionClick}>Position: {player.position}</button>
                <button onClick={onNationalityClick}>Nationality: {player.nationality}</button>
            </div>
            <h2>{`${player.firstname} ${player.lastname}`}</h2>
            <img src={player.photo}></img>
            <button onClick={fetchNewPlayer}>Discover New Player</button>
        </div>
    );
}

export default MainCard