module.exports = function cartController() {
  return {
    cart(req, res) {
      res.render("customers/cart");
    },
  };
};
