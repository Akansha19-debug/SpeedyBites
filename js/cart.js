/**
 * Cart functionality for the food delivery website
 */

// Initialize cart from localStorage or create empty cart
function initCart() {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  updateCartUI(cart);
  return cart;
}

// Add item to cart
function addToCart(item, quantity = 1) {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  
  // Check if item is already in cart
  const existingItemIndex = cart.items.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex > -1) {
    // Item exists, increase quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Item doesn't exist, add new item
    cart.items.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      quantity: quantity
    });
  }
  
  // Update cart totals
  updateCartTotals(cart);
  
  // Save to localStorage
  storeData('cart', cart);
  
  // Update UI
  updateCartUI(cart);
  
  return cart;
}

// Remove item from cart
function removeFromCart(itemId) {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  
  // Filter out the item to remove
  cart.items = cart.items.filter(item => item.id !== itemId);
  
  // Update cart totals
  updateCartTotals(cart);
  
  // Save to localStorage
  storeData('cart', cart);
  
  // Update UI
  updateCartUI(cart);
  
  return cart;
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, quantity) {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  
  // Find the item
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(itemId);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Update cart totals
    updateCartTotals(cart);
    
    // Save to localStorage
    storeData('cart', cart);
    
    // Update UI
    updateCartUI(cart);
  }
  
  return cart;
}

// Clear cart
function clearCart() {
  const emptyCart = { items: [], totalItems: 0, totalPrice: 0 };
  storeData('cart', emptyCart);
  updateCartUI(emptyCart);
  return emptyCart;
}

// Calculate cart totals
function updateCartTotals(cart) {
  cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return cart;
}

// Update cart UI
function updateCartUI(cart) {
  // Update cart count in header
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = cart.totalItems;
    
    // Add animation class and remove it after animation completes
    if (cart.totalItems > 0) {
      element.classList.add('pulse');
      setTimeout(() => {
        element.classList.remove('pulse');
      }, 300);
    }
  });
}

// Calculate order summary amounts
function calculateOrderSummary(cart) {
  const subtotal = cart.totalPrice;
  const deliveryFee = 40; // Fixed delivery fee
  const taxRate = 0.05; // 5% tax
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;
  
  return {
    subtotal,
    deliveryFee,
    tax,
    total
  };
}

// Get cart item by ID
function getCartItem(itemId) {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  return cart.items.find(item => item.id === itemId);
}

// Check if cart has items
function hasItems() {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  return cart.items.length > 0;
}

// Export cart functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    updateCartTotals,
    updateCartUI,
    calculateOrderSummary,
    getCartItem,
    hasItems
  };
}