import { reactive, computed } from 'vue';
import { sampleProducts } from '@/data/sampleProducts.js';

// POS state management using Vue 3 Composition API
const state = reactive({
  cart: {
    items: [],
    subtotal: 0,
    tax: 0,
    grandTotal: 0
  },
  products: [...sampleProducts],
  currentTransaction: null,
  transactionHistory: [],
  searchQuery: '',
  selectedCategory: '',
  selectedSubcategory: ''
});

// Tax rate (12% VAT for Philippines)
const TAX_RATE = 0.12;

// Computed properties
export const cartItemCount = computed(() => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
});

export const cartIsEmpty = computed(() => {
  return state.cart.items.length === 0;
});

export const filteredProducts = computed(() => {
  let filtered = state.products;

  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (state.selectedCategory) {
    filtered = filtered.filter(product =>
      product.category === state.selectedCategory
    );
  }

  // Filter by subcategory
  if (state.selectedSubcategory) {
    filtered = filtered.filter(product =>
      product.subcategory === state.selectedSubcategory
    );
  }

  return filtered;
});

// Cart operations
export const addToCart = (productId, quantity = 1) => {
  const product = state.products.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    throw new Error(`Insufficient stock. Only ${product.stock} units available.`);
  }

  const existingItem = state.cart.items.find(item => item.id === productId);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.stock < newQuantity) {
      throw new Error(`Insufficient stock. Only ${product.stock} units available.`);
    }
    existingItem.quantity = newQuantity;
    existingItem.subtotal = existingItem.price * newQuantity;
  } else {
    state.cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      subtotal: product.price * quantity,
      sku: product.sku,
      unit: product.unit
    });
  }

  calculateTotals();
};

export const removeFromCart = (productId) => {
  const index = state.cart.items.findIndex(item => item.id === productId);
  if (index > -1) {
    state.cart.items.splice(index, 1);
    calculateTotals();
  }
};

export const updateQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const product = state.products.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock < newQuantity) {
    throw new Error(`Insufficient stock. Only ${product.stock} units available.`);
  }

  const cartItem = state.cart.items.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    cartItem.subtotal = cartItem.price * newQuantity;
    calculateTotals();
  }
};

export const clearCart = () => {
  state.cart.items = [];
  state.cart.subtotal = 0;
  state.cart.tax = 0;
  state.cart.grandTotal = 0;
  state.currentTransaction = null;
};

export const calculateTotals = () => {
  state.cart.subtotal = state.cart.items.reduce((total, item) => total + item.subtotal, 0);
  state.cart.tax = state.cart.subtotal * TAX_RATE;
  state.cart.grandTotal = state.cart.subtotal + state.cart.tax;
};

// Payment processing
export const processPayment = (cashAmount) => {
  if (cartIsEmpty.value) {
    throw new Error('Cart is empty. Cannot process payment.');
  }

  if (cashAmount < state.cart.grandTotal) {
    throw new Error('Insufficient cash amount.');
  }

  const change = cashAmount - state.cart.grandTotal;

  // Create transaction record
  const transaction = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    items: [...state.cart.items],
    subtotal: state.cart.subtotal,
    tax: state.cart.tax,
    grandTotal: state.cart.grandTotal,
    cashAmount: cashAmount,
    change: change,
    cashier: 'Current User' // Will be updated with actual user data
  };

  // Update stock levels
  state.cart.items.forEach(cartItem => {
    const product = state.products.find(p => p.id === cartItem.id);
    if (product) {
      product.stock -= cartItem.quantity;
    }
  });

  // Save transaction
  state.currentTransaction = transaction;
  state.transactionHistory.unshift(transaction);

  return transaction;
};

// Search and filter operations
export const setSearchQuery = (query) => {
  state.searchQuery = query;
};

export const setSelectedCategory = (category) => {
  state.selectedCategory = category;
  state.selectedSubcategory = ''; // Reset subcategory when category changes
};

export const setSelectedSubcategory = (subcategory) => {
  state.selectedSubcategory = subcategory;
};

export const clearFilters = () => {
  state.searchQuery = '';
  state.selectedCategory = '';
  state.selectedSubcategory = '';
};

// Receipt generation
export const generateReceipt = (transactionId) => {
  const transaction = state.transactionHistory.find(t => t.id === transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  const receiptLines = [
    'LUKE PHARMA CO.',
    '123 Pharmacy Street',
    'Tel: 123-456-7890',
    '',
    '====================',
    'OFFICIAL RECEIPT',
    '====================',
    '',
    `Transaction ID: ${transaction.id}`,
    `Date: ${new Date(transaction.timestamp).toLocaleString()}`,
    `Cashier: ${transaction.cashier}`,
    '',
    '---------------------',
    'ITEMS',
    '---------------------'
  ];

  transaction.items.forEach(item => {
    receiptLines.push(`${item.name}`);
    receiptLines.push(`  ${item.quantity} ${item.unit} @ ₱${item.price.toFixed(2)}`);
    receiptLines.push(`  Subtotal: ₱${item.subtotal.toFixed(2)}`);
    receiptLines.push('');
  });

  receiptLines.push('---------------------');
  receiptLines.push(`Subtotal: ₱${transaction.subtotal.toFixed(2)}`);
  receiptLines.push(`VAT (12%): ₱${transaction.tax.toFixed(2)}`);
  receiptLines.push(`Total: ₱${transaction.grandTotal.toFixed(2)}`);
  receiptLines.push(`Cash: ₱${transaction.cashAmount.toFixed(2)}`);
  receiptLines.push(`Change: ₱${transaction.change.toFixed(2)}`);
  receiptLines.push('====================');
  receiptLines.push('THANK YOU FOR SHOPPING!');
  receiptLines.push('====================');

  return receiptLines.join('\n');
};

// Export state for direct access if needed
export const usePosStore = () => {
  return {
    // State
    state,

    // Computed
    cartItemCount,
    cartIsEmpty,
    filteredProducts,

    // Cart operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotals,

    // Payment
    processPayment,

    // Search and filter
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubcategory,
    clearFilters,

    // Receipt
    generateReceipt,

    // Getters
    getGrandTotal: () => state.cart.grandTotal,
    getCartItems: () => state.cart.items,
    getTransactionHistory: () => state.transactionHistory,
    getCurrentTransaction: () => state.currentTransaction
  };
};