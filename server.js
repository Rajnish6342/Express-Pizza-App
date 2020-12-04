const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const expresslayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const flash = require("express-flash");
const passport = require("passport");
const MongoDbStore = require("connect-mongo")(session);
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

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
//session config
let mongoStore = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 2000 * 60 * 60 * 24 },
  })
);
const passportInit = require("./app/config/passport");

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;

  next();
});

app.use(express.static("public"));
app.use(expresslayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Api Running On Port ${PORT}`);
});
