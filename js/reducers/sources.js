
import type { Action } from '../actions/types';
import { SET_INDEX } from '../actions/source';

export type State = {
  list: string
}

const initialState = {
  selectedIndex: 0,
  list: [{
    name: 'Product Hunt',
    key: 'productHunt',
    color: '#dc5425',
    icon: 'https://usepanda.com/img/source-icons/productHunt.png',
  }, {
    name: 'The Next Web',
    key: 'theNextWeb',
    color: '#db232c',
    icon: 'https://usepanda.com/img/source-icons/theNextWeb.png',
  }, {
    name: 'Hacker News',
    key: 'hackerNews',
    color: '#ff6500',
    icon: 'https://usepanda.com/img/source-icons/hackerNews.png',
  }, {
    name: 'Front-end Front',
    key: 'frontEndFront',
    color: '#2DBF80',
    icon: 'http://usepanda.com/img/source-icons/frontendfront.png',
  }],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload,
    };
  }
  return state;
}
