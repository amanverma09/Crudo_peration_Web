const apiEndpoint = "http://localhost:3000/Electronics";

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
async function createProduct(e) {
  e.preventDefault();
  const inputs = form.querySelectorAll("input");
  const product = {
    name: inputs[0].value.trim(),
    img: inputs[1].value.trim(),
    seller: inputs[2].value.trim(),
    price: inputs[3].value.trim(),
  };
  let jsonstr = JSON.stringify(product);
  console.log(product);
  let options = {
    method: "POST",
    body: jsonstr,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);
    if (response.status !== 201) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      form.reset();
    }
    readProducts(); // Refresh the table
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// Read products
async function readProducts() {
  try {
    const response = await fetch(apiEndpoint);
    const products = await response.json();
    tableBody.innerHTML = "";
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.id}</td>
                <td style="color: red; font-weight: bolder" >${product.name}</td>
                <td><img src="${product.img}" width="100" alt="Product 1"></td>
                <td style="color: blue; font-weight: bolder">${product.seller}</td>
                <td>${product.price}</td>
                <td><button id="js_ebtn" onclick="editProduct(${product.id})">Edit</button></td>
                <td><button id="js_btn" onclick="deleteProduct(${product.id})">Delete</button></td>
            `;
      tableBody.appendChild(row);
    });
    // updateTable(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Update product
async function updateProduct() {
  const productId = prompt("Enter the Product ID to update:");
  if (!productId) return;

  try {
    const response = await fetch(`${apiEndpoint}/${productId}`);
    const product = await response.json();
    if (product) {
      const updatedProduct = {
        ...product,
        name: prompt("Enter new Product Name:", product.name) || product.name,
        img: prompt("Enter new Image URL:", product.img) || product.img,
        seller:
          prompt("Enter new Seller Name:", product.seller) || product.seller,
        price: prompt("Enter new Price:", product.price) || product.price,
      };

      await fetch(`${apiEndpoint}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      readProducts(); // Refresh the table
    } else {
      alert("Product not found!");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

// Delete all products
async function deleteAllProducts() {
  if (confirm("Are you sure you want to delete all products?")) {
    try {
      await fetch(apiEndpoint, { method: "DELETE" });
      readProducts(); 
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  }
}

// Delete individual product
async function deleteProduct(id) {
  console.log(id);
  let str = String(id);
  try {
    let confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      await fetch(`${apiEndpoint}/${str}`, { method: "DELETE" });
      readProducts(); 
    } else {
      readProducts();
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

// Update table
function updateTable(products) {
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.id}</td>
            <td style="color: blue; font-weight: bolder">${product.name}</td>
            <td>${product.img}</td>
            <td>${product.seller}</td>
            <td>${product.price}</td>
            <td><button onclick="editProduct(${product.id})">Edit</button></td>
            <td><button onclick="deleteProduct('${product.id}')">Delete</button></td>
        `;
    tableBody.appendChild(row);
  });
}

// Edit product (called from the Edit button)
function editProduct(id) {
  updateProduct(id);
  console.log(id);
}
