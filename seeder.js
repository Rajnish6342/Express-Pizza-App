const fs = require("fs");
const mongoose = require("mongoose");

// Load models
const Menu = require("./app/models/menu");

const url =
  "mongodb+srv://raj:Pakistan6342@cluster0.xcdn6.mongodb.net/pizzaapp?retryWrites=true&w=majority";
// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/pizza-menu.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Menu.create(bootcamps);

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Menu.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
