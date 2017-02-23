import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import sources from './sources';
import feeds from './feeds';
import settings from './settings';

export default combineReducers({
  feeds,
  drawer,
  sources,
  settings,
  cardNavigation,
});
