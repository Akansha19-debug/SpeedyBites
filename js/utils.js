/**
 * Utility functions for the food delivery website
 */

// Format price as currency
function formatPrice(price) {
  return '₹' + price.toFixed(2);
}

// Truncate text to a specific length with ellipsis
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate a random order ID
function generateOrderId() {
  const prefix = 'SB';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

// Calculate delivery time (between 30-45 minutes from now)
function calculateDeliveryTime() {
  const now = new Date();
  const minDeliveryTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
  const maxDeliveryTime = new Date(now.getTime() + 45 * 60000); // 45 minutes
  
  return {
    min: formatTime(minDeliveryTime),
    max: formatTime(maxDeliveryTime)
  };
}

// Format time as HH:MM AM/PM
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${formattedMinutes} ${ampm}`;
}

// Format date as Day, Month Date, Year
function formatDate(date) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Debounce function to limit how often a function can be called
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (10 digits)
function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

// Validate form fields
function validateForm(formData) {
  const errors = {};
  
  // Check required fields
  for (const [key, value] of formData.entries()) {
    if (!value && key !== 'instructions') { // Instructions are optional
      errors[key] = 'This field is required';
    }
  }
  
  // Check email format
  if (formData.get('email') && !isValidEmail(formData.get('email'))) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Check phone format
  if (formData.get('phone') && !isValidPhone(formData.get('phone'))) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  
  return errors;
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  
  // Set message
  toastMessage.textContent = message;
  
  // Set toast color based on type
  toast.style.backgroundColor = type === 'success' 
    ? 'var(--color-success-500)' 
    : type === 'error' 
      ? 'var(--color-error-600)' 
      : 'var(--color-primary-500)';
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Store data in localStorage
function storeData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve data from localStorage
function retrieveData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Export utility functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPrice,
    truncateText,
    generateOrderId,
    calculateDeliveryTime,
    formatTime,
    formatDate,
    debounce,
    getQueryParam,
    isValidEmail,
    isValidPhone,
    validateForm,
    showToast,
    storeData,
    retrieveData
  };
}