<template>
    <div class="p-6 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
        <div class="flex items-start gap-6">
            <!-- Checkbox for selection -->
            <input type="checkbox" :checked="isSelected" @change="handleToggleSelect"
                class="mt-1 cursor-pointer flex-shrink-0 w-5 h-5 rounded accent-red-600"
                :aria-label="`Select ${item.product.name}`" />

            <!-- Product Image Placeholder -->
            <div
                class="flex items-center justify-center flex-shrink-0 w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-sm">
                <i class="pi pi-box text-5xl text-gray-400" aria-hidden="true"></i>
                <!-- In a real app, replace with <img :src="item.product.image" alt="Product image" class="w-full h-full object-cover rounded-xl" /> -->
            </div>

            <!-- Product Details -->
            <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold mb-2 text-gray-900">{{ item.product.name }}</h3>
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-sm text-gray-500">Unit Price:</span>
                    <span class="text-lg font-extrabold text-red-600">₱{{ item.product.price.toFixed(2) }}</span>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-3">
                    <span class="text-base font-semibold text-gray-600">Qty:</span>
                    <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <button @click="handleUpdateQuantity(item.quantity - 1)"
                            class="bg-white hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 w-10 h-10 rounded-lg shadow-sm"
                            :aria-label="`Decrease quantity for ${item.product.name}`">
                            <i class="pi pi-minus text-sm" aria-hidden="true"></i>
                        </button>
                        <span class="text-center font-bold text-lg w-12 text-gray-900">{{ item.quantity }}</span>
                        <button @click="handleUpdateQuantity(item.quantity + 1)"
                            class="bg-white hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 w-10 h-10 rounded-lg shadow-sm"
                            :aria-label="`Increase quantity for ${item.product.name}`">
                            <i class="pi pi-plus text-sm" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Total Price and Remove Button -->
            <div class="text-right flex-shrink-0 w-32">
                <p class="text-2xl font-extrabold mb-3 text-gray-900">₱{{ (item.product.price *
                    item.quantity).toFixed(2) }}</p>
                <button @click="handleRemove"
                    class="text-sm font-semibold hover:underline transition-colors duration-200 flex items-center gap-1 text-red-600 ml-auto"
                    :aria-label="`Remove ${item.product.name} from bag`">
                    <i class="pi pi-times text-xs" aria-hidden="true"></i>
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props: Receive data from parent
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    }
})

// Emits: Send events to parent
const emit = defineEmits(['toggle-select', 'update-quantity', 'remove'])

// Event handlers
const handleToggleSelect = () => {
    emit('toggle-select', props.item.product.id)
}

const handleUpdateQuantity = (newQuantity) => {
    emit('update-quantity', props.item.product.id, newQuantity)
}

const handleRemove = () => {
    emit('remove', props.item.product.id)
}
</script>

<style scoped>
/* Scoped styles for any custom overrides (minimal here, as we're using Tailwind) */
</style>