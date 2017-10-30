import axios from 'axios';

// API Routes
import { GET_APP_CONFIG_ROUTE } from '../appRoutes';

// Actions
const GET_APP_CONFIG = 'GET_APP_CONFIG';
export const getAppConfig = () => {
  const promise = axios.get(GET_APP_CONFIG_ROUTE);
  return {
    type: GET_APP_CONFIG,
    payload: promise
  };
};

// Reducer
const initState = {
  appConfig: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_APP_CONFIG:
      return Object.assign({}, state, { appConfig: payload.data });
    default:
      return state;
  }
};
