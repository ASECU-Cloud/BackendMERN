require("dotenv").config();
const express = require("express");
const tokoRoutes = require("./routes/toko");
const loginRoutes = require("./routes/login");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log("Path   :", req.path);
  console.log("Method :", req.method);
  console.log("=======");
  next();
});

app.use("/testserver", (req, res, next) => {
  res.status(200).json({ Server: "server is up! :D" });
  next();
});

// routes
app.use("/user", loginRoutes);
app.use("/api/toko", tokoRoutes);

// connect DB
mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    console.log("\u001b[1;32mDatabase Connected !\u001b[0m");
    // listen
    app.listen(process.env.PORT || 80, () => {
      console.log(`Server Created     : http://localhost:${process.env.PORT}`);
      console.log("listening on port  :", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("\u001b[1;31mDatabase NOT Connected !\u001b[0m");
    console.error(err);
  });
