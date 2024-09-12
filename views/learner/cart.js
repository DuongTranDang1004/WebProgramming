// Sample cart items (you can fetch these from an API or local storage)
const cartItems = [
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 2, image: 'https://via.placeholder.com/100' }
  ];
  
  // Load the cart items into the page
  function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemsCount = document.getElementById('cart-items-count');
    const summaryItemsCount = document.getElementById('summary-items-count');
    const summarySubtotal = document.getElementById('summary-subtotal');
  
    let totalItems = 0;
    let subtotal = 0;
  
    cartItemsContainer.innerHTML = ''; // Clear previous content
  
    cartItems.forEach((item) => {
      totalItems += item.quantity;
      subtotal += item.price * item.quantity;
  
      const cartItemHTML = `
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div class="flex w-2/5"> 
            <div class="w-20">
              <img class="h-24" src="${item.image}" alt="${item.name}">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">${item.name}</span>
              <button onclick="removeItem(${item.id})" class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <button onclick="changeQuantity(${item.id}, -1)" class="text-gray-500">-</button>
            <input class="mx-2 border text-center w-8" type="text" value="${item.quantity}" disabled />
            <button onclick="changeQuantity(${item.id}, 1)" class="text-gray-500">+</button>
          </div>
          <span class="text-center w-1/5 font-semibold text-sm">$${item.price.toFixed(2)}</span>
          <span class="text-center w-1/5 font-semibold text-sm">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `;
  
      cartItemsContainer.innerHTML += cartItemHTML;
    });
  
    cartItemsCount.innerText = `${totalItems} Items`;
    summaryItemsCount.innerText = totalItems;
    summarySubtotal.innerText = `$${subtotal.toFixed(2)}`;
  }
  
  // Change item quantity
  function changeQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        item.quantity = 1;
      }
      loadCartItems(); // Re-render the cart
    }
  }
  
  // Remove item from cart
  function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1); // Remove the item
      loadCartItems(); // Re-render the cart
    }
  }
  
  // Initial load
  document.addEventListener('DOMContentLoaded', loadCartItems);
  