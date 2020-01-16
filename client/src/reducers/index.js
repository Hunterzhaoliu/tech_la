import { combineReducers } from "redux";
import customHeaderReducer from "./customHeaderReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  customHeader: customHeaderReducer,
  auth: authReducer,
  profile: profileReducer
});
