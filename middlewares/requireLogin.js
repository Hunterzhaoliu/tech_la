const keys = require("../config/keys");
const jwt_decode = require("jwt-decode");

module.exports = (request, response, next) => {
  // check header for the token
  const token = request.headers.authorization;
  if (token) {
    // check if token is correct
    const decodedUser = jwt_decode(token);
    if (decodedUser === undefined) {
      return response.status(401).send({ error: "You must be logged in :)" });
    }
  } else if (!request.user) {
    // user is not logged in through GoogleOauth
    return response.status(401).send({ error: "You must be logged in :)" });
  }

  // user is logged in
  next();
};
