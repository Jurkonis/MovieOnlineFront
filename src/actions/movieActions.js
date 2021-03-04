import { FETCH_MOVIES, FETCH_MOVIE, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, REMOVE_GENRE_FROM_MOVIE, ERRORS, RESET_ERRORS} from "./types";
import axios from "axios";

export const fetchMovies = () => (dispatch) => {
  axios.get("http://localhost:50569/api/movie").then((res) => {
      dispatch({ type: FETCH_MOVIES, payload: res.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const fetchMovie = (id) => (dispatch) => {
  axios.get("http://localhost:50569/api/movie/"+id).then((res) => {
      dispatch({ type: FETCH_MOVIE, payload: res.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const addMovie = (name, description, releaseYear, actors, genres) => (dispatch) => {
  axios.post("http://localhost:50569/api/movie", {name, description, actors, releaseYear }).then((res) => {
      dispatch({ type: ADD_MOVIE, movie: res.data });
      genres.map((genre, index) => (
        axios.post("http://localhost:50569/api/movie/genre", {movieId: res.data.id, genreId:genre.id}).then((res2) => {
        }).catch((error2) => {
          if (error2.response) {
            console.log(error2.response.data);
          } else if (error2.request) {
            console.log(error2.request);
          } else {
            console.log("Error", error2.message);
          }
        }))
      );
      window.location.href = "/";
      })
      .catch((error) => {
        if (error.response) {
         dispatch({ type: ERRORS, payload: error.response.data.errors });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const updateMovie = (id, name, description, releaseYear, actors, genres) => (dispatch) => {
  axios.put("http://localhost:50569/api/movie/"+ id, {name, description, releaseYear, actors}).then((res) => {
      dispatch({ type: UPDATE_MOVIE, payload: res.data });
        genres.map((genre, index) => (
          axios.post("http://localhost:50569/api/movie/genre", {movieId: res.data.id, genreId:genre.id}).then((res2) => {
            console.log(res2.data);
          }).catch((error2) => {
            if (error2.response) {
              console.log(error2.response.data);
            } else if (error2.request) {
              console.log(error2.request);
            } else {
              console.log("Error", error2.message);
            }
          }))
        );
        window.location.href = "/movie/"+id;
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: ERRORS, payload: error.response.data.errors });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const removeMovie = (id, index) => (dispatch) => {
  axios.delete("http://localhost:50569/api/movie/"+ id).then((res) => {
      dispatch({ type: DELETE_MOVIE, index: index });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const removeGenre = (id, movieId, index) => (dispatch) => {
  axios.delete("http://localhost:50569/api/movie/genre/"+ id).then((res) => {
      dispatch({ type: REMOVE_GENRE_FROM_MOVIE, index: index });
      window.location.href = "/movie/"+movieId;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const resetErrors = () => (dispatch) => {
  dispatch({ type: RESET_ERRORS});
};