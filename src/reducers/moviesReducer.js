import { FETCH_MOVIES, FETCH_MOVIE, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, ERRORS, RESET_ERRORS} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  movieGenres:[],
  errors:{},
  loaded: false,
};

export default function smiley(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loaded: true,
      };
      case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        movieGenres: action.payload.genres,
        loaded: true,
      };
      case UPDATE_MOVIE:
      return {
        ...state,
        movie: action.payload,
        movieGenres: action.payload.genres,
        loaded: true,
      };
      case ADD_MOVIE:
      return {
        ...state,
        movies: state.movies.concat(action.movie)
      };
      case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((item, index) => index !== action.index),
      };
      case ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
      case RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
}