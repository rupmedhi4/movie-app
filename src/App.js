import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MoviesList from './components/MoviesList';
import AddMovieForm from './components/AddMovieForm'; 
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
 
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('https://movie-app-bb727-default-rtdb.firebaseio.com/movies.json');
  
      if (!response.ok) {
        throw new Error('Something went wrong... Retrying');
      }
  
      const data = await response.json();
  
      const loadedMovies = [];
  
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }
  
      setMovies(loadedMovies);
      setIsRetrying(false);
  
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    } catch (err) {
      setError('Something went wrong... Retrying');
  
      if (!intervalId) {
        setIsRetrying(true);
        const id = setInterval(fetchMoviesHandler, 5000);
        setIntervalId(id);
      }
    }
  
    setIsLoading(false);
  }, [intervalId]);
  

  const cancelRetryHandler = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRetrying(false);
    setError('Retry cancelled by user.');
  }, [intervalId]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const memoizedMoviesList = useMemo(() => {
    return movies.length > 0 ? <MoviesList movies={movies} /> : null;
  }, [movies]);

 

  return (
    <React.Fragment>
      <section className="form-section">
        <AddMovieForm/>
        <button onClick={fetchMoviesHandler} className="fetch-button">Fetch Movies</button>
        {isRetrying && <button onClick={cancelRetryHandler} className="fetch-button">Cancel Retry</button>}
      </section>

      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && memoizedMoviesList}
        {!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
