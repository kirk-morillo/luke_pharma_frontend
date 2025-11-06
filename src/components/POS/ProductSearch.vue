<template>
  <div class="product-search">
    <!-- Search Header -->
    <div class="search-header">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products by name or SKU..."
          class="search-input"
          @input="updateSearchQuery"
        />
        <i class="pi pi-search search-icon"></i>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="category-filters">
      <select
        v-model="selectedCategory"
        @change="updateCategoryFilter"
        class="category-select"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <select
        v-model="selectedSubcategory"
        @change="updateSubcategoryFilter"
        class="subcategory-select"
        :disabled="!selectedCategory"
      >
        <option value="">All Subcategories</option>
        <option
          v-for="subcategory in selectedCategoryObject?.subcategories || []"
          :key="subcategory.id"
          :value="subcategory.id"
        >
          {{ subcategory.name }}
        </option>
      </select>

      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="clear-filters-btn"
      >
        <i class="pi pi-times"></i> Clear Filters
      </button>
    </div>

    <!-- Frequently Sold Items -->
    <div class="quick-items-section" v-if="!searchQuery && !selectedCategory">
      <h3 class="section-title">
        <i class="pi pi-star"></i> Frequently Sold Items
      </h3>
      <div class="quick-items-grid">
        <div
          v-for="product in frequentlySoldItems"
          :key="product.id"
          @click="addToCartQuick(product)"
          class="quick-item-card"
        >
          <div class="quick-item-info">
            <div class="quick-item-name">{{ product.name }}</div>
            <div class="quick-item-price">₱{{ product.price.toFixed(2) }}</div>
          </div>
          <div class="quick-item-stock" :class="getStockLevelClass(product.stock)">
            Stock: {{ product.stock }}
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="search-results">
      <div class="results-header">
        <h3 class="section-title">
          <i class="pi pi-list"></i>
          {{ searchQuery || selectedCategory ? 'Search Results' : 'All Products' }}
          <span class="results-count">({{ filteredProducts.length }} items)</span>
        </h3>
      </div>

      <div v-if="filteredProducts.length === 0" class="no-results">
        <i class="pi pi-search-minus"></i>
        <p>No products found</p>
        <p class="no-results-hint">Try adjusting your search or filters</p>
      </div>

      <div v-else class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          @click="addToCart(product)"
          class="product-card"
          :class="{ 'low-stock': product.stock < 10, 'out-of-stock': product.stock === 0 }"
        >
          <div class="product-header">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-sku">{{ product.sku }}</div>
          </div>

          <div class="product-details">
            <div class="product-price">₱{{ product.price.toFixed(2) }}</div>
            <div class="product-stock" :class="getStockLevelClass(product.stock)">
              <i class="pi pi-box"></i>
              {{ product.stock }} {{ product.unit }}{{ product.stock !== 1 ? 's' : '' }}
            </div>
          </div>

          <div class="product-category">
            <span class="category-badge">{{ getCategoryName(product.category) }}</span>
            <span class="subcategory-badge">{{ getSubcategoryName(product.subcategory) }}</span>
          </div>

          <div class="product-actions">
            <button
              class="add-to-cart-btn"
              :disabled="product.stock === 0"
              @click.stop="addToCart(product)"
            >
              <i class="pi pi-plus"></i>
              {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
          </div>

          <!-- Stock Warning -->
          <div v-if="product.stock < 10 && product.stock > 0" class="stock-warning">
            <i class="pi pi-exclamation-triangle"></i>
            Only {{ product.stock }} left in stock
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePosStore } from '@/stores/posStore.js';
import { categories, frequentlySoldItems } from '@/data/sampleProducts.js';

// Emits
const emit = defineEmits(['product-selected', 'show-toast']);

// Store
const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedSubcategory,
  clearFilters,
  filteredProducts,
  addToCart
} = usePosStore();

// Local state
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedSubcategory = ref('');

// Computed
const selectedCategoryObject = computed(() => {
  return categories.find(cat => cat.id === selectedCategory.value);
});

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || selectedSubcategory.value;
});

// Methods
const updateSearchQuery = () => {
  setSearchQuery(searchQuery.value);
};

const updateCategoryFilter = () => {
  setSelectedCategory(selectedCategory.value);
  selectedSubcategory.value = ''; // Reset subcategory when category changes
};

const updateSubcategoryFilter = () => {
  setSelectedSubcategory(selectedSubcategory.value);
};

const clearAllFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedSubcategory.value = '';
  clearFilters();
};

const addToCartQuick = (product) => {
  try {
    addToCart(product.id);
    emit('show-toast', {
      type: 'success',
      message: `${product.name} added to cart`
    });
    emit('product-selected', product);
  } catch (error) {
    emit('show-toast', {
      type: 'error',
      message: error.message
    });
  }
};

const getStockLevelClass = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock < 10) return 'low-stock';
  return 'in-stock';
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
</script>

<style scoped>
.product-search {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

/* Search Header */
.search-header {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #FF6347;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

/* Category Filters */
.category-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-select,
.subcategory-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  background: white;
  cursor: pointer;
}

.category-select:focus,
.subcategory-select:focus {
  outline: none;
  border-color: #FF6347;
}

.subcategory-select:disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.clear-filters-btn {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.clear-filters-btn:hover {
  background: #c82333;
}

/* Section Titles */
.section-title {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results-count {
  font-size: 0.9rem;
  font-weight: 400;
  color: #6c757d;
}

/* Quick Items Section */
.quick-items-section {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.quick-item-card {
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f8f9fa;
}

.quick-item-card:hover {
  border-color: #FF6347;
  background: #fff5f4;
}

.quick-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.quick-item-name {
  font-weight: 500;
  font-size: 0.9rem;
  color: #2c3e50;
}

.quick-item-price {
  font-weight: 600;
  color: #FF6347;
}

.quick-item-stock {
  font-size: 0.8rem;
  text-align: right;
}

/* Search Results */
.search-results {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.results-header {
  background: white;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* No Results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.no-results i {
  font-size: 3rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.no-results p {
  margin: 0.5rem 0;
  color: #6c757d;
}

.no-results-hint {
  font-size: 0.9rem;
  color: #adb5bd;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  flex: 1;
}

/* Product Card */
.product-card {
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.product-card:hover {
  border-color: #FF6347;
  box-shadow: 0 4px 8px rgba(255, 99, 71, 0.1);
}

.product-card.low-stock {
  border-color: #f39c12;
}

.product-card.out-of-stock {
  opacity: 0.6;
  border-color: #dc3545;
  cursor: not-allowed;
}

.product-header {
  margin-bottom: 0.75rem;
}

.product-name {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.product-sku {
  font-size: 0.8rem;
  color: #6c757d;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.product-price {
  font-weight: 700;
  font-size: 1.1rem;
  color: #FF6347;
}

.product-stock {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.product-stock.in-stock {
  color: #28a745;
}

.product-stock.low-stock {
  color: #f39c12;
}

.product-stock.out-of-stock {
  color: #dc3545;
}

.product-category {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-badge,
.subcategory-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
}

.category-badge {
  background: #e3f2fd;
  color: #1976d2;
}

.subcategory-badge {
  background: #f3e5f5;
  color: #7b1fa2;
}

.product-actions {
  display: flex;
  justify-content: center;
}

.add-to-cart-btn {
  padding: 0.5rem 1rem;
  background: #FF6347;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  width: 100%;
  justify-content: center;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #e8533b;
}

.add-to-cart-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.stock-warning {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: #f39c12;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .category-filters {
    flex-direction: column;
  }

  .quick-items-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .search-input {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
  }

  .search-icon {
    left: 0.75rem;
  }

  .product-category {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>