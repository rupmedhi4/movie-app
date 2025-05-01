import React, { useState } from 'react';
import './AddMovieForm.css';

const AddMovieForm = () => {
    const [newMovie, setNewMovie] = useState({
        title: '',
        openingText: '',
        releaseDate: ''
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setNewMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value
        }));
    };
    const addMovieHandler = async () => {
        try {
          const response = await fetch('https://movie-app-bb727-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(newMovie),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to add movie');
          }
      
          setNewMovie({
            title: '',
            openingText: '',
            releaseDate: ''
          });
      
          alert("Movie added successfully!");
        } catch (error) {
          console.error(error.message);
        }
      };
      
    return (
        <div className="add-movie-form">


            <label htmlFor="title">Movie Title</label>
            <input
                id="title"
                type="text"
                name="title"
                value={newMovie.title}
                onChange={inputChangeHandler}
                placeholder="Movie Title"
                className="form-input"
            />

            <label htmlFor="openingText">Opening Text</label>
            <textarea
                id="openingText"
                name="openingText"
                value={newMovie.openingText}
                onChange={inputChangeHandler}
                placeholder="Opening Text"
                className="form-input"
                rows={4}
            />

            <label htmlFor="releaseDate">Release Date</label>
            <input
                id="releaseDate"
                type="date"
                name="releaseDate"
                value={newMovie.releaseDate}
                onChange={inputChangeHandler}
                className="form-input"
            />

            <button onClick={addMovieHandler} className="fetch-button">Add Movie</button>

        </div>
    );
};

export default AddMovieForm;
