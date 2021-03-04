import { FETCH_GENRES, FETCH_GENRE, DELETE_GENRE, ERRORS, RESET_ERRORS, URL} from "./types";
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

export const fetchGenre = (id) => (dispatch) => {
  axios.get(url + "/genre/"+id).then((res) => {
      dispatch({ type: FETCH_GENRE, payload: res.data });
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

export const addGenre = (name) => (dispatch) => {
  axios.post(url + "/genre", {name}).then((res) => {
      window.location.href = "/genres";
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

export const updateGenre = (id, name) => (dispatch) => {
  axios.put(url + "/genre/"+ id, {name}).then((res) => {
      window.location.href = "/genre/"+id;
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