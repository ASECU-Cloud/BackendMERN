const User = require("../models/user");
const Jwt = require("jsonwebtoken");

const initToken = (_id) => {
  return Jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30m" });
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = initToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // const { authorization } = req.headers;
  // const { test } = req.body;
  // console.log(req.headers);
  // res.status(200).json({ msg: authorization, test });
  // // res.status(200).json({ msg: "Hello" });
};

// register
const register = async (req, res) => {
  const { username, password, phone, address, name } = req.body;

  try {
    const user = await User.register(username, password, phone, address, name);
    const token = initToken(user._id);
    res.status(200).json({ username, phone, address, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
