let cart = [];

// Function to add product to the cart (prices in rupees)
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        const product = { name: productName, price: parseFloat(productPrice), quantity: 1 };
        cart.push(product);
    }

    // Show the popup
    showPopup(`${productName} added to Cart!`);

    // Update the cart display
    updateCartDisplay();
}

// Function to remove a product from the cart
function removeFromCart(index) {
    if (index > -1 && index < cart.length) {
        cart.splice(index, 1);  // Remove the product at the given index
        updateCartDisplay();  // Refresh the cart display after removal
        showPopup("Item removed from Cart."); // Show a popup confirmation
    }
}

// Function to update the cart display in the modal
function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-items');
    cartDisplay.innerHTML = '';

    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>Your Cart is empty</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            <input type="number" value="${item.quantity}" min="0" step="0.5" onchange="updateQuantity(${index}, this.value)" />
        `;
        cartDisplay.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = `Total: ₹${total.toFixed(2)}`;
}


// Function to update the quantity of a product
function updateQuantity(index, newQuantity) {
    // Convert the newQuantity to a float and check if it's a valid number greater than 0
    const quantity = parseFloat(newQuantity);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity (greater than 0).');
        return; // Stop if quantity is not valid
    }
    cart[index].quantity = quantity;
    updateCartDisplay(); // Refresh the cart display after updating the quantity
}


// Function to open the cart modal
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    updateCartDisplay();
}

// Function to close the cart modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Function to place an order
// Opens the order form modal when the user clicks "Proceed to Order"
function placeOrder() {
    if (cart.length === 0) {
        alert("Your Cart is empty. Please add some items to proceed.");
        return; // Stop further execution
    }

    // Hide the cart modal and show the order form modal if the cart is not empty
    document.getElementById('cart-modal').style.display = 'none';  
    document.getElementById('order-form-modal').style.display = 'block';  
}

// Function to handle order submission (can be extended to do more)
function submitOrder() {
    if (cart.length === 0) {
        alert("Your Cart is empty. Please add items before placing an order.");
        return; // Stop further execution
    }

    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;

    // Validate the phone number (10 digits for Indian numbers)
    const phonePattern = /^[6-9]\d{9}$/;  // Regular expression for Indian mobile numbers
    if (!phonePattern.test(customerPhone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Check if all the necessary customer details are filled out
    if (!customerName || !customerPhone || !customerAddress) {
        alert('Please fill in all the details to place the order.');
        return;
    }

    // Show the custom confirmation modal with customer name
    document.getElementById('confirmation-text').textContent = `Thank you ${customerName}, your order has been placed Successfully!`;
    document.getElementById('confirmation-modal').style.display = 'block';
    
    // Reset cart and form after placing the order
    cart = [];  // Clear the cart
    updateCartDisplay();  // Update the cart UI
    closeOrderForm();  // Close the order form modal
    document.getElementById('order-form').reset();  // Reset the order form
}

function closeOrderForm() {
    document.getElementById('order-form-modal').style.display = 'none';
}

// Function to close the confirmation modal
function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}


// Function to show the popup
function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    popupText.textContent = message; // Set the popup message
    popup.classList.remove('hidden'); // Show the popup
    popup.classList.add('show');

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}
