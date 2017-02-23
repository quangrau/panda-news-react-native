import {
  UPDATE_SETTING_FILTER,
  UPDATE_SETTING_LIMIT,
} from '../actions/setting';

const initialState = {
  filter: 'popular',
  limit: 30,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case UPDATE_SETTING_LIMIT:
      return {
        ...state,
        limit: action.payload,
      }

    default:
      return state;
  }
}
