import {
  FILL_PROFILE,
  SAVE_PROFILE_START,
  SUCCESSFULLY_SAVED_PROFILE,
  PROFILE_SAVE_ERROR
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  values: {
    firstName: null,
    lastName: null,
    age: null,
    gender: null
  },
  errors: {
    ageError: false
  },
  saveState: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case FILL_PROFILE:
      if (action.userProfile !== undefined) {
        // user has profile atleast partially filled
        newState.values = action.userProfile;
      }
      return newState;
    case SAVE_PROFILE_START:
      newState.saveState = "start";
      return newState;
    case SUCCESSFULLY_SAVED_PROFILE:
      newState.values = action.savedProfile;
      newState.errors = action.profileErrors;
      newState.saveState = "done";
      return newState;
    case PROFILE_SAVE_ERROR:
      newState.saveState = "error";
      return newState;
    default:
      return state;
  }
}
