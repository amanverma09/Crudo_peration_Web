// Array to store products
let products = [];

// Select elements
const form = document.getElementById("product-form");
const tableBody = document.querySelector("table tbody");

// Add event listeners for buttons
form.addEventListener("submit", createProduct);
document.querySelector(".read-btn").addEventListener("click", readProducts);
document.querySelector(".update-btn").addEventListener("click", updateProduct);
document
  .querySelector(".delete-btn")
  .addEventListener("click", deleteAllProducts);

// Create product
function createProduct(e) {
  e.preventDefault();
  const inputs = form.querySelectorAll("input");
  const productName = inputs[0].value.trim();
  const seller = inputs[1].value.trim();
  const price = inputs[2].value.trim();

  if (productName && seller && price) {
    const product = {
      id: products.length + 1,
      name: productName,
      seller: seller,
      price: price,
    };
    products.push(product);
    form.reset();
    updateTable();
  }
}

// Read products
function readProducts() {
  updateTable();
}

// Update product
function updateProduct() {
  const productId = prompt("Enter the Product ID to update:");
  const product = products.find((p) => p.id === parseInt(productId));
  if (product) {
    const newName = prompt("Enter new Product Name:", product.name);
    const newSeller = prompt("Enter new Seller Name:", product.seller);
    const newPrice = prompt("Enter new Price:", product.price);

    if (newName && newSeller && newPrice) {
      product.name = newName;
      product.seller = newSeller;
      product.price = newPrice;
      updateTable();
    }
  } else {
    alert("Product not found!");
  }
}

// Delete all products
function deleteAllProducts() {
  if (confirm("Are you sure you want to delete all products?")) {
    products = [];
    updateTable();
  }
}

// Delete individual product
function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  updateTable();
}

// Update table
function updateTable() {
  tableBody.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.seller}</td>
            <td>${product.price}</td>
            <td><button onclick="editProduct(${product.id})">Edit</button></td>
            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
        `;
    tableBody.appendChild(row);
  });
}

// Edit product (called from the Edit button)
function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    const newName = prompt("Enter new Product Name:", product.name);
    const newSeller = prompt("Enter new Seller Name:", product.seller);
    const newPrice = prompt("Enter new Price:", product.price);

    if (newName && newSeller && newPrice) {
      product.name = newName;
      product.seller = newSeller;
      product.price = newPrice;
      updateTable();
    }
  } else {
    alert("Product not found!");
  }
}
