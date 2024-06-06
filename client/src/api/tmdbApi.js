import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: '0603d4df389e281cd4338b1fb04ca1b5',
    params: {
        api_key: 'your_tmdb_api_key'
    }
});

export default tmdbApi;
