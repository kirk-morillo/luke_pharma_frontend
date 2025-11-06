<template>
  <section id="items" class="items-section">
    <div class="section-header">
      <div class="section-content">
        <h2 class="section-title">
          <i class="pi pi-list"></i>
          Our Products
        </h2>
        <p class="section-subtitle">Browse our comprehensive range of medicines and medical supplies</p>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="search-filter-container">
      <div class="search-filter-content">
        <div class="search-bar">
          <div class="search-input-wrapper">
            <i class="pi pi-search search-icon"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for products by name, category, or symptoms..."
              class="search-input"
              @input="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-search-btn"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>

        <div class="filter-controls">
          <div class="category-filter">
            <label class="filter-label">Category:</label>
            <select v-model="selectedCategory" @change="filterProducts" class="filter-select">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="stock-filter">
            <label class="filter-label">Availability:</label>
            <select v-model="stockFilter" @change="filterProducts" class="filter-select">
              <option value="">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div class="sort-controls">
            <label class="filter-label">Sort by:</label>
            <select v-model="sortBy" @change="sortProducts" class="filter-select">
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="stock">Stock Level</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Display -->
    <div class="products-container">
      <div class="products-content">
        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="active-filters">
          <span class="filter-chip" v-if="searchQuery">
            Search: "{{ searchQuery }}"
            <button @click="clearSearch" class="remove-filter">
              <i class="pi pi-times"></i>
            </button>
          </span>
          <span class="filter-chip" v-if="selectedCategory">
            {{ getCategoryName(selectedCategory) }}
            <button @click="selectedCategory = ''; filterProducts()" class="remove-filter">
              <i class="pi pi-times"></i>
            </button>
          </span>
          <span class="filter-chip" v-if="stockFilter">
            {{ getStockFilterName(stockFilter) }}
            <button @click="stockFilter = ''; filterProducts()" class="remove-filter">
              <i class="pi pi-times"></i>
            </button>
          </span>
          <button @click="clearAllFilters" class="clear-all-filters">
            Clear All
          </button>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <p class="results-count">
            Showing {{ filteredProducts.length }} of {{ products.length }} products
          </p>
          <div v-if="selectedProduct" class="selected-product-info">
            <i class="pi pi-map-marker"></i>
            <span>
              <strong>{{ selectedProduct.name }}</strong> is available at:
              {{ getAvailableLocations(selectedProduct).join(', ') }}
            </span>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="filteredProducts.length > 0" class="products-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            @click="selectProduct(product)"
            :class="{ 'selected': selectedProduct?.id === product.id }"
          >
            <div class="product-image">
              <i :class="getProductIcon(product.category)"></i>
            </div>

            <div class="product-content">
              <div class="product-header">
                <h3 class="product-name">{{ product.name }}</h3>
                <span class="product-sku">{{ product.sku }}</span>
              </div>

              <div class="product-meta">
                <span class="product-category">{{ getCategoryName(product.category) }}</span>
                <span class="product-subcategory">{{ getSubcategoryName(product.subcategory) }}</span>
              </div>

              <div class="product-details">
                <div class="price-section">
                  <span class="product-price">₱{{ product.price.toFixed(2) }}</span>
                  <span class="product-unit">per {{ product.unit }}</span>
                </div>

                <div class="stock-section">
                  <div class="stock-indicator" :class="getStockClass(product.stock)">
                    <i class="pi pi-box"></i>
                    <span>{{ getStockText(product.stock) }}</span>
                  </div>
                  <span class="stock-count">{{ product.stock }} {{ product.unit }}{{ product.stock !== 1 ? 's' : '' }}</span>
                </div>
              </div>

              <div class="product-actions">
                <button
                  @click.stop="viewProductDetails(product)"
                  class="view-details-btn"
                >
                  <i class="pi pi-eye"></i>
                  View Details
                </button>
              </div>
            </div>

            <!-- Stock Warning Badge -->
            <div v-if="product.stock < 10 && product.stock > 0" class="stock-warning-badge">
              <i class="pi pi-exclamation-triangle"></i>
              Low Stock
            </div>

            <!-- Out of Stock Badge -->
            <div v-if="product.stock === 0" class="out-of-stock-badge">
              <i class="pi pi-times-circle"></i>
              Out of Stock
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <i class="pi pi-search-minus"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search terms or filters</p>
          <button @click="clearAllFilters" class="reset-search-btn">
            <i class="pi pi-refresh"></i>
            Reset Search
          </button>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click="closeDetailsModal">
      <div class="modal-content product-details-modal" @click.stop>
        <div class="modal-header">
          <h3>Product Details</h3>
          <button @click="closeDetailsModal" class="modal-close">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div v-if="selectedProductDetails" class="modal-body">
          <div class="product-detail-header">
            <div class="product-detail-image">
              <i :class="getProductIcon(selectedProductDetails.category)"></i>
            </div>
            <div class="product-detail-info">
              <h4>{{ selectedProductDetails.name }}</h4>
              <p class="product-detail-sku">{{ selectedProductDetails.sku }}</p>
              <div class="product-detail-meta">
                <span class="category-badge">{{ getCategoryName(selectedProductDetails.category) }}</span>
                <span class="subcategory-badge">{{ getSubcategoryName(selectedProductDetails.subcategory) }}</span>
              </div>
            </div>
          </div>

          <div class="product-detail-pricing">
            <div class="price-info">
              <span class="price-label">Unit Price:</span>
              <span class="price-value">₱{{ selectedProductDetails.price.toFixed(2) }}</span>
            </div>
            <div class="stock-info">
              <span class="stock-label">Available Stock:</span>
              <span class="stock-value" :class="getStockClass(selectedProductDetails.stock)">
                {{ selectedProductDetails.stock }} {{ selectedProductDetails.unit }}{{ selectedProductDetails.stock !== 1 ? 's' : '' }}
              </span>
            </div>
          </div>

          <div class="product-detail-locations">
            <h5>Available at these locations:</h5>
            <div class="locations-list">
              <div
                v-for="location in getAvailableLocations(selectedProductDetails)"
                :key="location"
                class="location-item"
              >
                <i class="pi pi-map-marker"></i>
                <span>{{ location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { sampleProducts, categories } from '@/data/sampleProducts.js';

// State
const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const stockFilter = ref('');
const sortBy = ref('name');
const selectedProduct = ref(null);
const showDetailsModal = ref(false);
const selectedProductDetails = ref(null);

// Store locations for product availability
const storeLocations = [
  'Location 1 - 1626 Rizal Avenue Sta.Cruz Manila',
  'Location 2 - Makati City Branch',
  'Location 3 - Quezon City Branch',
  'Location 4 - Pasay City Branch',
  'Location 5 - Caloocan City Branch'
];

// Computed
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value);
  }

  // Apply stock filter
  if (stockFilter.value) {
    switch (stockFilter.value) {
      case 'in-stock':
        result = result.filter(product => product.stock > 10);
        break;
      case 'low-stock':
        result = result.filter(product => product.stock > 0 && product.stock <= 10);
        break;
      case 'out-of-stock':
        result = result.filter(product => product.stock === 0);
        break;
    }
  }

  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return result;
});

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || stockFilter.value;
});

// Methods
const initializeProducts = () => {
  products.value = [...sampleProducts];
};

const handleSearch = () => {
  filterProducts();
};

const filterProducts = () => {
  // Filter logic is handled by computed property
  selectProduct(null); // Clear selected product when filters change
};

const sortProducts = () => {
  // Sort logic is handled by computed property
};

const clearSearch = () => {
  searchQuery.value = '';
  filterProducts();
};

const clearAllFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  stockFilter.value = '';
  sortBy.value = 'name';
  selectProduct(null);
};

const selectProduct = (product) => {
  selectedProduct.value = product;
};

const viewProductDetails = (product) => {
  selectedProductDetails.value = product;
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedProductDetails.value = null;
};

const getProductIcon = (category) => {
  const iconMap = {
    'medicines': 'pi pi-pill',
    'medical supplies': 'pi pi-box',
    'personal care': 'pi pi-heart'
  };
  return iconMap[category] || 'pi pi-tag';
};

const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
};

const getSubcategoryName = (subcategoryId) => {
  for (const category of categories) {
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    if (subcategory) return subcategory.name;
  }
  return subcategoryId;
};

const getStockClass = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
};

const getStockText = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 10) return 'Low Stock';
  return 'In Stock';
};

const getStockFilterName = (filter) => {
  const filterMap = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock'
  };
  return filterMap[filter] || filter;
};

const getAvailableLocations = (product) => {
  // Simulate product availability across locations
  // In a real app, this would come from the backend
  const availableCount = Math.floor(Math.random() * 3) + 3; // 3-5 locations
  return storeLocations.slice(0, availableCount);
};

// Lifecycle
onMounted(() => {
  initializeProducts();
});
</script>

<style scoped>
/* Variables */
:root {
  --primary-red: #FF6347;
  --secondary-blue: #34495e;
  --success-green: #2ecc71;
  --warning-orange: #f39c12;
  --danger-red: #e74c3c;
  --light-bg: #f8f9fa;
  --white: #ffffff;
  --text-dark: #2c3e50;
  --text-light: #7f8c8d;
  --border-light: #e1e5e9;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.items-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 80px 0 60px;
  min-height: 100vh;
}

/* Section Header */
.section-header {
  background: var(--white);
  padding: 60px 0 40px;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.section-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.section-title i {
  color: var(--primary-red);
  font-size: 2.5rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Search and Filter Container */
.search-filter-container {
  background: var(--white);
  padding: 30px 0;
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-filter-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.search-bar {
  margin-bottom: 30px;
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 18px 60px 18px 60px;
  border: 2px solid var(--border-light);
  border-radius: 50px;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: var(--light-bg);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-red);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(255, 99, 71, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.clear-search-btn:hover {
  background: var(--danger-red);
  color: var(--white);
}

.filter-controls {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.filter-select {
  padding: 12px 20px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  background: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-red);
  box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.1);
}

/* Products Container */
.products-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.products-content {
  padding: 40px 0;
}

/* Active Filters */
.active-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary-red);
  color: var(--white);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
}

.remove-filter {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.remove-filter:hover {
  background: rgba(255, 255, 255, 0.2);
}

.clear-all-filters {
  padding: 8px 16px;
  background: var(--text-light);
  color: var(--white);
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-all-filters:hover {
  background: var(--text-dark);
}

/* Results Summary */
.results-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
}

.results-count {
  font-size: 1.1rem;
  color: var(--text-dark);
  font-weight: 500;
}

.selected-product-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #e8f5e8;
  border-left: 4px solid var(--success-green);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text-dark);
}

.selected-product-info i {
  color: var(--success-green);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.product-card {
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 3px solid transparent;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.product-card.selected {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 4px rgba(255, 99, 71, 0.2);
}

.product-image {
  height: 120px;
  background: linear-gradient(135deg, var(--primary-red), var(--secondary-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 3rem;
}

.product-content {
  padding: 24px;
}

.product-header {
  margin-bottom: 16px;
}

.product-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
  line-height: 1.3;
}

.product-sku {
  font-size: 0.85rem;
  color: var(--text-light);
  font-family: monospace;
}

.product-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.product-category {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.product-subcategory {
  padding: 4px 12px;
  background: #f3e5f5;
  color: #7b1fa2;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.price-section {
  text-align: left;
}

.product-price {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-red);
  margin-bottom: 4px;
}

.product-unit {
  font-size: 0.85rem;
  color: var(--text-light);
}

.stock-section {
  text-align: right;
}

.stock-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.stock-indicator.in-stock {
  color: var(--success-green);
}

.stock-indicator.low-stock {
  color: var(--warning-orange);
}

.stock-indicator.out-of-stock {
  color: var(--danger-red);
}

.stock-count {
  font-size: 0.8rem;
  color: var(--text-light);
}

.product-actions {
  text-align: center;
}

.view-details-btn {
  width: 100%;
  padding: 12px 24px;
  background: var(--primary-red);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  background: #e8533b;
  transform: translateY(-2px);
}

/* Stock Badges */
.stock-warning-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--warning-orange);
  color: var(--white);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: var(--shadow-sm);
}

.out-of-stock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--danger-red);
  color: var(--white);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: var(--shadow-sm);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 40px;
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
}

.no-results i {
  font-size: 4rem;
  color: var(--text-light);
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.8rem;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.no-results p {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 30px;
}

.reset-search-btn {
  padding: 12px 24px;
  background: var(--primary-red);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.reset-search-btn:hover {
  background: #e8533b;
}

/* Product Details Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--white);
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-light);
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--light-bg);
  color: var(--text-dark);
}

.modal-body {
  padding: 24px;
}

.product-detail-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.product-detail-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-red), var(--secondary-blue));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  flex-shrink: 0;
}

.product-detail-info h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.product-detail-sku {
  font-size: 0.9rem;
  color: var(--text-light);
  font-family: monospace;
  margin-bottom: 12px;
}

.product-detail-meta {
  display: flex;
  gap: 8px;
}

.product-detail-pricing {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--light-bg);
  border-radius: 12px;
}

.price-info, .stock-info {
  text-align: center;
}

.price-label, .stock-label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 8px;
}

.price-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-red);
}

.stock-value {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
}

.stock-value.in-stock {
  color: var(--success-green);
}

.stock-value.low-stock {
  color: var(--warning-orange);
}

.stock-value.out-of-stock {
  color: var(--danger-red);
}

.product-detail-locations h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.locations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.location-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--light-bg);
  border-radius: 8px;
  color: var(--text-dark);
}

.location-item i {
  color: var(--primary-red);
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .section-content,
  .search-filter-content,
  .products-container {
    padding: 0 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .filter-controls {
    gap: 20px;
  }

  .filter-select {
    min-width: 180px;
  }
}

@media (max-width: 768px) {
  .items-section {
    padding: 60px 0 40px;
  }

  .section-header {
    padding: 40px 0 30px;
  }

  .section-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-title i {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .search-filter-container {
    padding: 20px 0;
  }

  .filter-controls {
    flex-direction: column;
    gap: 20px;
  }

  .filter-select {
    width: 100%;
    min-width: unset;
  }

  .results-summary {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-details {
    flex-direction: column;
    gap: 16px;
  }

  .price-section, .stock-section {
    text-align: center;
  }

  .product-detail-header {
    flex-direction: column;
    text-align: center;
  }

  .product-detail-pricing {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .section-content,
  .search-filter-content,
  .products-container {
    padding: 0 15px;
  }

  .search-input {
    padding: 16px 50px 16px 50px;
    font-size: 1rem;
  }

  .active-filters {
    justify-content: center;
  }

  .modal-overlay {
    padding: 10px;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-body {
    padding: 20px;
  }
}
</style>