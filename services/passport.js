const passport = require("passport");

// Oauth login
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// regular email password login
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.cookieKey;

passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    UserCollection.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => console.log(err));
  })
);

// Oauth login
// serializeUser generates the user token which the user sends back to the
// server on every request
// passport automatically stuffs token into cookie
// userFromDB.id is really the mongoDBUserId
passport.serializeUser((userFromDB, done) => {
  done(null, userFromDB.id);
});

// user makes request; browser automatically sends cookie
// passport looks into request.session to pull the id out
// and turns it back into the user
passport.deserializeUser((id, done) => {
  UserCollection.findById(id).then(userFromDB => {
    done(null, userFromDB);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true
    },
    async (accessToken, refreshToken, googleProfile, done) => {
      const googleOauthUser = await UserCollection.findOne({
        googleId: googleProfile.id
      });

      const email = googleProfile.emails[0].value;
      const userFirstAndLastName = googleProfile.displayName.split(" ");

      // asynchronus
      if (googleOauthUser) {
        // existing user that signed up with GoogleOauth and is now logging in
        error = null;
        done(error, googleOauthUser);
      } else {
        // know that this user has not signed up with Google before,
        // but don't know if this is a completely new user
        // the user could have done a regular sign up before
        const previousUser = await UserCollection.findOne({
          email: email
        });

        if (previousUser) {
          // this user signed up with regular register, but is trying to login
          // with GoogleOauth, do not let them login
          done(null, previousUser);
        } else {
          // this is a completely new user
          const newUserFromDB = await new UserCollection({
            googleId: googleProfile.id,
            email: email,
            profile: {
              firstName: userFirstAndLastName[0],
              lastName: userFirstAndLastName[1]
            }
          }).save();
          done(null, newUserFromDB);
        }
      }
    }
  )
);
