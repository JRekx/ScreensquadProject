import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../styles/MovieSearch.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState('');
  const [error, setError] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('http://localhost:8000/api/movies/search', {
        params: { query },
      });
      setMovies(data.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/movies/${movieId}/trailers`);
      const trailer = data.results.find(video => video.type === 'Trailer');
      if (trailer) {
        setTrailerId(trailer.key);
      } else {
        setError('Trailer not available');
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
      setError('Failed to fetch trailer. Please try again later.');
    }
  };

  return (
    <div className="movie-search">
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {trailerId && (
        <YouTube videoId={trailerId} opts={{ width: '100%', height: '390' }} />
      )}

      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              onMouseOver={(e) => {
                const button = e.currentTarget.nextSibling;
                button.style.display = 'block';
              }}
              onMouseOut={(e) => {
                const button = e.currentTarget.nextSibling;
                button.style.display = 'none';
              }}
            />
            <button
              style={{ display: 'none' }}
              onClick={() => fetchTrailer(movie.id)}
            >
              Show Trailer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
