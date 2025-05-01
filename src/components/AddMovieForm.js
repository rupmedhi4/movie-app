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

    const addMovieHandler = () => {
        console.log("New Movie Object:", newMovie);
        setNewMovie({
            title: '',
            openingText: '',
            releaseDate: ''
        });
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
