import { FETCH_GENRES, FETCH_GENRE, ADD_GENRE, DELETE_GENRE, ERRORS, RESET_ERRORS} from "../actions/types";

const initialState = {
  genres: [],
  genre: [],
  genreMovies :[],
  errors:{},
  loaded: false,
};

export default function smiley(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
        loaded: true,
      };
      case FETCH_GENRE:
      return {
        ...state,
        genre: action.payload,
        genreMovies: action.payload.genreMovies,
        loaded: true,
      };
      case ADD_GENRE:
      return {
        ...state,
        genres: state.genres.concat(action.genre)
      };
      case DELETE_GENRE:
      return {
        ...state,
        genres: state.genres.filter((item, index) => index !== action.index),
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