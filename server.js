const express = require("express");
const app = express();
const ejs = require("ejs");
const expresslayouts = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.use(expresslayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Api Running On Port ${PORT}`);
});
