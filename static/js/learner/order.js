// FUNCTIONS TO RETRIEVE CART DATA

// Function to extract learner ID from the URL
function getLearnerIdFromUrl() {
  const url = window.location.href; // Gets the full URL
  const parts = url.split("/"); // Splits the URL by '/'
  const learnerId = parts[parts.length - 1].split("?")[0]; // Gets the last part of the URL (excluding query params)
  return learnerId;
}

const learnerId = getLearnerIdFromUrl(); // Call the function to retrieve learnerId
console.log(learnerId); // Debug log

// Step 2: Retrieve cart data from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Step 2.1: Function to display cart items
function displayCartItems() {
  const cartItemList = document.getElementById("cart-item-list");
  const cartSummary = document.getElementById("cart-summary");

  // Clear the existing HTML
  cartItemList.innerHTML = "";
  cartSummary.innerHTML = "";

  // Check if cart is empty
  if (cart.length === 0) {
    cartItemList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  // Loop through the cart items and create HTML for each item
  cart.forEach((course, index) => {
    total += parseFloat(course.price);

    const cartItemHTML = `
      <div class="cart-item">
        <img src="${course.thumbnail}" alt="${course.title}" class="course-thumbnail" />
        <div class="item-details">
          <h3>${course.title}</h3>
          <p>Instructor: ${course.instructor}</p>
          <p>Category: ${course.category}</p>
          <p class="price">$${course.price}</p>
        </div>
        <div class="item-actions">
          <button class="button remove-button" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartItemList.innerHTML += cartItemHTML;
  });

  // Update the summary
  const summaryHTML = `
    <p>Subtotal: <span>$${total.toFixed(2)}</span></p>
    <p>Shipping: <span>Free</span></p>
    <p>Total: <span>$${total.toFixed(2)}</span></p>
  `;
  cartSummary.innerHTML = summaryHTML;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item from the cart array
  localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
  displayCartItems(); // Re-render the cart items
}

// Function to get query params from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    courseId: params.get("courseId"),
    instructorId: params.get("instructorId"),
    courseName: params.get("courseName"),
    price: params.get("price"),
    imgUrl: params.get("courseImg"),
  };
}

// Function to format price
function formatPrice(price) {
  let formattedPrice = price.toLocaleString("vi-VN");
  if (Number.isInteger(parseFloat(price))) {
    formattedPrice += ".000 vnđ";
  }
  return formattedPrice;
}

// Function to load checkout data
function loadCheckoutData() {
  const { courseName, price, imgUrl, courseId } = getQueryParams();
  const formattedPrice = formatPrice(parseFloat(price));

  // Update the summary section
  document.getElementById("summary").innerHTML = `
    <h2 class="text-xl font-bold mb-6">Summary</h2>
    <div class="flex justify-between mb-4">
      <span class="text-gray-700 text-lg">Original Price:</span>
      <span class="font-medium text-lg text-gray-700">${formattedPrice} đ</span>
    </div>
    <div class="flex justify-between mb-6">
      <span class="text-lg font-semibold text-gray-700">Total:</span>
      <span class="text-lg font-semibold text-gray-700">${formattedPrice} đ</span>
    </div>
    <p class="text-sm text-gray-500 mb-6">By completing your purchase, you agree to these <a href="#" class="text-blue-600 underline">Terms of Service</a>.</p>
    <button id="completeCheckoutBtn" class="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
      Complete Checkout
    </button>
    <p class="text-center text-sm text-gray-500 mt-4">30-Day Money-Back Guarantee</p>
  `;
}

// Function to handle checkout
async function handleCheckout() {
  const { courseId, instructorId } = getQueryParams();
  const price = parseFloat(
    new URLSearchParams(window.location.search).get("price")
  );

  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  );
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  const transactionData = {
    learnerId,
    courseId,
    instructorId,
    amount: price,
    transactionDate: new Date().toISOString(),
    paymentMethod: paymentMethod.value,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Checkout successful! ${data.message}`);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    alert("Checkout failed. Please try again.");
  }
}

// Display the cart items and load checkout data on page load
window.onload = function () {
  displayCartItems();
  loadCheckoutData();

  // Add event listener for the checkout button
  const completeCheckoutBtn = document.getElementById("completeCheckoutBtn");
  if (completeCheckoutBtn) {
    completeCheckoutBtn.addEventListener("click", handleCheckout);
  }
};

//PAYMENT FUNCTIONS

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    courseId: params.get("courseId"),
    instructorId: params.get("instructorId"),
    courseName: params.get("courseName"),
    price: params.get("price"),
    imgUrl: params.get("courseImg"),
  };
}

function formatPrice(price) {
  let formattedPrice = price.toLocaleString("vi-VN");
  if (Number.isInteger(parseFloat(price))) {
    formattedPrice += ".000 vnđ";
  }
  return formattedPrice;
}

function loadCheckoutData() {
  const { courseName, price, imgUrl, courseId } = getQueryParams();
  const formattedPrice = formatPrice(parseFloat(price));

  //  add this <div id="order-details"></div>
  //   document.getElementById("order-details").innerHTML = `
  //     <h2 class="text-2xl font-semibold mb-4">Order Details</h2>
  //     <div class="flex justify-between items-center">
  //       <div class="flex items-center">
  //         <img class="h-10 w-10 rounded-md" src="${imgUrl}" alt="Course Thumbnail">
  //         <div class="ml-4">
  //           <h3 class="text-lg font-semibold">${courseName}</h3>
  //         </div>
  //       </div>
  //       <span class="text-lg">${formattedPrice}</span>
  //     </div>
  //   `;

  document.getElementById("summary").innerHTML = `
    <h2 class="text-xl font-bold mb-6">Summary</h2>
    <div class="flex justify-between mb-4">
      <span class="text-gray-700 text-lg">Original Price:</span>
      <span class="font-medium text-lg text-gray-700">${formattedPrice} đ</span>
    </div>
    <div class="flex justify-between mb-6">
      <span class="text-lg font-semibold text-gray-700">Total:</span>
      <span class="text-lg font-semibold text-gray-700">${formattedPrice} đ</span>
    </div>
    <p class="text-sm text-gray-500 mb-6">By completing your purchase, you agree to these <a href="#" class="text-blue-600 underline">Terms of Service</a>.</p>
    <button id="completeCheckoutBtn" class="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
      Complete Checkout
    </button>
    <p class="text-center text-sm text-gray-500 mt-4">30-Day Money-Back Guarantee</p>
  `;
}

async function handleCheckout() {
  const { courseId, instructorId } = getQueryParams();
  const price = parseFloat(
    new URLSearchParams(window.location.search).get("price")
  );

  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  );
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  const transactionData = {
    learnerId,
    courseId,
    instructorId,
    amount: price,
    transactionDate: new Date().toISOString(),
    paymentMethod: paymentMethod.value, // Ensure this is a string
  };

  try {
    const response = await fetch(`${apiBaseUrl}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      // Log response body for debugging
      const errorText = await response.text();
      console.error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Checkout successful! ${data.message}`);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    alert("Checkout failed. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCheckoutData();
  document
    .getElementById("completeCheckoutBtn")
    .addEventListener("click", handleCheckout);
});
