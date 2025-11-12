<template>
  <div :class="[
    'product-card bg-white border border-gray-100 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden transition-all duration-500 transform cursor-pointer min-h-64 group hover:scale-[1.02] hover:shadow-3xl hover:shadow-red-500/60 hover:border-red-600 hover:-translate-y-1',
    compact ? 'p-4 min-h-48' : 'p-6',
  ]" @click="$emit('product-click', product)">
    <div class="flex flex-col items-center flex-grow text-center">
      <div :class="[
        'icon-badge flex justify-center items-center mb-4 rounded-full transition-all duration-500 shadow-xl border-4 border-white transform-gpu group-hover:scale-110 group-hover:rotate-3',
        compact ? 'w-14 h-14 p-2' : 'w-20 h-20 p-4',
        // Color logic remains consistent
        product.category === 'Medicine'
          ? 'bg-emerald-500 text-white shadow-emerald-400/50'
          : product.category === 'Medical Equipment'
            ? 'bg-indigo-500 text-white shadow-indigo-400/50'
            : 'bg-indigo-500 text-white shadow-indigo-400/50',
      ]">
        <i :class="[
          getProductIcon(product.category),
          compact ? 'text-2xl' : 'text-4xl',
        ]"></i>
      </div>

      <h4 :class="[
        'product-name font-extrabold text-gray-900 mb-1 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-red-700',
        compact ? 'text-lg' : 'text-xl',
      ]" :title="product.item_name">
        {{ product.item_name }}
      </h4>

      <p :class="[
        'font-semibold uppercase tracking-widest text-gray-500 mb-3',
        compact ? 'text-xxs' : 'text-xs',
      ]">
        {{ product.category }}
      </p>

      <div :class="[
        'price-tag my-3 py-2 px-6 rounded-full bg-red-50 text-red-600 font-black shadow-inner border border-red-200 transition-colors duration-300 transform scale-100 group-hover:scale-[1.05] group-hover:bg-red-100',
        compact ? 'text-2xl' : 'text-3xl',
      ]">
        ₱{{ formatPrice(product.selling_price) }}
      </div>

      <div class="stock-info text-center my-2">
        <span v-if="hasStock" class="text-sm font-semibold text-gray-700">
          In Stock ({{ productStock }})
        </span>
        <span v-else class="text-sm font-extrabold text-red-600 py-1 px-3 bg-red-100 rounded-lg">
          Out of Stock
        </span>
      </div>

      <div class="flex flex-col items-center justify-center my-4 w-full px-2">
        <div class="flex items-center space-x-1 mb-2">
          <i class="pi pi-tags text-sm text-gray-400"></i>
          <span :class="[
            'text-sm font-bold text-gray-800',
            compact ? 'text-xs' : '',
          ]" :title="product.brand">
            {{ (product.brand && String(product.brand).trim()) || 'Brand Unknown' }}
          </span>
        </div>
      </div>
    </div>

    <button v-if="showAddButton" @click.stop="handleAddToBag(product)" :class="[
      'add-to-bag-btn mt-auto flex items-center justify-center gap-2 w-full font-extrabold text-white transition-all duration-300 rounded-2xl transform active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-red-400/50',
      compact ? 'py-2 px-3 text-sm min-h-10' : 'py-3 px-4 text-base min-h-12',
      isAdding || !hasStock
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
    ]" :disabled="isAdding || !hasStock">
      <i :class="[
        isAdding ? 'pi pi-spin pi-spinner' : 'pi pi-shopping-bag',
        compact ? 'text-sm' : 'text-base',
      ]"></i>
      <span>{{
        isAdding ? 'Adding...' : !hasStock ? 'Out of Stock' : 'Add to Bag'
      }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBag } from '@/composables/useBag.js';
// UPDATED: Import showProductAddedAlert instead of showSuccessAlert
import { showErrorAlert, showProductAddedAlert } from '@/utils/sweetAlertConfig.js';
import { useRouter } from 'vue-router';


defineEmits(['product-click']);

const router = useRouter(); // Initialize router for navigation

/** Utility: format price with commas and two decimals */
const formatPrice = (price) => {
  if (price == null) return '0.00';
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice) || !isFinite(numericPrice)) return '0.00';
  return numericPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/** Utility: map product category to icon */
const getProductIcon = (category) =>
  category === 'Medicine' ? 'pi pi-plus-circle' : 'pi pi-cog';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (product) => {
      // Validator logic omitted for brevity...
      const requiredFields = [
        'product_id',
        'item_name',
        'brand',
        'selling_price',
        'category',
        'stock_quantity'
      ];

      const missingFields = requiredFields.filter(field => product[field] === undefined || product[field] === null);
      if (missingFields.length > 0) {
        console.error(`Product prop validation failed: Missing fields: ${missingFields.join(', ')}`);
        return false;
      }

      const idValid = Number(product.product_id) > 0;
      const nameValid = typeof product.item_name === 'string' && product.item_name.length > 0;
      const priceValid = !isNaN(parseFloat(product.selling_price));
      const stockValid = !isNaN(parseFloat(product.stock_quantity));

      return idValid && nameValid && priceValid && stockValid;
    },
  },
  showAddButton: { type: Boolean, default: true },
  compact: { type: Boolean, default: false },
});

const productStock = computed(() => {
  const stock = parseFloat(props.product.stock_quantity);
  return isNaN(stock) ? 0 : Math.floor(Math.max(0, stock));
});

const hasStock = computed(() => {
  return productStock.value > 0;
});

const { addToBag } = useBag();
const isAdding = ref(false);

const handleAddToBag = async (product) => {
  if (isAdding.value || !hasStock.value) return;

  isAdding.value = true;
  try {
    await addToBag(product, 1);

    // CRITICAL CHANGE: Use the custom alert that handles "View Bag" vs "Continue Shopping"
    const result = await showProductAddedAlert(
      product.item_name.trim(),
      true // showViewBagButton = true
    );

    // Handle navigation based on the alert result
    if (result.isConfirmed) {
      router.push({ name: 'BagPage' });
    }
  } catch (error) {
    console.error('Failed to add to bag:', error);
    showErrorAlert(
      'Failed to Add',
      error.message || 'Could not add the item to the bag.'
    );
  } finally {
    isAdding.value = false;
  }
};
</script>

<style scoped>
.hover\:shadow-3xl:hover {
  box-shadow: 0 20px 40px -8px rgba(239, 68, 68, 0.6);
}

.text-xxs {
  font-size: 0.65rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>