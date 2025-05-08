/**
 * JavaScript for the cart page
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup common UI elements and events
  setupCommonEvents();
  
  // Get cart container elements
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyContainer = document.getElementById('cart-empty');
  const cartSummaryContainer = document.getElementById('cart-summary');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  const cartTaxElement = document.getElementById('cart-tax');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Load cart data
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  
  // Calculate order summary
  const summary = calculateOrderSummary(cart);
  
  // Update UI based on cart contents
  updateCartPage(cart, summary);
  
  /**
   * Update the cart page UI with current cart data
   */
  function updateCartPage(cart, summary) {
    // Show/hide appropriate containers based on cart status
    if (cart.items.length === 0) {
      // Cart is empty
      cartEmptyContainer.style.display = 'block';
      cartItemsContainer.style.display = 'none';
      cartSummaryContainer.style.display = 'none';
    } else {
      // Cart has items
      cartEmptyContainer.style.display = 'none';
      cartItemsContainer.style.display = 'block';
      cartSummaryContainer.style.display = 'block';
      
      // Render cart items
      renderCartItems(cart);
      
      // Update summary amounts
      cartSubtotalElement.textContent = formatPrice(summary.subtotal);
      cartTaxElement.textContent = formatPrice(summary.tax);
      cartTotalElement.textContent = formatPrice(summary.total);
      
      // Enable/disable checkout button
      checkoutBtn.disabled = cart.items.length === 0;
    }
  }
  
  /**
   * Render the cart items in the container
   */
  function renderCartItems(cart) {
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Add each cart item
    cart.items.forEach(item => {
      const cartItemElement = createCartItemElement(item);
      cartItemsContainer.appendChild(cartItemElement);
    });
  }
  
  /**
   * Create a cart item element
   */
  function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    // Create item image
    const itemImage = document.createElement('img');
    itemImage.className = 'cart-item-image';
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemImage.loading = 'lazy';
    cartItem.appendChild(itemImage);
    
    // Create item info container
    const itemInfo = document.createElement('div');
    itemInfo.className = 'cart-item-info';
    
    // Create item name with veg/non-veg indicator
    const itemName = document.createElement('h3');
    itemName.className = 'cart-item-name';
    
    const vegIndicator = document.createElement('span');
    vegIndicator.className = item.isVeg ? 'veg-indicator' : 'non-veg-indicator';
    vegIndicator.setAttribute('aria-label', item.isVeg ? 'Vegetarian' : 'Non-vegetarian');
    
    itemName.appendChild(vegIndicator);
    itemName.appendChild(document.createTextNode(item.name));
    itemInfo.appendChild(itemName);
    
    // Create item price
    const itemPrice = document.createElement('p');
    itemPrice.className = 'cart-item-price';
    itemPrice.textContent = formatPrice(item.price);
    itemInfo.appendChild(itemPrice);
    
    cartItem.appendChild(itemInfo);
    
    // Create item controls
    const itemControls = document.createElement('div');
    itemControls.className = 'cart-item-controls';
    
    // Create quantity control
    const quantityControl = document.createElement('div');
    quantityControl.className = 'quantity-control';
    
    // Decrease button
    const decreaseBtn = document.createElement('button');
    decreaseBtn.className = 'quantity-btn';
    decreaseBtn.textContent = '-';
    decreaseBtn.setAttribute('aria-label', 'Decrease quantity');
    decreaseBtn.addEventListener('click', () => {
      updateCartItemQuantity(item.id, item.quantity - 1);
      
      // Refresh the page if item was removed
      const updatedCart = retrieveData('cart');
      const updatedSummary = calculateOrderSummary(updatedCart);
      updateCartPage(updatedCart, updatedSummary);
    });
    quantityControl.appendChild(decreaseBtn);
    
    // Quantity input
    const quantityInput = document.createElement('input');
    quantityInput.className = 'quantity-input';
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = item.quantity;
    quantityInput.setAttribute('aria-label', 'Item quantity');
    quantityInput.addEventListener('change', () => {
      const newQuantity = parseInt(quantityInput.value) || 1;
      quantityInput.value = newQuantity;
      updateCartItemQuantity(item.id, newQuantity);
      
      // Refresh the page
      const updatedCart = retrieveData('cart');
      const updatedSummary = calculateOrderSummary(updatedCart);
      updateCartPage(updatedCart, updatedSummary);
    });
    quantityControl.appendChild(quantityInput);
    
    // Increase button
    const increaseBtn = document.createElement('button');
    increaseBtn.className = 'quantity-btn';
    increaseBtn.textContent = '+';
    increaseBtn.setAttribute('aria-label', 'Increase quantity');
    increaseBtn.addEventListener('click', () => {
      updateCartItemQuantity(item.id, item.quantity + 1);
      
      // Refresh the page
      const updatedCart = retrieveData('cart');
      const updatedSummary = calculateOrderSummary(updatedCart);
      updateCartPage(updatedCart, updatedSummary);
    });
    quantityControl.appendChild(increaseBtn);
    
    itemControls.appendChild(quantityControl);
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-secondary btn-sm';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeFromCart(item.id);
      
      // Refresh the page
      const updatedCart = retrieveData('cart');
      const updatedSummary = calculateOrderSummary(updatedCart);
      updateCartPage(updatedCart, updatedSummary);
    });
    itemControls.appendChild(removeBtn);
    
    cartItem.appendChild(itemControls);
    
    return cartItem;
  }
});