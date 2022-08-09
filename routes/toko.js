const express = require("express");
const {
  postKeranjang,
  getAll,
  // getSingle,
} = require("../controllers/keranjangController");
const router = express.Router();

// get all
router.get("/:target", getAll);

//
// router.get("/:id", getSingle);

router.post("/", postKeranjang);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mssg: "Delete handler" });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mssg: "Update handler", id });
});

module.exports = router;
