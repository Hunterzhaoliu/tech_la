import axios from "axios";
import {
  FILL_PROFILE,
  FILL_PROFILE_ERROR,
  SAVE_PROFILE_START,
  SUCCESSFULLY_SAVED_PROFILE,
  PROFILE_SAVE_ERROR
} from "./types";

export const onProfile = mongoDBUserId => async dispatch => {
  // fetch user profile
  const userProfileResponse = await axios.get(
    "/api/user?mongoDBUserId=" + mongoDBUserId
  );

  if (userProfileResponse.status === 200) {
    dispatch({
      type: FILL_PROFILE,
      userProfile: userProfileResponse.data.profile
    });
  } else {
    dispatch({ type: FILL_PROFILE_ERROR });
  }
};

export const saveProfile = (mongoDBUserId, profile) => async dispatch => {
  dispatch({
    type: SAVE_PROFILE_START
  });

  // need to validate profile information before hitting database
  // record all of the possible errors and then remove the errors key
  let profileErrors = profile.errors;
  delete profile.errors;

  // check for specific errors
  // check for age input errors
  if (profile.age === undefined) {
    profileErrors.ageError = false;
  } else if (profile.age < 13 || profile.age > 100) {
    // input age has an error, don't want to save in database
    delete profile.age;
    profileErrors.ageError = true;
  }

  const profileInfo = { mongoDBUserId: mongoDBUserId, profile: profile };
  const saveProfileResponse = await axios.put("/api/profile/save", profileInfo);

  if (saveProfileResponse.status === 200) {
    dispatch({
      type: SUCCESSFULLY_SAVED_PROFILE,
      savedProfile: profile,
      profileErrors: profileErrors
    });
  } else {
    dispatch({ type: PROFILE_SAVE_ERROR });
  }
};
