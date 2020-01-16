const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: String,
    email: String,
    password: String,
    profile: {
      firstName: String,
      lastName: String,
      age: Number,
      gender: String
    }
  },
  {
    // allows for request.user.save()
    usePushEach: true
  }
);

mongoose.model("users", userSchema);
