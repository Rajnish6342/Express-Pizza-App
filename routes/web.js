const homeController = require("./../app/http/controllers/homeController");
const authController = require("./../app/http/controllers/authController");
const cartController = require("./../app/http/controllers/customers/cartController");
const guest = require("../app/middlewares/guest");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postlogin);
  app.post("/logout", authController().logout);

  app.get("/register", guest, authController().register);
  app.post("/register", authController().postregister);

  app.get("/cart", cartController().cart);
  app.post("/update-cart", cartController().add);
}

module.exports = initRoutes;
