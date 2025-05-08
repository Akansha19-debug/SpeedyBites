/**
 * JavaScript for the checkout page
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup common UI elements and events
  setupCommonEvents();
  
  // Get order summary elements
  const orderItemsContainer = document.getElementById('order-items');
  const orderSubtotalElement = document.getElementById('order-subtotal');
  const orderTaxElement = document.getElementById('order-tax');
  const orderTotalElement = document.getElementById('order-total');
  const checkoutForm = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('place-order-btn');
  
  // Load cart data
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  
  // Check if cart is empty, redirect to home if empty
  if (cart.items.length === 0) {
    window.location.href = 'index.html';
    return;
  }
  
  // Calculate order summary
  const summary = calculateOrderSummary(cart);
  
  // Render order items
  renderOrderItems(cart.items);
  
  // Update summary amounts
  orderSubtotalElement.textContent = formatPrice(summary.subtotal);
  orderTaxElement.textContent = formatPrice(summary.tax);
  orderTotalElement.textContent = formatPrice(summary.total);
  
  // Add checkout form submission handler
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
  
  /**
   * Render the order items in the summary
   */
  function renderOrderItems(items) {
    if (!orderItemsContainer) return;
    
    // Clear container
    orderItemsContainer.innerHTML = '';
    
    // Add each order item
    items.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      
      const itemInfo = document.createElement('div');
      itemInfo.className = 'order-item-info';
      
      const itemQuantity = document.createElement('span');
      itemQuantity.className = 'order-item-quantity';
      itemQuantity.textContent = item.quantity;
      itemInfo.appendChild(itemQuantity);
      
      const itemName = document.createElement('span');
      itemName.textContent = item.name;
      itemInfo.appendChild(itemName);
      
      orderItem.appendChild(itemInfo);
      
      const itemPrice = document.createElement('span');
      itemPrice.textContent = formatPrice(item.price * item.quantity);
      orderItem.appendChild(itemPrice);
      
      orderItemsContainer.appendChild(orderItem);
    });
  }
  
  /**
   * Handle checkout form submission
   */
  function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    // Disable submit button to prevent multiple submissions
    placeOrderBtn.disabled = true;
    
    // Show loading overlay
    showLoadingOverlay();
    
    // Get form data
    const formData = new FormData(checkoutForm);
    
    // Validate form data
    const errors = validateForm(formData);
    
    // If there are validation errors
    if (Object.keys(errors).length > 0) {
      // Hide loading overlay
      hideLoadingOverlay();
      
      // Enable submit button
      placeOrderBtn.disabled = false;
      
      // Show error messages
      for (const [field, message] of Object.entries(errors)) {
        const inputElement = document.getElementById(field);
        if (inputElement) {
          inputElement.classList.add('error');
          
          // Find or create error message element
          let errorElement = document.getElementById(`${field}-error`);
          if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.id = `${field}-error`;
            errorElement.className = 'form-error';
            errorElement.style.color = 'var(--color-error-600)';
            inputElement.insertAdjacentElement('afterend', errorElement);
          }
          
          errorElement.textContent = message;
        }
      }
      
      return;
    }
    
    // Prepare order data
    const orderData = {
      id: generateOrderId(),
      date: new Date(),
      customer: {
        name: formData.get('fullname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: `${formData.get('address')}, ${formData.get('city')}, ${formData.get('pincode')}`,
        instructions: formData.get('instructions') || ''
      },
      items: cart.items,
      payment: {
        method: formData.get('payment'),
        status: 'pending'
      },
      totals: summary,
      status: 'confirmed',
      delivery: calculateDeliveryTime()
    };
    
    // Store order data in localStorage
    storeData('currentOrder', orderData);
    
    // Simulate server processing delay
    setTimeout(() => {
      // Clear the cart
      clearCart();
      
      // Redirect to confirmation page
      window.location.href = 'confirmation.html';
    }, 2000);
  }
});