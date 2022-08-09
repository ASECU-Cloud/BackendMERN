const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keranjangSchema = new Schema(
  {
    target: {
      type: String,
      required: true,
    },
    items: [{ type: Object }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Keranjang", keranjangSchema);
