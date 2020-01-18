const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
// Load User model
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.get("/api/user", async (request, response) => {
    const mongoDBUserId = request.query.mongoDBUserId;
    // user logged in regularly, so need to find the user in the database
    // and return user information
    try {
      const userFromDB = await UserCollection.findOne({
        _id: mongoDBUserId
      }).select({ _id: 0, profile: 1 });
      response.send(userFromDB);
    } catch (error) {
      response.send("no user");
    }
  });

  app.put("/api/profile/save", requireLogin, async (request, response) => {
    try {
      const profileInfo = request.body;
      await UserCollection.findOneAndUpdate(
        { _id: profileInfo.mongoDBUserId },
        {
          $set: {
            profile: profileInfo.profile
          }
        }
      );

      response.send("saved profile");
    } catch (error) {
      response.status(422).send(error);
    }
  });
};
