const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");

require("./services/passport");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(error => console.log(error));

// gives deprecation warning if not included: mongoose findOneAndUpdate uses
// mongoDB's findOneAndUpdate rather than mongoDB's findAndModify
mongoose.set("useFindAndModify", false);

const app = express();
const server = require("http").createServer(app);

// heroku dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

// wiring middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// extracts cookie data and deencrpts the data inside
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // encrypts the cookie (can provide multiple cookieKeys and then cookieSession randomly picks one)
  })
);

// pulls user id out of cookie data and turn into user through deserializeUser
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like our main.js or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
