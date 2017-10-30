import axios from 'axios';

import { GET_APP_CONFIG_ROUTE } from '../appRoutes';

const CREATE_NEW_COMPONENT = 'CREATE_NEW_COMPONENT';
export const createNewComponent = name => ({
  type: CREATE_NEW_COMPONENT,
  payload: name
});

const ADD_COMPONENT_UTILITY = 'ADD_COMPONENT_UTILITY';
export const addComponentUtility = (
  utilityType,
  utilityLocation,
  utilityName,
  componentName
) => {
  return {
    type: ADD_COMPONENT_UTILITY,
    payload: { utilityType, utilityLocation, utilityName, componentName }
  };
};

const REMOVE_COMPONENT_UTILITY = 'REMOVE_COMPONENT_UTILITY';
export const removeComponentUtility = (
  utilityType,
  utilityLocation,
  utilityName,
  componentName
) => ({
  type: REMOVE_COMPONENT_UTILITY,
  payload: { utilityType, utilityLocation, utilityName, componentName }
});

const GET_APP_CONFIG = 'GET_APP_CONFIG';
export const getAppConfig = () => {
  const promise = axios.get(GET_APP_CONFIG_ROUTE);
  return {
    type: GET_APP_CONFIG,
    payload: promise
  };
};

const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';
export const setSelectedComponent = component => ({
  type: SET_SELECTED_COMPONENT,
  payload: component
});

const initState = {
  appName: '',
  selectedComponent: '',
  appConfig: {},
  Components: {},
  GlobalRoutes: {},
  GlobalSchema: {},
  GlobalServices: {},
  GlobalCommon: {}
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_APP_CONFIG:
      const { appConfig, appStructure } = payload.data;
      const newStructure = {
        appName: appConfig.Config.Name,
        appConfig,
        selectedComponent: Object.keys(appStructure.Components)[0],
        ...appStructure
      };
      return Object.assign({}, state, newStructure);
    case SET_SELECTED_COMPONENT:
      return Object.assign({}, state, { selectedComponent: payload });
    case ADD_COMPONENT_UTILITY:
      const aUpdatedComponent = Object.assign(
        {},
        state.Components[payload.componentName]
      );
      if (!aUpdatedComponent.config[payload.utilityType])
        aUpdatedComponent.config[payload.utilityType] = {};
      if (
        !aUpdatedComponent.config[payload.utilityType][payload.utilityLocation]
      ) {
        aUpdatedComponent.config[payload.utilityType][
          payload.utilityLocation
        ] = [payload.utilityName];
      } else
        aUpdatedComponent.config[payload.utilityType][
          payload.utilityLocation
        ].push(payload.utilityName);
      const aUpdatedComponentList = Object.assign({}, state.Components);
      aUpdatedComponentList[payload.componentName] = aUpdatedComponent;
      return Object.assign({}, state, { Components: aUpdatedComponentList });
    case REMOVE_COMPONENT_UTILITY:
      const rUpdatedComponent = Object.assign(
        {},
        state.Components[payload.componentName]
      );
      rUpdatedComponent.config[payload.utilityType][
        payload.utilityLocation
      ].splice(
        rUpdatedComponent.config[payload.utilityType][
          payload.utilityLocation
        ].indexOf(payload.utilityName),
        1
      );
      const rUpdatedComponentList = Object.assign({}, state.Components);
      rUpdatedComponentList[payload.componentName] = rUpdatedComponent;
      return Object.assign({}, state, { Components: rUpdatedComponentList });
    case CREATE_NEW_COMPONENT:
      const Components = Object.assign({}, state.Components);
      Components[payload] = {
        files: {},
        config: {
          schema: {},
          routes: {},
          controllers: [],
          importedServices: {},
          importetCommon: {}
        }
      };
      return Object.assign({}, state, { Components });
    default:
      return state;
  }
};
