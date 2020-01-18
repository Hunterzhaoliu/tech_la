const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const mongoose = require("mongoose");
const passport = require("passport");
// Load User model
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.get("/auth/user", async (request, response) => {
    if (request.user !== undefined) {
      // user logged in through GoogleOauth
      response.send(request.user);
    } else {
      const mongoDBUserId = request.query.mongoDBUserId;
      // user logged in regularly, so need to find the user in the database
      // and return user information
      try {
        const userFromDB = await UserCollection.findOne({ _id: mongoDBUserId });
        response.send(userFromDB);
      } catch (error) {
        response.send("no user");
      }
    }
  });

  app.post("/auth/login", (request, response) => {
    // request.body contains the userLogin = { email: , password:}
    const { loginErrors, isValidLogin } = validateLoginInput(request.body);

    // Check validation
    if (!isValidLogin) {
      return response.json(loginErrors);
    }

    const email = request.body.email.toLowerCase();
    const password = request.body.password;
    // Find user by email
    UserCollection.findOne({ email: email }).then(user => {
      // Check if user exists
      if (!user) {
        return response.json({ email: "Email not found." });
      } else if (user.password === undefined) {
        // user is trying to login with password, but already has GoogleOauth
        // account
        return response.json({
          email: "Please login with Google below using that email."
        });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          // https://www.iana.org/assignments/jwt/jwt.xhtml list of predescribed
          // variables that can go into the payload; if the variable is not in
          // the list, you can still add it and it's available when decoded on
          // client side
          const payload = {
            id: user._id,
            name: user.name
          };

          const mongoDBUserId = user._id;
          // Sign token
          jwt.sign(
            payload,
            keys.cookieKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (error, token) => {
              response.json({
                success: true,
                token: "Bearer " + token,
                user: user
              });
            }
          );
        } else {
          return response.json({ password: "Incorrect Password" });
        }
      });
    });
  });

  app.post("/auth/register", async (request, response) => {
    const { registerErrors, isValidRegister } = validateRegisterInput(
      request.body
    );

    // Check validation
    if (!isValidRegister) {
      return response.json(registerErrors);
    }

    const lowerCaseEmail = request.body.email.toLowerCase();

    UserCollection.findOne({ email: lowerCaseEmail }).then(user => {
      if (user) {
        return response.json({ email: "Email already exists." });
      } else {
        const newUser = new UserCollection({
          email: lowerCaseEmail,
          password: request.body.password
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser
              .save()
              .then(user => response.send("success"))
              .catch(error => console.log(error));
          });
        });
      }
    });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (request, response) => {
      // after a user is logged in show them the profile page
      response.redirect("/profile");
    }
  );

  app.get("/auth/logout", (request, response) => {
    // logout of GoogleOauth
    // .logout() is attached to request by passport and kills the cookie
    request.logout();
    response.redirect("/");
  });
};
