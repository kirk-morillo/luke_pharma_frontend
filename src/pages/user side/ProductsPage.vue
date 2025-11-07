<template>
  <div class="products-page-container page-container" :style="containerStyle">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="main-content" :style="mainContentStyle">
      <!-- Page Title -->
      <div class="page-title-section" :style="titleSectionStyle">
        <h1 :style="titleStyle">Our Products</h1>
        <p :style="subtitleStyle">Find quality medicines and medical equipment</p>
        <div :style="titleUnderlineStyle"></div>
      </div>

      <!-- Search Bar Section -->
      <div class="search-section" :style="searchSectionStyle">
        <div class="search-container" :style="searchContainerStyle">
          <i class="pi pi-search" :style="searchIconStyle"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for medicines or medical equipment..."
            :style="searchInputStyle"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            :style="clearButtonStyle"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Category Filter Section -->
      <div class="filter-section" :style="filterSectionStyle">
        <div class="filter-container" :style="filterContainerStyle">
          <button
            @click="selectedCategory = null"
            :style="getCategoryButtonStyle(null)"
          >
            All Categories ({{ productCategories.reduce((sum, cat) => sum + cat.count, 0) }})
          </button>
          <button
            v-for="category in productCategories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :style="getCategoryButtonStyle(category.id)"
          >
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>

      <!-- Products Grid Section -->
      <div class="products-section" :style="productsSectionStyle">
        <div v-if="filteredProducts.length === 0" class="empty-state" :style="emptyStateStyle">
          <i class="pi pi-search" :style="emptyIconStyle"></i>
          <h3 :style="emptyTitleStyle">No products found</h3>
          <p :style="emptyTextStyle">Try adjusting your search or filters</p>
        </div>

        <div v-else class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-bag="handleAddToBag"
          />
        </div>
      </div>
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useBag } from '@/composables/useBag.js'
import { mockProducts, productCategories } from '@/data/mockData.js'

// Bag composable
const { addToBag, isInBag, getItemQuantity } = useBag()

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref(null)

// Computed property for filtered products
const filteredProducts = computed(() => {
  let products = mockProducts

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter(product => product.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  return products
})

// Methods
const handleAddToBag = (product) => {
  if (product.inStock && !isInBag(product.id)) {
    addToBag(product)
  }
}

// Initialize
onMounted(() => {
  // Scroll to top on mount
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* Custom styles for better transitions */
.hover\:shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(231, 76, 60, 0.3), 0 10px 10px -5px rgba(231, 76, 60, 0.04);
}

/* Animation for card hover */
.transform {
  transition: transform 0.2s ease-in-out;
}

.transform:hover {
  transform: translateY(-4px);
}

/* Button active state */
.active\:scale-95:active {
  transform: scale(0.95);
}

/* Focus styles for accessibility */
.focus\:ring-2:focus {
  outline: none;
  ring: 2px;
  ring-color: #E74C3C;
}

/* Search input styling */
input[type="text"]::placeholder {
  color: #9CA3AF;
}

/* Category filter button animations */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>