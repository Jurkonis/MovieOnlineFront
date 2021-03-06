import { FETCH_ACTORS, FETCH_ACTOR, ADD_ACTOR, UPDATE_ACTOR, DELETE_ACTOR, ERRORS, RESET_ERRORS, UPDATE_MODAL, DELETE_MODAL, ERROR} from "../actions/types";

const initialState = {
  actors: [],
  actor: {},
  actorMovies :[],
  errors:{},
  error:'',
  modal: false,
  deleteModal: false,
};

export default function smiley(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTORS:
      return {
        ...state,
        actors: action.payload,
      };
      case FETCH_ACTOR:
      return {
        ...state,
        actor: action.payload,
        error:'',
        actorMovies: action.payload.actorMovies,
      };
      case UPDATE_ACTOR:
      return {
        ...state,
        actor: action.payload,
      };
      case ADD_ACTOR:
      return {
        ...state,
        actors: state.actors.concat(action.actor)
      };
      case DELETE_ACTOR:
      return {
        ...state,
        actors: state.actors.filter((item, index) => index !== action.index),
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