<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p class="text-lg text-gray-600">Find quality medicines and medical equipment</p>
        <div class="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
      </div>

      <!-- Search Bar Section -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for medicines or medical equipment..."
            class="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Category Filter Section -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            @click="selectedCategory = null"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
              selectedCategory === null
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            All Categories ({{ productCategories.reduce((sum, cat) => sum + cat.count, 0) }})
          </button>
          <button
            v-for="category in productCategories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
              selectedCategory === category.id
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>

      <!-- Products Grid Section -->
      <div class="max-w-7xl mx-auto">
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <i class="pi pi-search text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p class="text-gray-500">Try adjusting your search or filters</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <!-- Product Name -->
            <h3 class="text-xl font-bold mb-2" style="color: #E74C3C;">
              {{ product.name }}
            </h3>

            <!-- Product Description -->
            <p class="text-gray-600 text-sm mb-4">
              {{ product.description }}
            </p>

            <!-- Price -->
            <div class="text-2xl font-bold text-gray-800 mb-3">
              ₱{{ product.price.toFixed(2) }}
            </div>

            <!-- Stock Locations -->
            <div class="text-sm text-gray-600 mb-4">
              <span v-if="product.stockLocations.length === 3" class="text-green-600 font-medium">
                Available at all branches
              </span>
              <span v-else-if="product.stockLocations.length > 0" class="text-blue-600">
                Available at: {{ product.stockLocations.join(', ') }}
              </span>
              <span v-else class="text-red-600 font-medium">
                Currently out of stock
              </span>
            </div>

            <!-- Add to Bag Button -->
            <button
              @click="handleAddToBag(product)"
              :disabled="!product.inStock || isInBag(product.id)"
              :class="[
                'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200',
                !product.inStock || isInBag(product.id)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
              ]"
            >
              <span v-if="isInBag(product.id)" class="flex items-center justify-center">
                <i class="pi pi-check mr-2"></i>
                In Bag ({{ getItemQuantity(product.id) }})
              </span>
              <span v-else-if="!product.inStock">
                Out of Stock
              </span>
              <span v-else>
                <i class="pi pi-shopping-cart mr-2"></i>
                Add to Bag
              </span>
            </button>
          </div>
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