import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer.js";
import genresReducer from "./genresReducer.js";
import actorsReducer from "./actorsReducer.js";

export default combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  actors: actorsReducer,
});