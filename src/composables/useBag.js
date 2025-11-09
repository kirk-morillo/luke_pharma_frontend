import { ref, computed, watch } from 'vue'
import { showSuccessAlert, showConfirmationAlert, showErrorAlert, showOrderSuccessAlert } from '@/utils/sweetAlertConfig.js'

const bagState = ref({
  items: [],
  total: 0,
  itemCount: 0
})

// --- Core Helper Functions ---

// Calculate totals defensively
const calculateTotals = () => {
  // 🟢 FIX 1: Use defensive check (|| 0) for selling_price to prevent NaN if product data is missing
  bagState.value.total = bagState.value.items.reduce((sum, item) => {
    const price = item.product?.selling_price || 0; // Use optional chaining and default to 0
    return sum + (price * item.quantity);
  }, 0);
  bagState.value.itemCount = bagState.value.items.reduce((sum, item) => sum + item.quantity, 0)
}

// Save bag to localStorage
const saveBagToStorage = () => {
  localStorage.setItem('lukePharmaBag', JSON.stringify(bagState.value))
}

// Load bag from localStorage on init
const loadBagFromStorage = () => {
  const savedBag = localStorage.getItem('lukePharmaBag')
  if (savedBag) {
    try {
      const parsed = JSON.parse(savedBag)
      
      // 🟢 FIX 2: Defensive assignment for robust loading
      bagState.value.items = Array.isArray(parsed.items) ? parsed.items : []
      bagState.value.total = parsed.total || 0
      bagState.value.itemCount = parsed.itemCount || 0

      // Immediately run calculateTotals to fix any totals corrupted by previous code versions
      calculateTotals() 
      
    } catch (error) {
      console.error('Error loading bag from storage: Corrupt data detected, clearing bag.', error)
      // 🟢 FIX 3: If JSON parsing fails, clear the corrupt data from storage.
      localStorage.removeItem('lukePharmaBag')
      // Reset state to empty
      bagState.value = { items: [], total: 0, itemCount: 0 }
    }
  }
}

// Internal function to perform the removal logic
const performRemove = (productId) => {
  // 🟢 All good: Searches by item.product.product_id
  const item = bagState.value.items.find(item => item.product?.product_id === productId)
  if (!item) return false

  // 🟢 All good: Filters by item.product.product_id
  bagState.value.items = bagState.value.items.filter(i => i.product?.product_id !== productId)
  calculateTotals()
  
  // Use item_name for better feedback
  return item.product?.item_name || item.product?.name // Use optional chaining for safety
}


// Initialize bag: Load data first, then recalculate just in case.
loadBagFromStorage()

// Watch for changes and save to localStorage
watch(bagState, saveBagToStorage, { deep: true })

// --- useBag Composable ---

export const useBag = () => {
  
  const addToBag = (product, quantity = 1, showFeedback = true) => {
    // 🟢 All good: Check existing item index using product_id
    const existingItemIndex = bagState.value.items.findIndex(item => item.product?.product_id === product.product_id)

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      bagState.value.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      bagState.value.items.push({
        product, // product object contains product_id, item_name, selling_price
        quantity,
        addedAt: new Date().toISOString()
      })
    }

    calculateTotals()

    if (showFeedback) {
      showSuccessAlert(
        'Added to Bag',
        // Use item_name for feedback
        `${product.item_name || product.name} has been added to your bag.`,
        true // Show "View Bag" button
      )
    }
  }

  const removeFromBag = (productId, skipConfirm = false) => {
    // 🟢 All good: Find item using product_id
    const item = bagState.value.items.find(item => item.product?.product_id === productId)
    if (!item) return

    if (skipConfirm) {
      performRemove(productId)
      return
    }

    // Show confirmation alert for manual removal
    showConfirmationAlert(
      'Remove Item',
      // Use item_name for confirmation
      `Remove ${item.product?.item_name || item.product?.name} from your bag?`,
      'Remove'
    ).then((result) => {
      if (result.isConfirmed) {
        const itemName = performRemove(productId)
        if (itemName) {
          showSuccessAlert('Item Removed', `${itemName} has been removed from your bag.`)
        }
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBag(productId)
      return
    }

    // 🟢 All good: Find item using product_id
    const item = bagState.value.items.find(item => item.product?.product_id === productId)
    if (item) {
      item.quantity = quantity
      calculateTotals()
    }
  }

  const clearBag = () => {
    if (bagState.value.items.length === 0) {
      showErrorAlert('Bag is Empty', 'Your bag is already empty.')
      return
    }

    showConfirmationAlert(
      'Clear Bag',
      'Are you sure you want to remove all items from your bag?',
      'Clear Bag'
    ).then((result) => {
      if (result.isConfirmed) {
        bagState.value.items = []
        calculateTotals()
        showSuccessAlert('Bag Cleared', 'All items have been removed from your bag.')
      }
    })
  }

  const completeOrder = () => {
    if (bagState.value.items.length === 0) {
      showErrorAlert('No Items', 'Your bag is empty. Add some items before completing your order.')
      return Promise.resolve(false)
    }

    const bagCode = generateBagCode()
    const totalAmount = bagState.value.total

    return showOrderSuccessAlert(bagCode, totalAmount).then(() => {
      // NOTE: We don't clear the bag here, because the BagView handles filtering/removing selected items after checkout.
      // If completeOrder is used in a context that requires full clear, this needs review.
      // For now, assume BagView handles the clean up of SELECTED items.
      return true
    })
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
    // 🟢 All good: Check item existence using product_id
    return bagState.value.items.some(item => item.product?.product_id === productId)
  }

  const getItemQuantity = (productId) => {
    // 🟢 All good: Get item quantity using product_id
    const item = bagState.value.items.find(item => item.product?.product_id === productId)
    return item ? item.quantity : 0
  }

  return {
    bagState: computed(() => bagState.value),
    addToBag,
    removeFromBag,
    updateQuantity,
    clearBag,
    completeOrder,
    getBagItems,
    getTotalPrice,
    getItemCount,
    generateBagCode,
    isInBag,
    getItemQuantity
  }
}