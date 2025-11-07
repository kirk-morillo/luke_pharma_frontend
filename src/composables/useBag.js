import { ref, computed, watch } from 'vue'

const bagState = ref({
  items: [],
  total: 0,
  itemCount: 0
})

// Load bag from localStorage on init
const loadBagFromStorage = () => {
  const savedBag = localStorage.getItem('lukePharmaBag')
  if (savedBag) {
    try {
      const parsed = JSON.parse(savedBag)
      bagState.value = parsed
    } catch (error) {
      console.error('Error loading bag from storage:', error)
    }
  }
}

// Save bag to localStorage
const saveBagToStorage = () => {
  localStorage.setItem('lukePharmaBag', JSON.stringify(bagState.value))
}

// Calculate totals
const calculateTotals = () => {
  bagState.value.total = bagState.value.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  bagState.value.itemCount = bagState.value.items.reduce((sum, item) => sum + item.quantity, 0)
}

// Initialize bag
loadBagFromStorage()
calculateTotals()

// Watch for changes and save to localStorage
watch(bagState, saveBagToStorage, { deep: true })

export const useBag = () => {
  const addToBag = (product, quantity = 1) => {
    const existingItemIndex = bagState.value.items.findIndex(item => item.product.id === product.id)

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      bagState.value.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      bagState.value.items.push({
        product,
        quantity,
        addedAt: new Date().toISOString()
      })
    }

    calculateTotals()
  }

  const removeFromBag = (productId) => {
    bagState.value.items = bagState.value.items.filter(item => item.product.id !== productId)
    calculateTotals()
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBag(productId)
      return
    }

    const item = bagState.value.items.find(item => item.product.id === productId)
    if (item) {
      item.quantity = quantity
      calculateTotals()
    }
  }

  const clearBag = () => {
    bagState.value.items = []
    calculateTotals()
  }

  const getBagItems = () => bagState.value.items

  const getTotalPrice = () => bagState.value.total

  const getItemCount = () => bagState.value.itemCount

  const generateBagCode = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `BAG-${timestamp.toString().slice(-4)}${random}`
  }

  const isInBag = (productId) => {
    return bagState.value.items.some(item => item.product.id === productId)
  }

  const getItemQuantity = (productId) => {
    const item = bagState.value.items.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  return {
    bagState: computed(() => bagState.value),
    addToBag,
    removeFromBag,
    updateQuantity,
    clearBag,
    getBagItems,
    getTotalPrice,
    getItemCount,
    generateBagCode,
    isInBag,
    getItemQuantity
  }
}