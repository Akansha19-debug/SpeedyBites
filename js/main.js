/**
 * Main JavaScript file for the food delivery website homepage
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup common UI elements and events
  setupCommonEvents();
  
  // Get the food items container
  const foodGrid = document.getElementById('food-grid');
  
  // Elements for filtering and sorting
  const searchInput = document.getElementById('search-input');
  const categoryButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  
  // Track current filter state
  let currentFilters = {
    search: '',
    category: 'all',
    sortBy: 'default'
  };
  
  // Show loading spinner
  showLoadingSpinner();
  
  // Simulate loading delay (in a real app, this would be an API call)
  setTimeout(() => {
    // Initialize food items display
    filterAndDisplayFoodItems();
    
    // Hide loading spinner
    hideLoadingSpinner();
  }, 500);
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      currentFilters.search = searchInput.value.toLowerCase().trim();
      filterAndDisplayFoodItems();
    }, 300));
  }
  
  // Category filter functionality
  if (categoryButtons) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current category filter
        currentFilters.category = button.getAttribute('data-category');
        
        // Apply filters
        filterAndDisplayFoodItems();
      });
    });
  }
  
  // Sort functionality
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentFilters.sortBy = sortSelect.value;
      filterAndDisplayFoodItems();
    });
  }
  
  // Filter and sort food items based on current filters
  function filterAndDisplayFoodItems() {
    // Show loading spinner
    showLoadingSpinner();
    
    // Filter items
    let filteredItems = [...foodItems];
    
    // Apply category filter
    if (currentFilters.category !== 'all') {
      filteredItems = filteredItems.filter(item => {
        if (currentFilters.category === 'veg') return item.isVeg;
        if (currentFilters.category === 'non-veg') return !item.isVeg;
        return item.category === currentFilters.category;
      });
    }
    
    // Apply search filter
    if (currentFilters.search !== '') {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(currentFilters.search) || 
        item.description.toLowerCase().includes(currentFilters.search) ||
        item.category.toLowerCase().includes(currentFilters.search) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(currentFilters.search)))
      );
    }
    
    // Apply sorting
    switch (currentFilters.sortBy) {
      case 'price-asc':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'default':
      default:
        // Sort by popularity and then by name
        filteredItems.sort((a, b) => {
          if (a.popular === b.popular) {
            return a.name.localeCompare(b.name);
          }
          return a.popular ? -1 : 1;
        });
        break;
    }
    
    // Hide loading spinner
    hideLoadingSpinner();
    
    // Render the filtered items
    renderFoodItems(filteredItems, foodGrid);
  }
});