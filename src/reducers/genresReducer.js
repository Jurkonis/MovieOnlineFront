import { FETCH_GENRES, FETCH_GENRE, ADD_GENRE, UPDATE_GENRE, DELETE_GENRE, ERRORS, RESET_ERRORS, UPDATE_MODAL, DELETE_MODAL, ERROR} from "../actions/types";

const initialState = {
  genres: [],
  genre: {},
  genreMovies :[],
  errors:{},
  error:'',
  modal: false,
  deleteModal: false,
};

export default function smiley(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
      case FETCH_GENRE:
      return {
        ...state,
        genre: action.payload,
        error:'',
        genreMovies: action.payload.genreMovies,
      };
      case UPDATE_GENRE:
      return {
        ...state,
        genre: action.payload,
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