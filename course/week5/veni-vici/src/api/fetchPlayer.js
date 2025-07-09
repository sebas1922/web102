import axios from 'axios'

//const API_KEY = import.meta.env.VITE_FOOTY_API_KEY

const fetchPlayer = async (id) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/profiles',
        params: {player: id},
        headers: {
            'x-rapidapi-key': "7421cf7b73msh3fdfee662194ec7p1eef0cjsnd6de72cf96a6",
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        const player = response.data.response[0].player

        return player

    } catch (error) {
        console.error(error);
    }
}

fetchPlayer(2)

export default fetchPlayer