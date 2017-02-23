import type { Action } from '../actions/types';
import {
  FETCH_FEEDS_PENDING,
  FETCH_FEEDS_FULFILLED,
  FETCH_FEEDS_REJECTED,
} from '../actions/feeds';

export type State = {
  feeds: array,
}

const initialState = {
  page: 1,
  limit: 30,
  sort: 'popular',
  loading: false,
  data: [],
};

export default function (state:State = initialState, action:Action): State {
  switch (action.type) {
    case FETCH_FEEDS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_FEEDS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    case FETCH_FEEDS_REJECTED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

