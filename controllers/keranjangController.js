const Keranjang = require("../models/keranjang");
const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
// get all

const getAll = async (req, res) => {
  const { target } = req.params;
  console.log(target);
  const keranjang = await Keranjang.find({ target }).limit(3);
  res.status(200).json(keranjang);
};

// get single
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }

  const keranjang = await Keranjang.findById(id);

  if (!keranjang) {
    return res.status(404).json({ error: "no such items" });
  }

  res.status(200).json(keranjang);
};

// post items
const postKeranjang = async (req, res) => {
  let { authorization } = req.headers;
  const { items } = req.body;
  try {
    authorization = authorization.split(" ");
    console.log(authorization);

    const auth = Jwt.verify(authorization[1], process.env.SECRET);
    console.log(auth);
    const keranjang = await Keranjang.create({ target: auth._id, items });
    res.status(200).json(keranjang);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// delete items

// update items

module.exports = {
  postKeranjang,
  getAll,
  getSingle,
};
