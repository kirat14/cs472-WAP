const URI = 'http://localhost:3000'
let products = [];
let accessToken = sessionStorage.getItem('accessToken');

window.addEventListener('load', async function() {
    if (accessToken) {
        console.log(accessToken);
      const username = accessToken.split('-')[1];
      document.getElementById('username-label').innerText = username;
  
      setProductTable();
      setCartTable();
    } else {
      location.href = 'login.html';
    }
  });
  

document.getElementById('logout-button').onclick = logOut;

async function logOut() {
    sessionStorage.clear();
    products = [];
    accessToken = null;
    location.href = 'login.html';
}

async function checkAuthorization(status) {
    if (status == 401) {
        logOut();
    }
}

async function addCart(data) {
    const response = await fetch(`${URI}/shopping-carts`, {
        method: 'POST',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: data
    });

    await checkAuthorization(response.status);
    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        showAlert({ message: responseData.error });
    }
}

async function updateCart(id, data) {
    const response = await fetch(`${URI}/shopping-carts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        },
        body: JSON.stringify(data)
    });
    await checkAuthorization(response.status);
    const responseData = await response.json();
    if (!response.ok) {
        showAlert({ message: responseData.error });
    }
}

async function deleteCart(id) {
    const response = await fetch(`${URI}/shopping-carts/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: accessToken,
        },
    });
    await checkAuthorization(response.status);
    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        showAlert({ message: responseData.error })
    }
}

async function fetchCartList() {
    const response = await fetch(`${URI}/shopping-carts`, {
        method: 'GET',
        headers: {
            Authorization: accessToken,
        },
    });
    await checkAuthorization(response.status);
    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        showAlert({ message: responseData.error });
    }
}

async function fetchProductList() {
    const response = await fetch(`${URI}/products`, {
        method: 'GET',
        headers: {
            Authorization: accessToken,
        },
    });
await checkAuthorization(response.status);
    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        showAlert({ message: responseData.error });
    }
}

async function checkoutOrder() {
    const response = await fetch(`${URI}/shopping-carts/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    });
    await checkAuthorization(response.status);
    const responseData = await response.json();
    if (response.ok) {
        showAlert({ type: 'success', message: responseData.message });
        return response;
    } else {
        showAlert({ message: responseData.error });
    }
}

async function setProductTable() {
    const productsResponse = await fetchProductList();

    if (productsResponse && productsResponse?.length > 0) {
        let tableList = document.getElementById('product-body');
        tableList.innerHTML = '';
        products = productsResponse;

        productsResponse.forEach((product) => {
            let row = tableList.insertRow();

            let nameCol = document.createElement('td');
            nameCol.innerHTML = `${product.name}`;
            row.insertCell(0).appendChild(nameCol);

            let priceCol = document.createElement('td');
            priceCol.innerHTML = `${product.price}`;
            row.insertCell(1).appendChild(priceCol);

            let imgCol = document.createElement('td');
            imgCol.innerHTML = `<img src="${product.image}" alt="stock image" class="product-image">`;
            row.insertCell(1).appendChild(imgCol);

            let stockCol = document.createElement('td');
            stockCol.innerHTML = `${product.stock}`;
            row.insertCell(3).appendChild(stockCol);

            let btnCol = document.createElement('td');
            btnCol.innerHTML = `<button data-id="${product.id}" onclick="cartButton(this)" class="btn btn-success" title="Add to cart"><i class="bi bi-basket"></i> Add</button>`;
            row.insertCell(4).appendChild(btnCol);
        });
    }
}

async function setCartTable() {
    const carsResponse = await fetchCartList();

    if (carsResponse && carsResponse?.length > 0) {
        showShoppingCartTable(true);
        let html = '';
        let total = 0.0;
        carsResponse.forEach((cart) => {
            total = total + parseFloat(cart.total);
            html += getCartHtml(cart);
        })
        html += `
                <tr>
                    <td colspan="4"> <div id="total-count">Total : ${total.toFixed(2)}</div></td>
                </tr>
            `;
        document.getElementById('cart-body').innerHTML = html;
    }
}

function getCartHtml(cart) {
    return `
            <tr data-id="${cart.id}" data-pid="${cart.product.id}">
                <td>${cart.product.name}</td>
                <td>${cart.price}</td>
                <td>${cart.total}</td>
                <td class="w-25" ><button  onClick="onClickDecrease(this)" class="btn btn-outline-success">-</button> <span id="id-${cart.product.name}" class="input-group-text d-inline-block w-40 quantity-class" >${cart.quantity}</span><button onClick="onClickIncrease(this)"  class="btn btn-outline-success">+</button></td>
            </tr>
        `;
}

function showShoppingCartTable(show = true) {
    if (show) {
        document.getElementById('shopping-cart-table').style.display = 'block';
        document.getElementById('shopping-cart-message').style.display = 'none';
    } else {
        document.getElementById('shopping-cart-table').style.display = 'none';
        document.getElementById('shopping-cart-message').style.display = 'block';
    }
}

const showAlert = ({ type = 'danger', message, delay = 3000 }) => {
    const customAlert = document.getElementById('alert-custom');

    customAlert.className = `alert-custom alert alert-${type}`
    customAlert.innerText = message;

    setTimeout(() => { customAlert.className = 'alert-hide' }, delay);
}

document.getElementById('checkout-btn').onclick = async function (e) {
    const response = await checkoutOrder();
    if (response) {
        let parentCartBody = document.getElementById('cart-body');
        while (parentCartBody && parentCartBody?.firstChild) {
            parentCartBody.removeChild(parentCartBody.firstChild);
        }
        showShoppingCartTable(false);
        setProductTable();
    }
}

async function cartButton(element) {
    const pId = element.dataset.id;
    const cartProduct = products.find(product => product.id == pId);

    if (cartProduct.stock > 0) {
        const cartElement = document.getElementById('cart-body');
        let foundElement = null;
        if (cartElement && cartElement?.children?.length > 0) {
            const cartElementList = cartElement.children
            for (let cIndex = 0; cIndex < cartElementList.length; cIndex++) {
                if (!foundElement) {
                    const currElement = cartElementList.item(cIndex);
                    if (currElement.dataset.pid == pId) {
                        foundElement = currElement;
                    }
                }
            }
        }

        if (foundElement) {
            onClickIncrease(foundElement.lastElementChild.lastElementChild);
        } else {
            const formData = {};
            formData.productId = pId;
            formData.price = cartProduct.price;
            formData.quantity = 1;
            const responseData = await addCart(JSON.stringify(formData));
            if (responseData) {
                const previousTotal = document.getElementById('total-count')?.innerText?.split(':')?.[1]?.trim();
                document.getElementById('total-count')?.closest('tr')?.remove();

                let html = document.getElementById('cart-body')?.innerHTML || '';
                let tempTotal = parseFloat(responseData.total) + parseFloat(previousTotal || 0);

                html += getCartHtml(responseData);
                html += `
                        <tr>
                            <td colspan="4"> <div id="total-count">Total : ${tempTotal.toFixed(2)}</div></td>
                        </tr>
                    `;
                document.getElementById('cart-body').innerHTML = html;
                showShoppingCartTable(true);
            }
        }
    } else {
        showAlert({ type: 'warning', message: 'Out of stock!' });
    }
}

function onClickDecrease(element) {
    let inputElement = element.nextElementSibling;
    let inputValue = parseInt(inputElement.innerText);

    let parentElement = element.closest('tr');
    let updateId = parentElement.dataset.id;

    let confirmation = false;

    if (inputValue > 1) {
        inputElement.innerText = inputValue - 1;
        inputValue = inputValue - 1
        const formData = {};
        formData.quantity = inputValue;
        updateCart(updateId, formData);
    } else if (inputValue == 1) {
        const shouldRemove = confirm('Do you want to delete item from cart?');
        if (shouldRemove) {
            deleteCart(updateId).then(() => {
                showAlert({ type: 'success', message: 'Successfully removed from cart!' });
            }).catch((error) => {
                showAlert({ message: error.message });
            })
            element.closest('tr').remove();
        } else {
            inputElement.innerText = 1;
            inputValue = 1;
        }
    }

    let tempPrice = 0;

    if (parentElement.children.length > 0) {
        const priceNode = parentElement.children[1];
        const totalNode = parentElement.children[2];

        tempPrice = parseFloat(priceNode.innerText);

        const totalNew = (parseFloat(priceNode.innerText) * inputValue).toFixed(2);
        totalNode.innerText = totalNew;
    }

    const totalElement = document.getElementById('total-count');

    if (document.getElementById('cart-body').childElementCount == 1) {
        totalElement.closest('tr').remove()
        showShoppingCartTable(false)
    }

    const tempTotalCount = parseFloat(totalElement.innerText.split(':')[1].trim());

    totalElement.innerText = `Total:  ${(tempTotalCount - parseFloat(tempPrice.toFixed(2))).toFixed(2)}`;
}

function onClickIncrease(element) {
    let inputElement = element.previousElementSibling;
    let inputValue = parseInt(inputElement.innerText);

    let parentElement = element.closest('tr');
    let cartId = parentElement.dataset.id;
    let productId = parentElement.dataset.pid;

    const cartProduct = products.find(product => product.id == productId);

    if (inputValue < cartProduct.stock) {
        inputElement.innerText = inputValue + 1;
        inputValue = inputValue + 1;

        const formData = {};
        formData.quantity = inputValue;
        updateCart(cartId, formData);

        let prevDiff;

        if (parentElement.children.length > 0) {
            const priceNode = parentElement.children[1];
            const totalNode = parentElement.children[2];

            const totalNew = (parseFloat(priceNode.innerText) * inputValue).toFixed(2);

            prevDiff = totalNew - parseFloat(totalNode.innerText);
            totalNode.innerText = totalNew;
        }

        const totalElement = document.getElementById('total-count');
        const tempTotalCount = parseFloat(totalElement.innerText.split(':')[1].trim());

        showShoppingCartTable(true)
        totalElement.innerText = `Total:  ${(tempTotalCount + parseFloat(prevDiff.toFixed(2))).toFixed(2)}`;
    } else {
        showAlert({ type: 'warning', message: 'Reached maximum stock!' });
    }
}
