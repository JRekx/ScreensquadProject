const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '0603d4df389e281cd4338b1fb04ca1b5';

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Server Error');
  }
});

router.get('/:movieId/trailers', async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trailers:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
