import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  SWITCH_POP_UP_VISIBILITY,
  SET_CURRENT_USER,
  SAVE_LOGIN_ERRORS,
  SAVE_REGISTER_ERRORS
} from "./types";
import history from "../containers/history";

export const initializeApp = () => async dispatch => {
  let isGoogleOauth = true;
  let mongoDBUserId;

  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;

    setAuthToken(token);

    // Decode token to get user
    const user = jwt_decode(token);
    mongoDBUserId = user.id;
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (user.exp < currentTime) {
      // Logout user
      dispatch(logoutUser());

      // Redirect to landing
      history.push("/");
    }

    isGoogleOauth = false;
  }

  // if the user logged in regularly, mongoDBUserId will be the user's mongoDBUserId,
  // but if the user logged in through GoogleOauth, mongoDBUserId will be empty
  const userResponse = await axios.get(
    "/auth/user?mongoDBUserId=" + mongoDBUserId
  );

  const userResponseId = userResponse.data._id;

  dispatch({
    type: SET_CURRENT_USER,
    mongoDBUserId: userResponseId,
    isGoogleOauth: isGoogleOauth
  });

  const currentURL = window.location.href;

  if (userResponseId !== undefined) {
    dispatch({
      type: FILL_PROFILE,
      profile: userResponse.data.profile
    });
  }
};

export const switchPopUpVisibility = popUpName => dispatch => {
  dispatch({
    type: SWITCH_POP_UP_VISIBILITY,
    popUpName: popUpName
  });
};

const localLoginUser = async (email, password, dispatch) => {
  const userLoginInformation = { email: email, password: password };

  const loginResponse = await axios.post("/auth/login", userLoginInformation);

  if (loginResponse.data.success) {
    // User successfully logged in
    // Save to localStorage and set token to localStorage
    localStorage.setItem("jwtToken", loginResponse.data.token);

    // Set token to Auth header using util functions
    setAuthToken(loginResponse.data.token);

    const user = loginResponse.data.user;

    dispatch({
      type: SET_CURRENT_USER,
      mongoDBUserId: user._id,
      isGoogleOauth: false
    });

    // finished with login
    dispatch({
      type: SWITCH_POP_UP_VISIBILITY,
      popUpName: "login"
    });

    if (user.profile.profileIsFilled === false) {
      // user needs to fill out profile
      history.push("/profile");
    } else {
      history.push("/menu");
    }
  } else {
    dispatch({
      type: SAVE_LOGIN_ERRORS,
      loginErrors: loginResponse.data
    });
  }
};

export const loginUser = (email, password) => async dispatch => {
  localLoginUser(email, password, dispatch);
};

export const logoutUser = () => dispatch => {
  // used for (regular login and GoogleOauth) logout
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    mongoDBUserId: undefined
  });

  // only right way to logout is to do it through the menu buttons, need to
  // close the header menu buttons when the user chooses to logout
  dispatch({
    type: SWITCH_POP_UP_VISIBILITY,
    popUpName: "menuButtons"
  });

  // push to landing page
  history.push("/");
};

export const registerUser = newUser => async dispatch => {
  const registerResponse = await axios.post("/auth/register", newUser);

  const registerResponseData = registerResponse.data;
  if (registerResponseData === "success") {
    // pre-emptively close the login that is switched on in the loginUser() function
    dispatch({
      type: SWITCH_POP_UP_VISIBILITY,
      popUpName: "login"
    });

    // also login user after registering them
    await localLoginUser(newUser.email, newUser.password, dispatch);
  } else {
    // user sign up has errors
    dispatch({
      type: SAVE_REGISTER_ERRORS,
      registerErrors: registerResponseData
    });
  }
};
