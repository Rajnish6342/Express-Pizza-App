const axios = require("axios");
const User = require("./../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postlogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postregister(req, res) {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        req.flash("error", "All fields required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      await User.exists({ email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });
      let hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something Went Wrong");
          return res.redirect("/register");
        });
    },
    logout(req, res) {
      req.logout();
      res.redirect("/");
    },
  };
};
