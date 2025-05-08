/**
 * JavaScript for the order confirmation page
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup common UI elements and events
  setupCommonEvents();
  
  // Get order data from localStorage
  const orderData = retrieveData('currentOrder');
  
  // If no order data, redirect to home
  if (!orderData) {
    window.location.href = 'index.html';
    return;
  }
  
  // Get elements
  const orderId = document.getElementById('order-id');
  const orderDatetime = document.getElementById('order-datetime');
  const estimatedDelivery = document.getElementById('estimated-delivery');
  const deliveryName = document.getElementById('delivery-name');
  const deliveryAddress = document.getElementById('delivery-address');
  const deliveryContact = document.getElementById('delivery-contact');
  const orderedItems = document.getElementById('ordered-items');
  const confirmationSubtotal = document.getElementById('confirmation-subtotal');
  const confirmationTax = document.getElementById('confirmation-tax');
  const confirmationTotal = document.getElementById('confirmation-total');
  
  // Generate random 4-digit order ID
  const randomOrderId = Math.floor(1000 + Math.random() * 9000);
  
  // Get current date and time
  const currentDate = new Date();
  
  // Generate random delivery time between 20-30 minutes
  const minDeliveryTime = 10;
  const maxDeliveryTime = 30;
  const randomDeliveryTime = Math.floor(Math.random() * (maxDeliveryTime - minDeliveryTime + 1)) + minDeliveryTime;
  
  // Calculate estimated delivery time
  const deliveryDate = new Date(currentDate.getTime() + randomDeliveryTime * 60000);
  
  // Fill order information
  if (orderId) orderId.textContent = `#${randomOrderId}`;
  if (orderDatetime) orderDatetime.textContent = formatDate(currentDate);
  if (estimatedDelivery) {
    estimatedDelivery.textContent = `${formatTime(currentDate)} - ${formatTime(deliveryDate)} (${randomDeliveryTime} mins)`;
  }
  
  // Fill delivery information from order data
  if (deliveryName) deliveryName.textContent = orderData.customer.name;
  if (deliveryAddress) deliveryAddress.textContent = orderData.customer.address;
  if (deliveryContact) {
    deliveryContact.textContent = `${orderData.customer.phone} | ${orderData.customer.email}`;
  }
  
  // Fill ordered items
  if (orderedItems) {
    renderOrderedItems(orderData.items, orderedItems);
  }
  
  // Fill price information
  if (confirmationSubtotal) confirmationSubtotal.textContent = formatPrice(orderData.totals.subtotal);
  if (confirmationTax) confirmationTax.textContent = formatPrice(orderData.totals.tax);
  if (confirmationTotal) confirmationTotal.textContent = formatPrice(orderData.totals.total);
  
  // Show countdown toast
  let countdown = 30;
  const countdownInterval = setInterval(() => {
    showToast(`Redirecting to homepage in ${countdown} seconds...`);
    countdown--;
    
    if (countdown < 0) {
      clearInterval(countdownInterval);
      window.location.href = 'index.html';
    }
  }, 1000);
  
  /**
   * Render ordered items in the container
   */
  function renderOrderedItems(items, container) {
    // Clear container
    container.innerHTML = '';
    
    // Add each item
    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'ordered-item';
      
      const itemInfo = document.createElement('div');
      itemInfo.className = 'ordered-item-info';
      
      const itemQty = document.createElement('span');
      itemQty.className = 'ordered-item-qty';
      itemQty.textContent = `${item.quantity}x`;
      itemInfo.appendChild(itemQty);
      
      const itemName = document.createElement('span');
      itemName.className = 'ordered-item-name';
      itemName.textContent = item.name;
      itemInfo.appendChild(itemName);
      
      itemElement.appendChild(itemInfo);
      
      const itemPrice = document.createElement('span');
      itemPrice.className = 'ordered-item-price';
      itemPrice.textContent = formatPrice(item.price * item.quantity);
      itemElement.appendChild(itemPrice);
      
      container.appendChild(itemElement);
    });
  }
  
  // Simulate order tracking
  simulateOrderTracking();
  
  /**
   * Simulate real-time order tracking by updating the status steps
   */
  function simulateOrderTracking() {
    const steps = document.querySelectorAll('.status-step');
    
    // Skip if no steps found
    if (!steps.length) return;
    
    // After 3 seconds, mark "Preparing" as completed and "On the Way" as current
    setTimeout(() => {
      steps[1].classList.add('completed');
      steps[1].classList.remove('current');
      steps[2].classList.add('current');
      
      // After another 3 seconds, mark "On the Way" as completed and "Delivered" as current
      setTimeout(() => {
        steps[2].classList.add('completed');
        steps[2].classList.remove('current');
        steps[3].classList.add('current');
      }, 3000);
    }, 3000);
  }
});