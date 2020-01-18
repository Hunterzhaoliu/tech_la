import { UPDATE_WINDOW_DIMENSIONS } from "./types";

export const updateWindowDimensions = (
  newWindowWidth,
  newWindowHeight
) => dispatch => {
  dispatch({
    type: UPDATE_WINDOW_DIMENSIONS,
    newWindowWidth: newWindowWidth,
    newWindowHeight: newWindowHeight
  });
};
