<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Shopping Bag</h1>
        <p class="text-lg text-gray-600">Review and checkout your selected items</p>
        <div class="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
      </div>

      <!-- Empty Bag State -->
      <div v-if="bagItems.length === 0" class="max-w-md mx-auto text-center py-16">
        <i class="pi pi-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Your bag is empty</h3>
        <p class="text-gray-500 mb-6">Start adding some products to your bag</p>
        <router-link
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <i class="pi pi-arrow-left mr-2"></i>
          Explore Products
        </router-link>
      </div>

      <!-- Bag Content (Two-section layout) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Left Section: All Products List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">All Items in Bag</h2>
              <div class="flex items-center gap-4">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="handleSelectAll"
                    class="mr-2 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span class="text-gray-700 font-medium">Select All</span>
                </label>
                <button
                  @click="handleClearBag"
                  class="text-red-500 hover:text-red-700 font-medium text-sm"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            <!-- Product List -->
            <div class="space-y-4">
              <div
                v-for="item in bagItems"
                :key="item.product.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div class="flex items-center gap-4">
                  <!-- Checkbox -->
                  <input
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item.product.id"
                    class="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />

                  <!-- Product Info -->
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold" style="color: #E74C3C;">
                      {{ item.product.name }}
                    </h3>
                    <p class="text-gray-600 text-sm mb-1">{{ item.product.description }}</p>
                    <p class="text-gray-800 font-semibold">₱{{ item.product.price.toFixed(2) }}</p>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center gap-2">
                    <button
                      @click="handleUpdateQuantity(item.product.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                    >
                      <i class="pi pi-minus text-xs"></i>
                    </button>
                    <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
                    <button
                      @click="handleUpdateQuantity(item.product.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                    >
                      <i class="pi pi-plus text-xs"></i>
                    </button>
                  </div>

                  <!-- Item Total -->
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-800">
                      ₱{{ (item.product.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeFromBag(item.product.id)"
                    class="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <i class="pi pi-trash text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Selected Products & Checkout -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Selected for Checkout</h2>

            <!-- Selected Items List -->
            <div v-if="selectedBagItems.length === 0" class="text-center py-8">
              <i class="pi pi-shopping-cart text-4xl text-gray-300 mb-3"></i>
              <p class="text-gray-500">No items selected</p>
              <p class="text-sm text-gray-400 mt-1">Select items from your bag to checkout</p>
            </div>

            <div v-else class="space-y-4 mb-6">
              <div
                v-for="item in selectedBagItems"
                :key="item.product.id"
                class="flex justify-between items-center pb-3 border-b border-gray-100"
              >
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-600">₱{{ item.product.price.toFixed(2) }} × {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-800">
                    ₱{{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-semibold text-gray-800">
                  ₱{{ selectedSubtotal.toFixed(2) }}
                </span>
              </div>
              <div class="flex justify-between items-center mb-6">
                <span class="text-xl font-bold text-gray-800">Total</span>
                <span class="text-2xl font-bold" style="color: #E74C3C;">
                  ₱{{ selectedSubtotal.toFixed(2) }}
                </span>
              </div>

              <!-- Checkout Button -->
              <button
                @click="handleCheckout"
                :disabled="selectedBagItems.length === 0"
                :class="[
                  'w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-200',
                  selectedBagItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 active:scale-95'
                ]"
              >
                <i class="pi pi-credit-card mr-2"></i>
                Checkout ({{ selectedBagItems.length }} {{ selectedBagItems.length === 1 ? 'item' : 'items' }})
              </button>
            </div>
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
import Swal from 'sweetalert2'

// Bag composable
const {
  bagState,
  addToBag,
  removeFromBag,
  updateQuantity,
  clearBag,
  generateBagCode
} = useBag()

// Reactive state
const selectedItems = ref([])

// Computed properties
const bagItems = computed(() => bagState.value.items)

const selectedBagItems = computed(() => {
  return bagItems.value.filter(item => selectedItems.value.includes(item.product.id))
})

const selectedSubtotal = computed(() => {
  return selectedBagItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

const selectAll = computed({
  get: () => selectedItems.value.length === bagItems.value.length && bagItems.value.length > 0,
  set: (value) => {
    if (value) {
      selectedItems.value = bagItems.value.map(item => item.product.id)
    } else {
      selectedItems.value = []
    }
  }
})

// Methods
const handleSelectAll = () => {
  selectAll.value = !selectAll.value
}

const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromBag(productId)
    // Remove from selected items if it was selected
    const index = selectedItems.value.indexOf(productId)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    }
  } else {
    updateQuantity(productId, newQuantity)
  }
}

const handleRemoveFromBag = (productId) => {
  removeFromBag(productId)
  // Remove from selected items if it was selected
  const index = selectedItems.value.indexOf(productId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  }
}

const handleClearBag = async () => {
  const result = await Swal.fire({
    title: 'Clear Shopping Bag?',
    text: 'Are you sure you want to remove all items from your bag?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#E74C3C',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Yes, clear bag',
    cancelButtonText: 'Cancel'
  })

  if (result.isConfirmed) {
    clearBag()
    selectedItems.value = []

    await Swal.fire({
      title: 'Bag Cleared!',
      text: 'All items have been removed from your bag.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })
  }
}

const handleCheckout = async () => {
  if (selectedBagItems.value.length === 0) {
    await Swal.fire({
      title: 'No Items Selected',
      text: 'Please select at least one item to checkout.',
      icon: 'warning',
      confirmButtonColor: '#E74C3C'
    })
    return
  }

  // Show checkout confirmation
  const confirmResult = await Swal.fire({
    title: 'Confirm Checkout',
    html: `
      <div class="text-left">
        <p class="mb-4">Are you sure you want to proceed with checkout?</p>
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 class="font-semibold mb-2">Order Summary:</h4>
          ${selectedBagItems.value.map(item => `
            <div class="flex justify-between text-sm mb-1">
              <span>${item.product.name} × ${item.quantity}</span>
              <span>₱${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
          <div class="border-t mt-2 pt-2 font-bold flex justify-between">
            <span>Total:</span>
            <span>₱${selectedSubtotal.value.toFixed(2)}</span>
          </div>
        </div>
        <p class="text-sm text-gray-600">A unique bag code will be generated for you to present at the physical store.</p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#E74C3C',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'No, go back'
  })

  if (confirmResult.isConfirmed) {
    // Generate bag code
    const bagCode = generateBagCode()

    // Show success dialog with bag code
    await Swal.fire({
      title: 'Checkout Successful!',
      html: `
        <div class="text-center">
          <div class="mb-6">
            <i class="pi pi-check-circle text-6xl text-green-500"></i>
          </div>
          <p class="mb-4">Your order has been confirmed!</p>
          <div class="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-4">
            <p class="text-sm text-gray-600 mb-2">Your Bag Code:</p>
            <p class="text-3xl font-bold text-red-600 mb-2">${bagCode}</p>
          </div>
          <div class="text-left bg-gray-50 p-4 rounded-lg text-sm">
            <p class="font-semibold mb-2">Instructions:</p>
            <ul class="text-gray-600 space-y-1">
              <li>• Present this code at any Luke Pharma branch</li>
              <li>• Code is valid for 24 hours</li>
              <li>• Screenshot this page for reference</li>
              <li>• Proceed to the cashier for payment</li>
            </ul>
          </div>
        </div>
      `,
      icon: false,
      confirmButtonText: 'Done',
      confirmButtonColor: '#E74C3C',
      showCancelButton: true,
      cancelButtonText: 'Copy Code',
      cancelButtonColor: '#6B7280'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Copy bag code to clipboard
        navigator.clipboard.writeText(bagCode).then(() => {
          Swal.fire({
            title: 'Code Copied!',
            text: `Bag code ${bagCode} has been copied to clipboard.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        })
      }
    })

    // Remove checked out items from bag
    selectedItems.value.forEach(productId => {
      removeFromBag(productId)
    })
    selectedItems.value = []
  }
}

// Initialize
onMounted(() => {
  // Scroll to top on mount
  window.scrollTo(0, 0)

  // Select all items by default
  selectedItems.value = bagItems.value.map(item => item.product.id)
})
</script>

<style scoped>
/* Custom styles for better transitions */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Sticky checkout section */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Button active state */
.active\:scale-95:active {
  transform: scale(0.95);
}

/* Checkbox styling */
input[type="checkbox"]:checked {
  background-color: #E74C3C;
  border-color: #E74C3C;
}

/* Focus styles for accessibility */
.focus\:ring-red-500:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

/* SweetAlert2 custom styling override */
:deep(.swal2-popup) {
  border-radius: 8px;
}

:deep(.swal2-confirm) {
  border-radius: 6px;
}
</style>