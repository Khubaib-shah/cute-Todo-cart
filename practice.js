window.addEventListener("load", () => {
  console.log(localStorage.getItem("user"));
  if (!localStorage.getItem("user")) {
    window.location.replace("./pages/login.html");
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://realtime-database-f0288-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");

const shoppingList = document.getElementById("shopping-list");

var inputFieldEl = document.getElementById("input-field");
var addButtonEl = document.getElementById("add-button");
addButtonEl.addEventListener("click", () => {
  var inputValue = inputFieldEl.value;
  if (inputValue.length < 3) {
    alert("Enter correct value");
    return;
  }
  clearInputFieldEl();
  push(shoppingListInDB, inputValue);
});
onValue(shoppingListInDB, function (snapshot) {
  clearShoppingListEl();
  if (snapshot.exists()) {
    let shoppingArray = Object.entries(snapshot.val());
    for (var i = 0; i < shoppingArray.length; i++) {
      let currentItem = shoppingArray[i];
      AppendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingList.innerHTML = "NO item here... yet";
  }
});
function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function clearShoppingListEl() {
  shoppingList.innerHTML = "";
}
function AppendItemToShoppingListEl(itemValue) {
  let itemID = itemValue[0];
  let itemValues = itemValue[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValues;
  shoppingList.append(newEl);

  newEl.addEventListener("dblclick", function () {
    // console.log(itemID);
    let exactLocationOfID = ref(database, `ShoppingList/${itemID}`);
    remove(exactLocationOfID);
  });
}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.clear();
  window.location.replace("./Pages/login.html");
});

// +++++++++++++++++++++++++++++++++++================ practice area ==============++++++++++++++++++++++++++++++
// let user = {
//   1: "khubaib",
//   2: "khubaib2",
//   3: "khubaib3",
//   4: "khubaib4",
// };

// let usersValue = Object.values(user);
// console.log(usersValue);
// let usersids = Object.keys(user);
// console.log(usersids);
// let usersEntries = Object.entries(user);
// console.log(usersEntries);

// newEl.addEventListener("dblclick", function () {

//   let removeItemFromDatabase = ref(database, `shoppingList/${itemID}`);
//   console.log(remove(removeItemFromDatabase));
// });
