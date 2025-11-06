<template>
  <div class="pos-container">
    <div class="pos-header">
      <h1 class="pos-title">
        <i class="pi pi-calculator"></i>
        POS Terminal
      </h1>
      <div class="pos-status">
        <span class="status-item">
          <i class="pi pi-user"></i>
          {{ currentUser }}
        </span>
        <span class="status-item">
          <i class="pi pi-clock"></i>
          {{ currentTime }}
        </span>
      </div>
    </div>

    <div class="pos-content">
      <!-- Product Search Panel -->
      <div class="product-panel">
        <ProductSearch
          @product-selected="handleProductSelected"
          @show-toast="showToast"
        />
      </div>

      <!-- Cart and Payment Panel -->
      <div class="cart-panel">
        <!-- Shopping Cart View -->
        <ShoppingCart
          v-if="currentView === 'cart'"
          @proceed-to-payment="showPaymentView"
          @show-toast="showToast"
        />

        <!-- Payment View -->
        <PaymentInterface
          v-else-if="currentView === 'payment'"
          @payment-complete="handlePaymentComplete"
          @back-to-cart="showCartView"
          @show-toast="showToast"
        />
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
        @click="removeToast(toast.id)"
      >
        <i :class="getToastIcon(toast.type)"></i>
        <span>{{ toast.message }}</span>
        <button class="toast-close">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductSearch from '@/components/POS/ProductSearch.vue';
import ShoppingCart from '@/components/POS/ShoppingCart.vue';
import PaymentInterface from '@/components/POS/PaymentInterface.vue';

// State
const currentView = ref('cart'); // 'cart' or 'payment'
const currentTime = ref('');
const currentUser = ref('Cashier'); // Will be updated with actual user data
const toasts = ref([]);
const timeInterval = ref(null);

// Methods
const handleProductSelected = (product) => {
  // Focus back to cart when product is added
  if (currentView.value === 'cart') {
    // Could add cart highlighting or animation here
  }
};

const showPaymentView = () => {
  currentView.value = 'payment';
};

const showCartView = () => {
  currentView.value = 'cart';
};

const handlePaymentComplete = (transaction) => {
  // After successful payment, you could:
  // 1. Print receipt automatically
  // 2. Show a success animation
  // 3. Reset to cart view for next transaction

  // For now, we'll show the receipt modal in PaymentInterface component
  // and let it handle the new transaction flow
};

const showToast = (toast) => {
  const toastId = Date.now() + Math.random();
  const newToast = {
    id: toastId,
    type: toast.type || 'info',
    message: toast.message,
    duration: toast.duration || 3000
  };

  toasts.value.push(newToast);

  // Auto remove toast after duration
  setTimeout(() => {
    removeToast(toastId);
  }, newToast.duration);
};

const removeToast = (toastId) => {
  const index = toasts.value.findIndex(toast => toast.id === toastId);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

const getToastIcon = (type) => {
  const icons = {
    success: 'pi pi-check-circle',
    error: 'pi pi-exclamation-circle',
    warning: 'pi pi-exclamation-triangle',
    info: 'pi pi-info-circle'
  };
  return icons[type] || icons.info;
};

const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const getCurrentUser = () => {
  // Get user info from localStorage or auth system
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName') || 'Current User';

  // Set display name based on role
  if (userRole) {
    currentUser.value = userName.charAt(0).toUpperCase() + userName.slice(1);
  } else {
    currentUser.value = 'Guest';
  }
};

// Handle keyboard shortcuts
const handleKeyboardShortcuts = (event) => {
  // Ctrl/Cmd + P: Focus on search (when in cart view)
  if ((event.ctrlKey || event.metaKey) && event.key === 'p' && currentView.value === 'cart') {
    event.preventDefault();
    // Could focus search input here
  }

  // Escape: Go back to cart view from payment
  if (event.key === 'Escape' && currentView.value === 'payment') {
    showCartView();
  }

  // F1: Show help (could implement help modal)
  if (event.key === 'F1') {
    event.preventDefault();
    // Could show help modal here
  }
};

// Lifecycle
onMounted(() => {
  // Initialize current time and update every second
  updateCurrentTime();
  timeInterval.value = setInterval(updateCurrentTime, 1000);

  // Get current user info
  getCurrentUser();

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyboardShortcuts);

  // Initialize with a welcome toast
  showToast({
    type: 'info',
    message: 'POS Terminal ready. Start adding products to cart.',
    duration: 2000
  });
});

onUnmounted(() => {
  // Clean up interval
  if (timeInterval.value) {
    clearInterval(timeInterval.value);
  }

  // Remove keyboard event listener
  document.removeEventListener('keydown', handleKeyboardShortcuts);
});
</script>

<style scoped>
.pos-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f4f6f9;
  font-family: 'Poppins', sans-serif;
}

/* POS Header */
.pos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 2px solid #e1e5e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.pos-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pos-status {
  display: flex;
  gap: 1.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
}

.status-item i {
  color: #FF6347;
}

/* POS Content */
.pos-content {
  flex: 1;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

/* Product Panel */
.product-panel {
  flex: 7;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Cart Panel */
.cart-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Toast Container */
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  animation: slideIn 0.2s ease-out;
  font-size: 0.9rem;
  font-weight: 500;
}

.toast:hover {
  transform: translateX(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.toast.success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.toast.error {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.toast.warning {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.toast.info {
  background: #d1ecf1;
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}

.toast i {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.toast span {
  flex: 1;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin-left: 0.5rem;
}

.toast-close:hover {
  opacity: 1;
}

/* Animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .pos-content {
    flex-direction: column;
  }

  .product-panel,
  .cart-panel {
    flex: 1;
    width: 100%;
  }

  .cart-panel {
    max-height: 50vh;
  }
}

@media (max-width: 768px) {
  .pos-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .pos-title {
    font-size: 1.2rem;
    justify-content: center;
  }

  .pos-status {
    justify-content: center;
    gap: 1rem;
  }

  .pos-content {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
  }

  .toast {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .pos-header {
    padding: 0.75rem;
  }

  .pos-title {
    font-size: 1.1rem;
  }

  .pos-status {
    flex-direction: column;
    gap: 0.5rem;
  }

  .status-item {
    justify-content: center;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .pos-content {
    padding: 0.25rem;
    gap: 0.25rem;
  }
}

/* Print Styles */
@media print {
  .pos-header,
  .toast-container {
    display: none !important;
  }

  .pos-content {
    flex-direction: column;
    height: auto;
  }

  .product-panel {
    display: none;
  }

  .cart-panel {
    height: auto;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .toast {
    animation: none;
  }

  .toast:hover {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .pos-header {
    border-bottom-width: 3px;
  }

  .status-item {
    border: 1px solid currentColor;
  }

  .toast {
    border-width: 2px;
  }
}
</style>