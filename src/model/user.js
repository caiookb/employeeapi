const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

module.exports = mongoose.model("User", UserSchema);
