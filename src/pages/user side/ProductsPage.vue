<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-grow w-full">
      <!-- Page Title -->
      <div class="text-center mb-10">
        <h1 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 font-['Poppins']">Our Products</h1>
        <p class="text-lg text-gray-600 mb-4 font-['Poppins']">
          Find quality medicines and medical equipment
        </p>
        <div class="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      <!-- Search Bar Section -->
      <div class="max-w-xl mx-auto mb-8">
        <div class="relative">
          <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10"></i>
          <input v-model="searchQuery" type="text" placeholder="Search for medicines or medical equipment..."
            class="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl text-lg font-['Poppins']
                   outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm" />
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer
                   hover:text-red-600 transition duration-200 bg-transparent border-none p-1 rounded-full">
            &times;
          </button>
        </div>
      </div>

      <!-- Category Filter Section (Responsive Scrolling) -->
      <div class="max-w-4xl mx-auto mb-10">
        <div class="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-3 pb-3 custom-scrollbar">
          <button @click="selectedCategory = null" :class="[
            'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
            selectedCategory === null
              ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]">
            All Categories ({{productCategories.reduce((sum, cat) => sum + cat.count, 0)}})
          </button>
          <button v-for="category in productCategories" :key="category.id" @click="selectedCategory = category.id"
            :class="[
              'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
              selectedCategory === category.id
                ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]">
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>

      <!-- Products Grid Section -->
      <div class="max-w-full mx-auto">
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <i class="pi pi-search block text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-bold text-gray-600 mb-2 font-['Poppins']">
            No products found
          </h3>
          <p class="text-gray-500 font-['Poppins']">
            Try adjusting your search query or removing filters.
          </p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
            @add-to-bag="handleAddToBag" />
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
import { showErrorAlert } from '@/utils/sweetAlertConfig.js' // Assuming showProductAddedAlert is now handled by useBag

// Bag composable
const { addToBag, isInBag } = useBag()

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
    // Assuming addToBag handles success feedback internally
    addToBag(product, 1, false)
  } else if (!product.inStock) {
    showErrorAlert('Out of Stock', 'This product is currently out of stock.')
  } else if (isInBag(product.id)) {
    showErrorAlert('Already in Bag', `${product.name} is already in your bag.`)
  }
}

// Initialize
onMounted(() => {
  // Scroll to top on mount
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/*
  Custom scrollbar for the category filter section to maintain a clean look.
  This ensures the categories are scrollable on smaller screens without a jarring default scrollbar.
*/
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(231, 76, 60, 0.4);
  /* Red tint */
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}
</style>