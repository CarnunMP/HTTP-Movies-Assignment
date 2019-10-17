import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";

const moviesURL = "http://localhost:5000/api/movies";

const App = props => {
  const [movies, setMovies] = useState([]);
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
      axios.get(moviesURL)
        .then(res => {
          setMovies(res.data);
        })
        .catch(err => {
          console.log(err.response)
        });
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const onUpdateSubmit = id => formValues => {
    const reqBody = {
      id: id,
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: JSON.parse(formValues.stars),
    }

    axios.put(moviesURL + `/${id}`, reqBody)
      .then(res => {
        // const rest = movies.filter(movie => movie.id !== id);
        // setMovies([...rest, res.data]);
        // ^^^Is there a way to o this without the order changing?

        let newMoviesState = movies;
        newMoviesState[movies.findIndex(movie => movie.id === id)] = res.data;
        setMovies(newMoviesState);
        props.history.push("/");
      })
      .catch(err => {
        alert(err);
      })
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => <MovieList {...props} movies={movies} />} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovieForm {...props} movies={movies} onUpdateSubmit={onUpdateSubmit} />
        }}
      />
    </>
  );
};

export default withRouter(App);
