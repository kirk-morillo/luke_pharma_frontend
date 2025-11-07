<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-lg p-5 flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer min-h-56 group"
    :class="{
      // Hover Effect & Base Sizing
      'hover:shadow-xl hover:border-red-500 hover:-translate-y-1': product.inStock,
      'p-4 min-h-44': compact,

      // Out-of-Stock Styles
      'opacity-60 cursor-not-allowed': !product.inStock,
    }">
    <!-- SOLD OUT Overlay -->
    <div v-if="!product.inStock"
      class="absolute inset-0 bg-gray-100/80 flex items-center justify-center z-10 rounded-xl">
      <span class="text-xl font-black text-red-600/90 tracking-widest rotate-[-10deg] opacity-100">
        SOLD OUT
      </span>
    </div>

    <!-- Top Section (Icon & Details) -->
    <div class="flex flex-col items-center flex-grow text-center">

      <!-- Product Icon (Category visual identifier) -->
      <div class="flex justify-center items-center mb-3 rounded-full transition-all duration-300 shadow-md" :class="[
        // Sizing
        compact ? 'w-12 h-12 p-2' : 'w-16 h-16 p-3',

        // Category Specific Colors
        product.category === 'Medicine'
          ? 'bg-emerald-100 text-emerald-600' // Medicine (Green)
          : 'bg-blue-100 text-blue-600', // Equipment (Blue)

        // Hover Effect on Icon
        product.inStock ? 'group-hover:scale-110' : ''
      ]">
        <i :class="[getProductIcon(product.category), compact ? 'text-xl' : 'text-3xl']"></i>
      </div>

      <!-- Name (H4 - Primary Identifier) -->
      <h4 class="font-semibold text-gray-900 mb-1 leading-snug line-clamp-2"
        :class="{ 'text-lg': !compact, 'text-base': compact }">
        {{ product.name }}
      </h4>

      <!-- Price (Emphasis on value) -->
      <div class="font-black text-red-600 my-1" :class="{ 'text-2xl': !compact, 'text-xl': compact }">
        ₱{{ product.price.toFixed(2) }}
      </div>

      <!-- Category (Sub-identifier) -->
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3" :class="{ 'text-xxs': compact }">
        {{ product.category }}
      </p>

      <!-- Stock Location Badge (Secondary information, clarity on availability) -->
      <div
        class="flex items-center justify-center text-xs text-gray-600 bg-gray-100 py-1 px-2.5 rounded-full mb-4 font-medium"
        :class="{ 'text-xxs': compact, 'py-0.5 px-2': compact }">
        <i class="pi pi-map-marker text-red-500 text-xs mr-1"></i>
        <span class="truncate">{{ formatStockLocations(product.stockLocations) }}</span>
      </div>
    </div>

    <!-- Action Button (Pinned to the bottom) -->
    <button v-if="showAddButton" @click.stop="$emit('add-to-bag', product)"
      class="mt-auto flex items-center justify-center gap-2 w-full font-bold transition-all duration-300 rounded-lg transform active:scale-95"
      :class="{
        // Sizing
        'py-3 px-4 text-sm min-h-11': !compact,
        'py-2 px-3 text-xs min-h-9': compact,

        // Active State
        'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg': product.inStock,

        // Disabled State
        'bg-gray-300 text-gray-500 cursor-not-allowed': !product.inStock
      }" :disabled="!product.inStock">
      <i :class="['pi pi-shopping-bag', compact ? 'text-sm' : 'text-base']"></i>
      <span>{{ product.inStock ? 'Add to Bag' : 'Out of Stock' }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add-to-bag'],
  methods: {
    getProductIcon(category) {
      // Logic for icon based on category
      return category === 'Medicine' ? 'pi pi-plus-circle' : 'pi pi-cog'
    },
    formatStockLocations(locations) {
      if (!locations || locations.length === 0) return 'No locations'

      // Check if product is available at all branches
      const allLocations = ['Location 1', 'Location 2', 'Location 3']
      const availableLocations = locations.filter(loc => allLocations.includes(loc))

      if (availableLocations.length >= 3) {
        return 'Available at 3+ Branches' // Changed text for clearer availability status
      }

      return availableLocations.join(', ')
    }
  }
}
</script>

<style scoped>
/* Define a custom utility class for extra small text */
.text-xxs {
  font-size: 0.65rem;
  /* ~10px */
}

/* Ensure the line-clamp utility works correctly for the name */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>