import { combineReducers } from 'redux';

// import dashboard from './dashboard';
import app from './app';
import common from './common';
export default combineReducers({
  app,
  common
});
