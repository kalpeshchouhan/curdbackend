const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const log = console.log;
const port = process.env.PORT || 7040;
const rout = require("./Router/studentrut");
require("dotenv").config();
const databaseurl = process.env.DATABASE;

const cors = require("cors");

const app = express();

// creating connection
mongoose.set("strictQuery", false);
let url = databaseurl;
mongoose.connect(
  url,
  () => {
    log("connected to db");
  },
  (e) => {
    log(e);
  }
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// middleware
app.use(bodyparser.json());
app.use(express.urlencoded({ extends: false }));
app.use(cors());
app.use("/student", rout);

app.listen(port, () => {
  log(`port is listing to: ${port}`);
});
