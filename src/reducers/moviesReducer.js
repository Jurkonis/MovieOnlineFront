import { FETCH_MOVIES, FETCH_MOVIE, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, ERRORS, ERROR, RESET_ERRORS, UPDATE_MODAL, DELETE_MODAL, ADD_GENRE, REMOVE_GENRE, ADD_ACTOR, REMOVE_ACTOR} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  movieGenres:[],
  movieActors:[],
  errors:{},
  error: '',
  modal: false,
  deleteModal: false,
};

export default function smiley(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
      case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        movieGenres: action.payload.genres,
        error:'',
        movieActors: action.payload.actors,
      };
      case UPDATE_MOVIE:
      return {
        ...state,
        movie: action.payload,
        movieGenres: action.payload.genres,
        movieActors: action.payload.actors,
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
      case ADD_GENRE:
      return {
        ...state,
        movieGenres: state.movieGenres.concat(action.genre)
      };
      case REMOVE_GENRE:
      return {
        ...state,
        movieGenres: state.movieGenres.filter((item, index) => index !== action.index),
      };
      case ADD_ACTOR:
      return {
        ...state,
        movieActors: state.movieActors.concat(action.actor)
      };
      case REMOVE_ACTOR:
      return {
        ...state,
        movieActors: state.movieActors.filter((item, index) => index !== action.index),
      };
      case ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
      case ERROR:
      return {
        ...state,
        error: action.payload,
      };
      case RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
      case UPDATE_MODAL:
      return {
        ...state,
        modal: action.bool,
      };
      case DELETE_MODAL:
      return {
        ...state,
        deleteModal: action.bool,
      };
    default:
      return state;
  }
}