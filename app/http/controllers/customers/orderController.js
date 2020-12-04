const Order = require("../../../models/order");
const moment = require("moment");
function orderController() {
  return {
    store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields required");
        return res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          delete req.session.cart;
          req.flash("success", "Orer has been placed");
          return res.redirect("/customers/orders");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Something Went Wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      console.log(orders);
      //   res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);
      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order });
      }
      return res.redirect("/");
    },
  };
}
module.exports = orderController;
