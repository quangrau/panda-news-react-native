import type { Action } from '../actions/types';
import { SELECT_SOURCE } from '../actions/source';
import {
  NEXT_PAGE,
  FETCH_FEEDS_PENDING,
  FETCH_FEEDS_FULFILLED,
  FETCH_FEEDS_REJECTED,
} from '../actions/feed';

export type State = {
  feeds: array,
}

const initialState = {
  page: 0,
  loading: false,
  canLoadMore: true,
  data: [],
};

export default function (state:State = initialState, action:Action): State {
  switch (action.type) {
    case FETCH_FEEDS_PENDING:
      return {
        ...state,
        loading: true,
        canLoadMore: false,
      };

    case FETCH_FEEDS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.page > 1
          ? [...state.data, ...action.payload]
          : action.payload,
        canLoadMore: !!action.payload.length,
      }

    case FETCH_FEEDS_REJECTED:
      return {
        ...state,
        loading: false,
      };

    case NEXT_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case SELECT_SOURCE:
      return initialState;

    default:
      return state;
  }
}

