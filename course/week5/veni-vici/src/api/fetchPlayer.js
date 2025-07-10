import axios from 'axios'


const API_KEY = import.meta.env.VITE_FOOTY_API_KEY

const requestRandomPlayer = async () => {
    //random number from 1 - 50000
    const randnum = Math.floor(Math.random() * 50000) + 1;
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/profiles',
        params: {player: randnum},
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        //sort through the response to get the actual player data
        const player = response.data.response[0].player
        console.log(player)
        return player
    } catch (error) {
        console.error(error);
    }
}

const fetchPlayer = async ({ number, age, height, position, nationality }) => {

    let player = await requestRandomPlayer()
    let attempts = 5
    while (attempts > 0 && (number.includes(player.number) || age.includes(player.age) || height.includes(player.height) || position.includes(player.position) || nationality.includes(player.nationality))) {
        console.log('Not a valid player')
        player = await requestRandomPlayer()
        
    }
    return player


}

export default fetchPlayer