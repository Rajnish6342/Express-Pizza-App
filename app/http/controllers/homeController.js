const Menu = require("../../models/menu");
module.exports = function homeController() {
  return {
    async index(req, res) {
      const pizzas = await Menu.find();
      res.render("home", { pizzas });
      // Menu.find().then((pizzas) => {
      //   console.log(pizzas);
      //   res.render("home", { pizzas });
      // });
    },
  };
};
