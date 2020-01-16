import {
  SWITCH_POP_UP_VISIBILITY,
  SET_CURRENT_USER,
  SAVE_LOGIN_ERRORS,
  SAVE_REGISTER_ERRORS
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  isAuthenticated: false,
  isGoogleOauth: false,
  mongoDBUserId: null,
  loginIsVisible: false,
  registerIsVisible: false,
  loginErrors: {},
  registerErrors: {},
  menuButtonsIsVisible: false
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.mongoDBUserId !== undefined) {
        // user is logged in
        newState.isAuthenticated = true;
        newState.mongoDBUserId = action.mongoDBUserId;
        newState.isGoogleOauth = action.isGoogleOauth;
      } else {
        newState.isAuthenticated = false;
        newState.mongoDBUserId = null;
        newState.isGoogleOauth = false;
      }
      return newState;
    case SWITCH_POP_UP_VISIBILITY:
      const popUpName = action.popUpName;
      // clear out the errors
      newState.loginErrors = {};
      newState.registerErrors = {};
      if (popUpName === "login") {
        // need to switch loginIsVisible
        newState.loginIsVisible = !state.loginIsVisible;
        newState.registerIsVisible = false;
        newState.menuButtonsIsVisible = false;
      } else if (popUpName === "register") {
        // need to switch registerIsVisible
        newState.registerIsVisible = !state.registerIsVisible;
        newState.loginIsVisible = false;
        newState.menuButtonsIsVisible = false;
      } else if (popUpName === "menuButtons") {
        newState.menuButtonsIsVisible = !state.menuButtonsIsVisible;
        newState.registerIsVisible = false;
        newState.loginIsVisible = false;
      }
      return newState;
    case SAVE_LOGIN_ERRORS:
      newState.loginErrors = action.loginErrors;
      return newState;
    case SAVE_REGISTER_ERRORS:
      newState.registerErrors = action.registerErrors;
      return newState;
    default:
      return state;
  }
}
