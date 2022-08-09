const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Static Login

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All field Must be filled");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("User not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw Error("Login failed!!!");
  }

  return user;
};

// static Register
userSchema.statics.register = async function (
  username,
  password,
  phone,
  address,
  name
) {
  if (!username || !password || !phone || !address || !name) {
    throw Error("All fields must be filled!");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already taken");
  }

  const salt = await bcrypt.genSalt(5);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
    name,
    phone,
    address,
  });
  return user;
};

module.exports = mongoose.model("User", userSchema);
