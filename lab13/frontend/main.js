async function fetchAllProducts() {
  // Get a reference to the book table body
  const bookTableBody = document.querySelector("tbody");
  bookTableBody.innerHTML = "";
  let products = [];

  // Fetch the list of products from the server and display them in the table
  await fetch("http://localhost:3001/products")
    .then((response) => response.json())
    .then((resProducts) => {
      products = resProducts;
      resProducts.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>
              <button type="button" class="btn btn-primary btn-sm mr-2 edit-btn" data-toggle="modal" data-target="#editModal" data-id="${product.id}">Edit</button>
              <button type="button" class="btn btn-danger btn-sm edit-btn" data-toggle="modal" data-target="#deleteModal" data-id="${product.id}">Delete</button>
            </td>
          `;
        bookTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}
// Wait for the DOM to finish loading
document.addEventListener("DOMContentLoaded", () => {
  fetchAllProducts();

  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const product = products.find((prod) => prod.id == productId);

      // Set the form's data-type attribute to 'edit'
      const addProductForm = document.querySelector("#add-product-form");
      addProductForm.setAttribute("data-type", "edit");

      // Populate the form with the details of the product
      document.querySelector("#title").value = product.title;
      document.querySelector("#description").value = product.description;
      document.querySelector("#price").value = product.price;
    });
  });
});

/* Click "Submit" button to add a new product with properties: title, description, price (id is auto generated) */
document.querySelector("#add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;
  const productData = { title, description, price };

  const formType = e.target.getAttribute("data-type");

  if (formType === "add") {
    console.log("it's an add");
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle response data as needed
      })
      .then(fetchAllProducts)
      .catch((error) => console.error(error));
  } else if (formType === "edit") {
    console.log("it's an edit");
    const productId = e.target.getAttribute("data-id");
    fetch(`http://localhost:3001/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle response data as needed
      })
      .then(fetchAllProducts)
      .catch((error) => console.error(error));
  }
});
