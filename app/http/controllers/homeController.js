module.exports = function homeController() {
  return {
    index(req, res) {
      res.render("home");
    },
  };
};
