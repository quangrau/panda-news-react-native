import {
  SET_INDEX,
  FETCH_SOURCES,
  FETCH_SOURCES_PENDING,
  FETCH_SOURCES_REJECTED,
  FETCH_SOURCES_FULFILLED,
} from '../actions/source';

const initialState = {
  selectedIndex: 0,
  loading: false,
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        selectedIndex: action.payload,
      };

    case FETCH_SOURCES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SOURCES_FULFILLED:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case FETCH_SOURCES_REJECTED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
