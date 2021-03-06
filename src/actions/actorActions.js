import { FETCH_ACTORS, FETCH_ACTOR, ADD_ACTOR, UPDATE_ACTOR, DELETE_ACTOR, ERRORS, RESET_ERRORS, URL, UPDATE_MODAL, DELETE_MODAL, ERROR} from "./types";
import axios from "axios";

export const url = URL;

export const fetchActors = () => (dispatch) => {
  axios.get(url +"/actor").then((res) => {
      dispatch({ type: FETCH_ACTORS, payload: res.data });
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

export const fetchLeftActors = (actors) => (dispatch) => {
  axios.post(url +"/actor/left", actors).then((res) => {
      dispatch({ type: FETCH_ACTORS, payload: res.data });
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

export const fetchActor = (id) => (dispatch) => {
  axios.get(url + "/actor/"+id).then((res) => {
      dispatch({ type: FETCH_ACTOR, payload: res.data });
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

export const addActor = (firstName, lastName) => (dispatch) => {
  axios.post(url + "/actor", {firstName, lastName}).then((res) => {
    dispatch({ type: ADD_ACTOR, actor: res.data });
    dispatch({ type: UPDATE_MODAL, bool: false });
      })
      .catch((error) => {
        if (error.response) {
          if(typeof error.response.data !== 'string'){
            dispatch({ type: ERRORS, payload: error.response.data.errors });
            dispatch({ type: ERROR, payload: '' });
          }else{
            dispatch({ type: ERROR, payload: error.response.data+ ": " + firstName + " " + lastName });
            dispatch({ type: ERRORS, payload: {} });
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
};

export const addActorToState = (actor) => (dispatch) => {
    dispatch({ type: ADD_ACTOR, actor: actor });
};

export const updateActor = (id, firstName, lastName) => (dispatch) => {
  axios.put(url + "/actor/"+ id, {firstName, lastName}).then((res) => {
    dispatch({ type: UPDATE_ACTOR, payload: res.data });
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

export const removeActor = (id, index) => (dispatch) => {
  axios.delete(url + "/actor/"+ id).then((res) => {
      dispatch({ type: DELETE_ACTOR, index: index });
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