const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const expresslayouts = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;
const url =
  "mongodb+srv://raj:Pakistan6342@cluster0.xcdn6.mongodb.net/pizzaapp?retryWrites=true&w=majority";
mongoose.connect(
  url,
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
  () => {
    console.log("Mongoose Connected");
  }
);

app.use(express.static("public"));
app.use(expresslayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Api Running On Port ${PORT}`);
});
