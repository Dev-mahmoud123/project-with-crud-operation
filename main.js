let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let btnSearchByTitle = document.getElementById("searchTitle");
let btnSearchBycategory = document.getElementById("searchCategory");
let table = document.querySelector("table");
let mood = "create";
let searchMood = "title";

// --------- Get Total Price------
function getTotalPrice() {
  if (price.value !== "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerText = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerText = "";
    total.style.backgroundColor = "red";
  }
}

//  --------- Create Products -------
let productsData;
let index;

if (localStorage.getItem("products") != null) {
  productsData = JSON.parse(localStorage.getItem("products"));
} else {
  productsData = [];
}

create.onclick = function () {
  // create object of product with its properties
  let newObject = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerText,
    count: count.value,
    category: category.value,
  };

  if (title.value != "" && price.value != "" && category.value != "" && newObject.count > 100) {
    if (mood === "create") {
      if (newObject.count > 1) {
        for (let i = 0; i < newObject.count; i++) {
          productsData.push(newObject);
        }
      } else {
        productsData.push(newObject);
      }
    } else {
      productsData[index] = newObject;
      getTotalPrice();
      count.style.display = "block";
      create.innerText = "create";
    }
    clearInputs();
  }

  //   Save data to local storage
  localStorage.setItem("products", JSON.stringify(productsData));
  getData();
};

// ----- clear inputs---
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerText = "";
}

// ------ Get Data -----\
function getData() {
  let table = "";
  for (let i = 0; i < productsData.length; i++) {
    table += `
       <tr>
       <td>${i + 1}</td>
       <td>${productsData[i].title}</td>
       <td>${productsData[i].price}</td>
       <td>${productsData[i].taxes}</td>
       <td>${productsData[i].ads}</td>
       <td>${productsData[i].discount}</td>
       <td>${productsData[i].total}</td>
       <td>${productsData[i].category}</td>
       <td><button onclick="updateProduct(${i})" id="updatePro">update</button></td>
       <td><button onclick="deleteProduct(${i})" id="deletePro">Delete</button></td>
   </tr>
       `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (productsData.length > 0) {
    document.getElementById("deleteAll").style.display = "block";
    document.getElementById(
      "delete"
    ).innerText = `Delete All (${productsData.length})`;
  } else {
    document.getElementById("deleteAll").style.display = "none";
  }
  getTotalPrice();
}
getData();
//  Delete Product ---
function deleteProduct(id) {
  productsData.splice(id, 1);
  localStorage.products = JSON.stringify(productsData);
  getData();
}

// ---- Delete All Data ----
function deleteAll() {
  localStorage.clear();
  productsData.splice(0);
  getData();
}

//  ------- Update Data ------
function updateProduct(id) {
  index = id;
  title.value = productsData[id].title;
  price.value = productsData[id].price;
  taxes.value = productsData[id].taxes;
  ads.value = productsData[id].ads;
  discount.value = productsData[id].discount;
  getTotalPrice();
  category.value = productsData[id].category;
  count.style.display = "none";
  create.innerText = "Update";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//  get search mood

function getSearchMood(id) {
  search.focus();
  if (id == "searchCategory") {
    searchMood = "category";
  } else {
    searchMood = "title";
  }
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  getData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < productsData.length; i++) {
    if (searchMood == "title") {
      if (productsData[i].title.includes(value.toLowerCase())) {
        table += `
             <tr>
             <td>${i + 1}</td>
             <td>${productsData[i].title}</td>
             <td>${productsData[i].price}</td>
             <td>${productsData[i].taxes}</td>
             <td>${productsData[i].ads}</td>
             <td>${productsData[i].discount}</td>
             <td>${productsData[i].total}</td>
             <td>${productsData[i].category}</td>
             <td><button onclick="updateProduct(${i})" id="updatePro">update</button></td>
             <td><button onclick="deleteProduct(${i})" id="deletePro">Delete</button></td>
         </tr>
             `;
      }
    } else {
      if (productsData[i].category.includes(value.toLowerCase())) {
        table += `
             <tr>
             <td>${i + 1}</td>
             <td>${productsData[i].title}</td>
             <td>${productsData[i].price}</td>
             <td>${productsData[i].taxes}</td>
             <td>${productsData[i].ads}</td>
             <td>${productsData[i].discount}</td>
             <td>${productsData[i].total}</td>
             <td>${productsData[i].category}</td>
             <td><button onclick="updateProduct(${i})" id="updatePro">update</button></td>
             <td><button onclick="deleteProduct(${i})" id="deletePro">Delete</button></td>
         </tr>
             `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
