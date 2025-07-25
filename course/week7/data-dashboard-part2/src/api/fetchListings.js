export const fetchListings = async (filters) => {
    const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
    const url = new URL('https://api.rentcast.io/v1/listings/rental/long-term');

    const defaultParams = {
        limit: 10,
        status: 'Active'
    }
    
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'X-Api-Key': apiKey }
    };

    const params = new URLSearchParams(
        { ...defaultParams, ...filters }
    );

    url.search = params
 
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data; // This will return the parsed JSON data
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        return []; // Return an empty array on error
    }
};
