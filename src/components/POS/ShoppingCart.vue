<template>
  <div class="shopping-cart">
    <div class="cart-header">
      <h2 class="cart-title">
        <i class="pi pi-shopping-cart"></i>
        Shopping Cart
        <span v-if="cartItemCount > 0" class="cart-count">({{ cartItemCount }})</span>
      </h2>
      <button
        v-if="!cartIsEmpty"
        @click="clearCart"
        class="clear-cart-btn"
        title="Clear Cart"
      >
        <i class="pi pi-trash"></i>
      </button>
    </div>

    <div class="cart-content">
      <!-- Empty Cart -->
      <div v-if="cartIsEmpty" class="empty-cart">
        <i class="pi pi-shopping-cart"></i>
        <p>Your cart is empty</p>
        <p class="empty-cart-hint">Add products to start a transaction</p>
      </div>

      <!-- Cart Items -->
      <div v-else class="cart-items">
        <div class="items-list">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="cart-item"
          >
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-sku">{{ item.sku }}</div>
              <div class="item-price">₱{{ item.price.toFixed(2) }} / {{ item.unit }}</div>
            </div>

            <div class="item-quantity">
              <button
                @click="decreaseQuantity(item.id)"
                class="quantity-btn quantity-decrease"
                :disabled="item.quantity <= 1"
              >
                <i class="pi pi-minus"></i>
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item.id)"
                class="quantity-btn quantity-increase"
              >
                <i class="pi pi-plus"></i>
              </button>
            </div>

            <div class="item-subtotal">
              <div class="subtotal-label">Subtotal</div>
              <div class="subtotal-value">₱{{ item.subtotal.toFixed(2) }}</div>
            </div>

            <button
              @click="removeItem(item.id)"
              class="remove-item-btn"
              title="Remove Item"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-row">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value">₱{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row tax-row">
            <span class="summary-label">VAT (12%):</span>
            <span class="summary-value">₱{{ tax.toFixed(2) }}</span>
          </div>
          <div class="summary-row total-row">
            <span class="summary-label">Total:</span>
            <span class="summary-value total-amount">₱{{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Cart Actions -->
        <div class="cart-actions">
          <button
            @click="proceedToPayment"
            class="checkout-btn"
            :disabled="cartIsEmpty"
          >
            <i class="pi pi-credit-card"></i>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Remove Item Confirmation Modal -->
    <div v-if="showRemoveModal" class="modal-overlay" @click="cancelRemove">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Remove Item</h3>
          <button @click="cancelRemove" class="modal-close">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to remove {{ itemToRemove?.name }} from the cart?</p>
        </div>
        <div class="modal-actions">
          <button @click="cancelRemove" class="btn-cancel">Cancel</button>
          <button @click="confirmRemove" class="btn-remove">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePosStore } from '@/stores/posStore.js';

// Emits
const emit = defineEmits(['proceed-to-payment', 'show-toast']);

// Store
const {
  cartIsEmpty,
  cartItemCount,
  getCartItems,
  getGrandTotal,
  removeFromCart,
  updateQuantity,
  clearCart
} = usePosStore();

// Local state
const showRemoveModal = ref(false);
const itemToRemove = ref(null);

// Computed
const cartItems = computed(() => getCartItems());
const grandTotal = computed(() => getGrandTotal());

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.subtotal, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.12; // 12% VAT
});

// Methods
const increaseQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    try {
      updateQuantity(productId, item.quantity + 1);
    } catch (error) {
      emit('show-toast', {
        type: 'error',
        message: error.message
      });
    }
  }
};

const decreaseQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item && item.quantity > 1) {
    updateQuantity(productId, item.quantity - 1);
  }
};

const removeItem = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    itemToRemove.value = item;
    showRemoveModal.value = true;
  }
};

const confirmRemove = () => {
  if (itemToRemove.value) {
    removeFromCart(itemToRemove.value.id);
    emit('show-toast', {
      type: 'success',
      message: `${itemToRemove.value.name} removed from cart`
    });
  }
  cancelRemove();
};

const cancelRemove = () => {
  showRemoveModal.value = false;
  itemToRemove.value = null;
};

const proceedToPayment = () => {
  if (!cartIsEmpty.value) {
    emit('proceed-to-payment');
  }
};
</script>

<style scoped>
.shopping-cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Cart Header */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid #e1e5e9;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.cart-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-count {
  font-size: 0.9rem;
  font-weight: 400;
  color: #FF6347;
}

.clear-cart-btn {
  padding: 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-cart-btn:hover {
  background: #c82333;
}

/* Cart Content */
.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Empty Cart */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  height: 100%;
}

.empty-cart i {
  font-size: 3rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.empty-cart p {
  margin: 0.5rem 0;
  color: #6c757d;
}

.empty-cart-hint {
  font-size: 0.9rem;
  color: #adb5bd;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.items-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Cart Item */
.cart-item {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  background: #f8f9fa;
  transition: all 0.2s;
}

.cart-item:hover {
  background: #fff5f4;
  border-color: #FF6347;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.item-sku {
  font-size: 0.7rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.item-price {
  font-size: 0.8rem;
  color: #FF6347;
  font-weight: 500;
}

/* Quantity Controls */
.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 0.8rem;
}

.quantity-btn:hover:not(:disabled) {
  border-color: #FF6347;
  background: #fff5f4;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Item Subtotal */
.item-subtotal {
  text-align: right;
  min-width: 80px;
}

.subtotal-label {
  font-size: 0.7rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.subtotal-value {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
}

/* Remove Item Button */
.remove-item-btn {
  width: 2rem;
  height: 2rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  font-size: 0.8rem;
}

.remove-item-btn:hover {
  background: #c82333;
}

/* Cart Summary */
.cart-summary {
  padding: 1rem 1.5rem;
  border-top: 2px solid #e1e5e9;
  background: #f8f9fa;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.summary-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.summary-value {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
}

.tax-row {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.total-row {
  margin-bottom: 0;
}

.total-amount {
  font-size: 1.2rem;
  color: #FF6347;
}

/* Cart Actions */
.cart-actions {
  padding: 1rem 1.5rem;
  border-top: 2px solid #e1e5e9;
  background: white;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #FF6347;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.checkout-btn:hover:not(:disabled) {
  background: #e8533b;
}

.checkout-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.modal-close {
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background: #f8f9fa;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0;
  color: #2c3e50;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e1e5e9;
  justify-content: flex-end;
}

.btn-cancel,
.btn-remove {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.2s;
}

.btn-cancel {
  background: #e1e5e9;
  color: #6c757d;
}

.btn-cancel:hover {
  background: #d1d5db;
}

.btn-remove {
  background: #dc3545;
  color: white;
}

.btn-remove:hover {
  background: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .item-quantity,
  .item-subtotal,
  .remove-item-btn {
    justify-self: start;
  }

  .modal {
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .cart-header {
    padding: 1rem;
  }

  .items-list {
    padding: 0.75rem;
  }

  .cart-item {
    padding: 0.75rem;
  }

  .cart-summary,
  .cart-actions {
    padding: 1rem;
  }
}
</style>