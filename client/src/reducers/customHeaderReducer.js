import { UPDATE_WINDOW_DIMENSIONS } from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  windowWidth: null,
  windowHeight: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case UPDATE_WINDOW_DIMENSIONS:
      newState.windowWidth = action.newWindowWidth;
      newState.windowHeight = action.newWindowHeight;
      return newState;
    default:
      return state;
  }
}
