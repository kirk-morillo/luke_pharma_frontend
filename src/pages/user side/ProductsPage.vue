<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50">
    <Header />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-grow w-full">
      <div class="text-center mb-10">
        <h1 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 font-['Poppins']">Our Products</h1>
        <p class="text-lg text-gray-600 mb-4 font-['Poppins']">
          Find quality medicines and medical equipment
        </p>
        <div class="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      <div class="max-w-xl mx-auto mb-8">
        <div class="relative">
          <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10"></i>
          <input :value="state.searchQuery" @input="setSearchQuery($event.target.value)" type="text"
            placeholder="Search for medicines or medical equipment..."
            class="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl text-lg font-['Poppins']
                      outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 shadow-sm" />
          <button v-if="state.searchQuery" @click="setSearchQuery('')" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer
                      hover:text-red-600 transition duration-200 bg-transparent border-none p-1 rounded-full">
            &times;
          </button>
        </div>
      </div>

      <div class="max-w-4xl mx-auto mb-10">
        <div class="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-3 pb-3 custom-scrollbar">
          <button @click="setSelectedCategory('')" :class="[
            'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
            state.selectedCategory === ''
              ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]">
            All Categories ({{ totalProductCount }})
          </button>

          <button v-for="category in productCategories" :key="category.name" @click="setSelectedCategory(category.name)"
            :class="[
              'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
              state.selectedCategory === category.name
                ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]">
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>

      <div class="max-w-full mx-auto">
        <div v-if="isLoading" class="text-center py-16">
          <i class="pi pi-spin pi-spinner block text-6xl text-red-500 mb-4"></i>
          <h3 class="text-xl font-bold text-gray-600 mb-2 font-['Poppins']">
            Loading products from server...
          </h3>
        </div>

        <div v-else-if="state.error" class="text-center py-16">
          <i class="pi pi-times-circle block text-6xl text-red-500 mb-4"></i>
          <h3 class="text-xl font-bold text-red-600 mb-2 font-['Poppins']">
            Error Loading Data
          </h3>
          <p class="text-gray-500 font-['Poppins']">
            {{ state.error }}
          </p>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
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

    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showSuccessModal = false">
      <div class="bg-white rounded-lg shadow-2xl p-6 w-11/12 max-w-sm transform transition-all duration-300 scale-100">
        <div class="flex justify-center mb-4">
          <svg class="w-20 h-20 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
              stroke="currentColor" stroke-width="2.5" />
          </svg>
        </div>
        <div class="text-center mb-6">
          <p class="text-xl font-bold text-gray-800 leading-relaxed font-['Poppins']">
            {{ lastAddedProductName }} added to bag.
          </p>
        </div>
        <div class="flex justify-center space-x-4">
          <button @click="showSuccessModal = false"
            class="px-5 py-2 rounded-lg font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400 transition duration-150 shadow-md">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'
import { usePosStore } from '@/stores/posStore.js'
import { showErrorAlert } from '@/utils/sweetAlertConfig.js'

// --- Router and State Setup ---
const router = useRouter()
const showSuccessModal = ref(false)
const lastAddedProductName = ref('')

// --- Store Setup ---
const {
  state,
  fetchProducts,
  isLoading,
  filteredProducts,
  setSearchQuery,
  setSelectedCategory,
  addToCart,
  getProductById,
} = usePosStore()


// --- Computed Properties for UI ---
const productCategories = computed(() => {
  // Group products by category
  const categoryMap = state.products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Convert map to array format for V-FOR
  return Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => a.name.localeCompare(b.name));
});

const totalProductCount = computed(() => {
  return state.products.length;
});


// --- Methods ---

const handleAddToBag = (product) => {
  try {
    // ✅ FIX 1: Use the correct API property for stock
    const stock = product.stock_quantity || 0;

    if (stock > 0) {
      // 1. Use the centralized store logic for adding to cart/bag
      // ✅ FIX 2: Use the correct API property for ID
      addToCart(product.product_id, 1)

      // 2. Set the product name for the modal text
      // ✅ FIX 3: Use the correct API property for name (removed old 'dosage' field)
      lastAddedProductName.value = product.item_name.trim()

      // 3. Show the success modal
      showSuccessModal.value = true

    } else {
      showErrorAlert('Out of Stock', 'This product is currently out of stock.')
    }
  } catch (e) {
    // Catch insufficient stock error or other errors from addToCart
    showErrorAlert('Error Adding to Bag', e.message)
  }
}

// --- Lifecycle Hook ---
onMounted(() => {
  // 1. Initial product data fetch from the Node.js API
  fetchProducts();

  // 2. Scroll to top on mount
  window.scrollTo(0, 0)
})
</script>