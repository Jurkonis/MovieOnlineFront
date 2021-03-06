import { FETCH_MOVIES, FETCH_MOVIE, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, REMOVE_GENRE, ERRORS, ERROR, RESET_ERRORS, URL, UPDATE_MODAL, DELETE_MODAL, ADD_GENRE, ADD_ACTOR, REMOVE_ACTOR} from "./types";
import axios from "axios";

export const url = URL;

export const fetchMovies = () => (dispatch) => {
  axios.get(url + "/movie").then((res) => {
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
  axios.get(url + "/movie/"+id).then((res) => {
      dispatch({ type: FETCH_MOVIE, payload: res.data });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: ERROR, payload: error.response.data.title });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const addMovie = (name, description, releaseYear, genres, actors) => (dispatch) => {
  axios.post(url + "/movie", {name, description, releaseYear }).then((res) => {
      dispatch({ type: ADD_MOVIE, movie: res.data });
      genres.map((genre) => (
        axios.post(url + "/movie/genre", {movieId: res.data.id, genreId: genre.id}).then((res2) => {
        }).catch((error2) => {
          if (error2.response) {
            console.log(error2.response.data);
          } else if (error2.request) {
            console.log(error2.request);
          } else {
            console.log("Error", error2.message);
          }
        })));
      actors.map((actor) => (
        axios.post(url + "/movie/actor", {movieId: res.data.id, actorId: actor.id}).then((res2) => {
        }).catch((error2) => {
          if (error2.response) {
            console.log(error2.response.data);
          } else if (error2.request) {
            console.log(error2.request);
          } else {
            console.log("Error", error2.message);
          }
        })));
      dispatch({ type: UPDATE_MODAL, bool: false });
      })
      .catch((error) => {
        if (error.response) {
          if(typeof error.response.data !== 'string'){
            dispatch({ type: ERRORS, payload: error.response.data.errors });
            dispatch({ type: ERROR, payload: '' });
          }else{
            dispatch({ type: ERROR, payload: error.response.data+ ": " + name });
            dispatch({ type: ERRORS, payload: {} });
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const updateMovie = (id, name, description, releaseYear, genres, actors) => (dispatch) => {
  axios.put(url + "/movie/"+ id, {name, description, releaseYear}).then((res) => {
      dispatch({ type: UPDATE_MOVIE, payload: res.data });
        genres.map((genre) => (
          axios.post(url + "/movie/genre", {movieId: res.data.id, genreId:genre.id}).then((res2) => {
            dispatch({ type: ADD_GENRE, genre: res2.data });
          }).catch((error2) => {
            if (error2.response) {
              console.log(error2.response.data);
            } else if (error2.request) {
              console.log(error2.request);
            } else {
              console.log("Error", error2.message);
            }
          })));
          actors.map((actor) => (
            axios.post(url + "/movie/actor", {movieId: res.data.id, actorId: actor.id}).then((res2) => {
              dispatch({ type: ADD_ACTOR, actor: res2.data });
            }).catch((error2) => {
              if (error2.response) {
                console.log(error2.response.data);
              } else if (error2.request) {
                console.log(error2.request);
              } else {
                console.log("Error", error2.message);
              }
            })));
        dispatch({ type: UPDATE_MODAL, bool: false });
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
  axios.delete(url + "/movie/"+ id).then((res) => {
      dispatch({ type: DELETE_MOVIE, index: index });
      window.location.href = "/";
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

export const removeGenre = (id, index) => (dispatch) => {
  axios.delete(url + "/movie/genre/"+ id).then((res) => {
      dispatch({ type: REMOVE_GENRE, index: index });
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

export const removeActor = (id, index) => (dispatch) => {
  axios.delete(url + "/movie/actor/"+ id).then((res) => {
      dispatch({ type: REMOVE_ACTOR, index: index });
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

export const setUpdateModal = (bool) => (dispatch) =>{
  dispatch({ type: UPDATE_MODAL, bool: bool});
}

export const setDeleteModal = (bool) => (dispatch) =>{
  dispatch({ type: DELETE_MODAL, bool: bool});
}

export const addErrors = (error) => (dispatch) =>{
  dispatch({ type: ERRORS, payload: error.response.data.errors });
  dispatch({ type: ERROR, payload: '' });
}

export const addError = (error, firstName, lastName) => (dispatch) =>{
  dispatch({ type: ERROR, payload: error.response.data+ ": " + firstName + " " + lastName });
  dispatch({ type: ERRORS, payload: {} });
}