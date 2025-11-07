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
import ProductCard from '@/components/ProductCard.vue'
import { useBag } from '@/composables/useBag.js'
import { mockProducts, productCategories } from '@/data/mockData.js'
import { showProductAddedAlert, showErrorAlert } from '@/utils/sweetAlertConfig.js'

// Bag composable
const { addToBag, isInBag, getItemQuantity } = useBag()

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref(null)

// Inline styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  fontFamily: 'Poppins, sans-serif'
}

const mainContentStyle = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '2rem 1rem'
}

const titleSectionStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
}

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '0.5rem',
  fontFamily: 'Poppins, sans-serif'
}

const subtitleStyle = {
  fontSize: '1.125rem',
  color: '#6b7280',
  marginBottom: '1rem',
  fontFamily: 'Poppins, sans-serif'
}

const titleUnderlineStyle = {
  width: '6rem',
  height: '4px',
  backgroundColor: '#E74C3C',
  margin: '1rem auto',
  borderRadius: '2px'
}

const searchSectionStyle = {
  maxWidth: '42rem',
  margin: '0 auto 2rem auto'
}

const searchContainerStyle = {
  position: 'relative'
}

const searchIconStyle = {
  position: 'absolute',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  fontSize: '1.25rem',
  zIndex: 1
}

const searchInputStyle = {
  width: '100%',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  padding: '1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.5rem',
  fontSize: '1.125rem',
  fontFamily: 'Poppins, sans-serif',
  outline: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff'
}

const clearButtonStyle = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  fontSize: '1.5rem',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0.25rem',
  borderRadius: '50%',
  transition: 'color 0.2s ease'
}

const filterSectionStyle = {
  maxWidth: '56rem',
  margin: '0 auto 2rem auto'
}

const filterContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '1rem'
}

const getCategoryButtonStyle = (categoryId) => {
  const isSelected = selectedCategory.value === categoryId
  return {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    backgroundColor: isSelected ? '#E74C3C' : '#e5e7eb',
    color: isSelected ? '#ffffff' : '#374151'
  }
}

const productsSectionStyle = {
  maxWidth: '80rem',
  margin: '0 auto'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 0'
}

const emptyIconStyle = {
  fontSize: '4rem',
  color: '#d1d5db',
  marginBottom: '1rem'
}

const emptyTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#4b5563',
  marginBottom: '0.5rem',
  fontFamily: 'Poppins, sans-serif'
}

const emptyTextStyle = {
  color: '#6b7280',
  fontFamily: 'Poppins, sans-serif'
}

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