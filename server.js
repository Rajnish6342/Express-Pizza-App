const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const expresslayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 3000;
const url =
  'mongodb+srv://raj:Pakistan6342@cluster0.xcdn6.mongodb.net/pizzaapp?retryWrites=true&w=majority';
mongoose.connect(
  url,
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
  () => {
    console.log('Mongoose Connected');
  }
);

app.use(flash());

dotenv.config();

app.use(express.json());

//session config
let mongoStore = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
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

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.static('public'));
app.use(expresslayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT, () => {
  console.log(`Api Running On Port ${PORT}`);
});
