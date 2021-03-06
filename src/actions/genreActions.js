import { FETCH_GENRES, FETCH_GENRE, ADD_GENRE, UPDATE_GENRE, DELETE_GENRE, ERRORS, RESET_ERRORS, URL, UPDATE_MODAL, DELETE_MODAL, ERROR} from "./types";
import axios from "axios";

export const url = URL;

export const fetchGenres = () => (dispatch) => {
  axios.get(url +"/genre").then((res) => {
      dispatch({ type: FETCH_GENRES, payload: res.data });
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

export const fetchLeftGenres = (genres) => (dispatch) => {
  axios.post(url +"/genre/left", genres).then((res) => {
      dispatch({ type: FETCH_GENRES, payload: res.data });
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

export const fetchGenre = (id) => (dispatch) => {
  axios.get(url + "/genre/"+id).then((res) => {
      dispatch({ type: FETCH_GENRE, payload: res.data });
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

export const addGenre = (name) => (dispatch) => {
  axios.post(url + "/genre", {name}).then((res) => {
    dispatch({ type: ADD_GENRE, genre: res.data });
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

export const updateGenre = (id, name) => (dispatch) => {
  axios.put(url + "/genre/"+ id, {name}).then((res) => {
    dispatch({ type: UPDATE_GENRE, payload: res.data });
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

export const removeGenre = (id, index) => (dispatch) => {
  axios.delete(url + "/genre/"+ id).then((res) => {
      dispatch({ type: DELETE_GENRE, index: index });
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