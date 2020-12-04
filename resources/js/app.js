import axios from "axios";
import Noty from "noty";
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cartCounter");

async function updateCart(pizza) {
  try {
    const res = await axios.post("/update-cart", pizza);
    cartCounter.innerText = res.data.totalQty;
    new Noty({
      type: "success",
      timeout: 1000,
      text: "Item Added",
    }).show();
  } catch (err) {
    new Noty({
      type: "warning",
      timeout: 1000,
      text: "Not Added",
    }).show();
  }
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}
