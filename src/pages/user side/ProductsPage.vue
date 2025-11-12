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

      <div class="max-w-full mx-auto mb-10">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div
            class="flex flex-nowrap overflow-x-auto justify-start sm:justify-start gap-3 pb-3 custom-scrollbar sm:pb-0 mb-4 sm:mb-0 w-full sm:w-auto">
            <button @click="setSelectedCategory('')" :class="[
              'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
              state.selectedCategory === ''
                ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]">
              All Categories ({{ totalProductCount }})
            </button>

            <button v-for="category in productCategories" :key="category.name"
              @click="setSelectedCategory(category.name)" :class="[
                'flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition duration-200 shadow-sm',
                state.selectedCategory === category.name
                  ? 'bg-red-600 text-white shadow-red-300/50 hover:bg-red-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]">
              {{ category.name }} ({{ category.count }})
            </button>
          </div>

          <div class="flex-shrink-0">
            <button @click="isGridLayout = !isGridLayout" :class="[
              'p-2.5 rounded-xl transition duration-200 shadow-sm text-lg',
              'bg-gray-200 text-gray-700 hover:bg-gray-300',
              'focus:outline-none focus:ring-2 focus:ring-red-500'
            ]" :aria-label="isGridLayout ? 'Switch to List Layout' : 'Switch to Grid Layout'">
              <i :class="[isGridLayout ? 'pi pi-list' : 'pi pi-th-large']"></i>
            </button>
          </div>
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

        <div v-else>
          <div v-if="isGridLayout" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
              @add-to-bag="handleAddToBag" />
          </div>

          <div v-else class="space-y-4 lg:space-y-6">
            <ProductListItem v-for="product in filteredProducts" :key="product.id" :product="product"
              @add-to-bag="handleAddToBag" />
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'
// NEW IMPORT: ProductListItem component
import ProductListItem from '@/components/ProductListItem.vue'
import { usePosStore } from '@/stores/posStore.js'
// Import the specific SweetAlert utility functions
import { showErrorAlert, showProductAddedAlert } from '@/utils/sweetAlertConfig.js'

const router = useRouter()
const isGridLayout = ref(true)

const {
  state,
  fetchProducts,
  isLoading,
  filteredProducts,
  setSearchQuery,
  setSelectedCategory,
  addToCart,
} = usePosStore()


const productCategories = computed(() => {
  const categoryMap = state.products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => a.name.localeCompare(b.name));
});

const totalProductCount = computed(() => {
  return state.products.length;
});


// handleAddToBag remains the same, as both ProductCard and ProductListItem
// now emit the 'add-to-bag' event, which is handled centrally here.
const handleAddToBag = async (product) => {
  try {
    const stock = product.stock_quantity || 0;

    if (stock > 0) {
      // NOTE: This assumes 'product.product_id' is the correct ID to pass to the store.
      addToCart(product.product_id, 1)

      // Use the centralized SweetAlert utility
      const result = await showProductAddedAlert(product.item_name.trim(), true)

      // Manually handle the routing based on the result
      if (result.isConfirmed) {
        // Assuming result.isConfirmed means 'View Bag' was clicked
        router.push({ name: 'BagPage' })
      }

    } else {
      showErrorAlert('Out of Stock', 'This product is currently out of stock.')
    }
  } catch (e) {
    showErrorAlert('Error Adding to Bag', e.message)
  }
}

onMounted(() => {
  fetchProducts();
  window.scrollTo(0, 0)
})
</script>