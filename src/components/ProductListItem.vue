<template>
    <div :class="[
        'product-list-item bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-4 flex flex-col sm:flex-row min-h-36 group hover:scale-[1.01] hover:border-red-500 hover:shadow-red-200/50',
    ]" @click="$emit('product-click', product)">
        <div class="flex-shrink-0 w-full sm:w-32 h-32 sm:h-auto mb-4 sm:mb-0 sm:mr-4 relative flex items-center justify-center rounded-lg border border-gray-200"
            :class="[
                // Medicine is now green (emerald) with plus-circle
                product.category === 'Medicine'
                    ? 'bg-emerald-50 text-emerald-600'
                    : product.category === 'Medical Equipment'
                        ? 'bg-indigo-50 text-indigo-600'
                    : 'bg-indigo-50 text-indigo-600',
            ]">
            <i :class="[getProductIcon(product.category), 'text-6xl']"></i>

            <span
                class="absolute top-2 left-2 bg-red-100 text-red-700 text-xxs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                {{ product.category }}
            </span>
        </div>

        <div class="flex-grow flex flex-col justify-between">
            <div>
                <h3 class="product-name text-xl font-extrabold text-gray-900 mb-1 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-red-700 font-['Poppins']"
                    :title="product.item_name">
                    {{ product.item_name }}
                </h3>
                <p class="text-sm text-gray-500 mb-3 line-clamp-3">
                    {{ product.description || 'No description available.' }}
                </p>
            </div>

            <div class="flex justify-between items-end mt-2 pt-2 border-t border-gray-100">
                <div class="flex flex-col">
                    <span class="price-tag text-2xl font-extrabold text-red-600 font-['Poppins']">
                        ₱{{ formatPrice(product.selling_price) }}
                    </span>

                    <div class="stock-info mt-1">
                        <span v-if="hasStock" class="text-sm font-semibold text-green-600">
                            In Stock ({{ productStock }})
                        </span>
                        <span v-else class="text-sm font-extrabold text-red-600">
                            Out of Stock
                        </span>
                    </div>

                    <div class="flex items-center space-x-1 mt-1 text-xs">
                        <i class="pi pi-tags text-gray-400"></i>
                        <span class="font-bold text-gray-800" :title="product.brand">
                            {{ (product.brand && String(product.brand).trim()) || 'Brand Unknown' }}
                        </span>
                    </div>
                </div>

                <button v-if="showAddButton" @click.stop="handleAddToBag(product)" :class="[
                    'add-to-bag-btn flex items-center px-4 py-2 rounded-lg font-extrabold text-white transition-all duration-300 shadow-md active:scale-[0.98] hover:shadow-lg',
                    isAdding || !hasStock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
                ]" :disabled="isAdding || !hasStock">
                    <i :class="[isAdding ? 'pi pi-spin pi-spinner' : 'pi pi-shopping-bag', 'mr-2']"></i>
                    <span>{{
                        isAdding ? 'Adding...' : !hasStock ? 'Out of Stock' : 'Add to Bag'
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBag } from '@/composables/useBag.js';
import { showErrorAlert, showProductAddedAlert } from '@/utils/sweetAlertConfig.js';
import { useRouter } from 'vue-router';

defineEmits(['product-click']);

const router = useRouter();

/** Utility: format price with commas and two decimals */
const formatPrice = (price) => {
    if (price == null) return '0.00';
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || !isFinite(numericPrice)) return '0.00';
    return numericPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getProductIcon = (category) =>
    category === 'Medicine' ? 'pi pi-plus-circle' :
        category === 'Medical Equipment' ? 'pi pi-cog' : 
            'pi pi-cog'; // Default icon for unknown category

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    showAddButton: { type: Boolean, default: true },
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

        const result = await showProductAddedAlert(
            product.item_name.trim(),
            true
        );

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
.text-xxs {
    font-size: 0.65rem;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>