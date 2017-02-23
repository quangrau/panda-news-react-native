import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import sources from './sources';
import feeds from './feeds';

export default combineReducers({
  feeds,
  drawer,
  sources,
  cardNavigation,
});
