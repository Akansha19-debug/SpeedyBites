/**
 * UI-related functions for the food delivery website
 */

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
}

// Toggle theme (light/dark)
function toggleTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const body = document.body;
  
  // Check for saved theme preference or use system preference
  let currentTheme = localStorage.getItem('theme');
  if (!currentTheme) {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Apply initial theme
  applyTheme(currentTheme);
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }
  
  // Apply the theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }
}

// Render food items to the grid
function renderFoodItems(items, container) {
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  if (items.length === 0) {
    document.getElementById('no-results').style.display = 'block';
    return;
  }
  
  document.getElementById('no-results').style.display = 'none';
  
  // Create and append food cards
  items.forEach(item => {
    const foodCard = createFoodCard(item);
    container.appendChild(foodCard);
  });
}

// Create a food card element
function createFoodCard(item) {
  const foodCard = document.createElement('div');
  foodCard.className = 'food-card';
  
  // Create badge for popular items
  if (item.popular) {
    const popularBadge = document.createElement('span');
    popularBadge.className = 'food-card-tag';
    popularBadge.textContent = 'Popular';
    foodCard.appendChild(popularBadge);
  }
  
  // Create veg/non-veg badge
  const vegBadge = document.createElement('span');
  vegBadge.className = item.isVeg ? 'veg-badge' : 'non-veg-badge';
  vegBadge.setAttribute('aria-label', item.isVeg ? 'Vegetarian' : 'Non-vegetarian');
  foodCard.appendChild(vegBadge);
  
  // Create image
  const foodImage = document.createElement('img');
  foodImage.className = 'food-card-image';
  foodImage.src = item.image;
  foodImage.alt = item.name;
  foodImage.loading = 'lazy';
  foodCard.appendChild(foodImage);
  
  // Create card body
  const cardBody = document.createElement('div');
  cardBody.className = 'food-card-body';
  
  // Create title
  const title = document.createElement('h3');
  title.className = 'food-card-title';
  title.textContent = item.name;
  cardBody.appendChild(title);
  
  // Create category
  const category = document.createElement('p');
  category.className = 'food-card-category';
  category.textContent = capitalizeFirstLetter(item.category);
  cardBody.appendChild(category);
  
  // Create description
  const desc = document.createElement('p');
  desc.className = 'food-card-desc';
  desc.textContent = truncateText(item.description, 80);
  cardBody.appendChild(desc);
  
  // Create price row
  const priceRow = document.createElement('div');
  priceRow.className = 'food-card-price-row';
  
  // Create price
  const price = document.createElement('span');
  price.className = 'food-card-price';
  price.textContent = formatPrice(item.price);
  priceRow.appendChild(price);
  
  // Create add to cart button
  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn-primary btn-sm';
  addBtn.textContent = 'Add to Cart';
  addBtn.addEventListener('click', () => {
    addToCart(item);
    showToast(`${item.name} added to cart`);
  });
  priceRow.appendChild(addBtn);
  
  cardBody.appendChild(priceRow);
  foodCard.appendChild(cardBody);
  
  return foodCard;
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Create toast notification element
function createToastNotification() {
  // Check if toast already exists
  if (document.getElementById('toast')) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = 'toast';
  
  const toastContent = document.createElement('div');
  toastContent.className = 'toast-content';
  
  const toastIcon = document.createElement('span');
  toastIcon.className = 'toast-icon';
  toastIcon.textContent = '✓';
  
  const toastMessage = document.createElement('span');
  toastMessage.className = 'toast-message';
  toastMessage.textContent = 'Item added to cart!';
  
  const toastClose = document.createElement('button');
  toastClose.className = 'toast-close';
  toastClose.textContent = '×';
  toastClose.setAttribute('aria-label', 'Close notification');
  
  toastContent.appendChild(toastIcon);
  toastContent.appendChild(toastMessage);
  toast.appendChild(toastContent);
  toast.appendChild(toastClose);
  
  document.body.appendChild(toast);
  
  // Add event listener to close button
  toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
  });
}

// Show loading spinner
function showLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'flex';
  }
}

// Hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}

// Show loading overlay (for checkout process)
function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('show');
  }
}

// Hide loading overlay
function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('show');
  }
}

// Update cart UI elements
function updateCartUI(cart) {
  const cartCount = document.querySelector('.cart-count');
  const cartTotal = document.querySelector('.cart-total');
  
  if (cartCount) {
    cartCount.textContent = cart.totalItems.toString();
    cartCount.style.display = cart.totalItems > 0 ? 'flex' : 'none';
  }
  
  if (cartTotal) {
    cartTotal.textContent = formatPrice(cart.totalPrice);
  }
}

// Initialize cart item count on page load
function initCartCount() {
  const cart = retrieveData('cart') || { items: [], totalItems: 0, totalPrice: 0 };
  updateCartUI(cart);
}

// Add common event listeners to the page
function setupCommonEvents() {
  // Initialize mobile menu toggle
  toggleMobileMenu();
  
  // Initialize theme toggle
  toggleTheme();
  
  // Initialize cart count
  initCartCount();
  
  // Create toast notification element
  createToastNotification();
  
  // Add event listener to toast close button
  const toastCloseBtn = document.querySelector('.toast-close');
  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', () => {
      document.getElementById('toast').classList.remove('show');
    });
  }
}

// Export UI functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleMobileMenu,
    toggleTheme,
    renderFoodItems,
    createFoodCard,
    capitalizeFirstLetter,
    createToastNotification,
    showLoadingSpinner,
    hideLoadingSpinner,
    showLoadingOverlay,
    hideLoadingOverlay,
    updateCartUI,
    initCartCount,
    setupCommonEvents
  };
}