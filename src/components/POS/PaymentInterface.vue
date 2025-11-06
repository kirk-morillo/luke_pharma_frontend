<template>
  <div class="payment-interface">
    <div class="payment-header">
      <h2 class="payment-title">
        <i class="pi pi-credit-card"></i>
        Payment
      </h2>
    </div>

    <div class="payment-content">
      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-items">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="summary-item"
          >
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-quantity">{{ item.quantity }} {{ item.unit }}{{ item.quantity > 1 ? 's' : '' }}</span>
            </div>
            <span class="item-price">₱{{ item.subtotal.toFixed(2) }}</span>
          </div>
        </div>

        <div class="summary-totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₱{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="total-row">
            <span>VAT (12%):</span>
            <span>₱{{ tax.toFixed(2) }}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Due:</span>
            <span>₱{{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="payment-form">
        <h3 class="form-title">Cash Payment</h3>

        <div class="cash-amount-section">
          <label for="cash-amount" class="cash-label">Cash Amount:</label>
          <div class="cash-input-group">
            <span class="currency-symbol">₱</span>
            <input
              id="cash-amount"
              v-model.number="cashAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="cash-input"
              @input="calculateChange"
              ref="cashInput"
            />
          </div>
          <div v-if="cashAmountError" class="error-message">
            {{ cashAmountError }}
          </div>
        </div>

        <!-- Quick Amount Buttons -->
        <div class="quick-amounts">
          <span class="quick-amounts-label">Quick Amount:</span>
          <div class="quick-amount-buttons">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              @click="setCashAmount(amount)"
              class="quick-amount-btn"
            >
              ₱{{ amount.toFixed(2) }}
            </button>
          </div>
        </div>

        <!-- Change Calculation -->
        <div v-if="cashAmount > 0" class="change-section">
          <div class="change-row" :class="{ 'positive-change': changeAmount >= 0, 'negative-change': changeAmount < 0 }">
            <span class="change-label">Change:</span>
            <span class="change-amount">
              {{ changeAmount >= 0 ? '+' : '' }}₱{{ Math.abs(changeAmount).toFixed(2) }}
            </span>
          </div>

          <!-- Payment Status -->
          <div class="payment-status">
            <div v-if="changeAmount >= 0" class="status-success">
              <i class="pi pi-check-circle"></i>
              <span>Payment sufficient</span>
            </div>
            <div v-else class="status-error">
              <i class="pi pi-exclamation-circle"></i>
              <span>Insufficient amount by ₱{{ Math.abs(changeAmount).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Actions -->
        <div class="payment-actions">
          <button
            @click="cancelPayment"
            class="cancel-btn"
          >
            <i class="pi pi-arrow-left"></i>
            Back to Cart
          </button>
          <button
            @click="processPayment"
            class="pay-btn"
            :disabled="!canProcessPayment"
            :class="{ 'processing': isProcessing }"
          >
            <i class="pi pi-check"></i>
            {{ isProcessing ? 'Processing...' : 'Complete Payment' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceipt" class="modal-overlay" @click="closeReceipt">
      <div class="receipt-modal" @click.stop>
        <div class="receipt-header">
          <h3>Transaction Complete</h3>
          <button @click="closeReceipt" class="modal-close">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div class="receipt-content">
          <div class="receipt-success">
            <i class="pi pi-check-circle"></i>
            <p>Payment processed successfully!</p>
          </div>

          <div v-if="currentTransaction" class="receipt-details">
            <div class="receipt-info">
              <div class="info-row">
                <span>Transaction ID:</span>
                <span>{{ currentTransaction.id }}</span>
              </div>
              <div class="info-row">
                <span>Date & Time:</span>
                <span>{{ formatDate(currentTransaction.timestamp) }}</span>
              </div>
              <div class="info-row">
                <span>Cashier:</span>
                <span>{{ currentTransaction.cashier }}</span>
              </div>
            </div>

            <div class="receipt-summary">
              <div class="summary-row">
                <span>Total Amount:</span>
                <span>₱{{ currentTransaction.grandTotal.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Cash Received:</span>
                <span>₱{{ currentTransaction.cashAmount.toFixed(2) }}</span>
              </div>
              <div class="summary-row change-row">
                <span>Change:</span>
                <span>₱{{ currentTransaction.change.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="receipt-actions">
            <button @click="printReceipt" class="print-btn">
              <i class="pi pi-print"></i>
              Print Receipt
            </button>
            <button @click="newTransaction" class="new-transaction-btn">
              <i class="pi pi-plus"></i>
              New Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { usePosStore } from '@/stores/posStore.js';

// Emits
const emit = defineEmits(['payment-complete', 'back-to-cart', 'show-toast']);

// Store
const {
  cartIsEmpty,
  getCartItems,
  getGrandTotal,
  processPayment: processStorePayment,
  clearCart,
  getCurrentTransaction
} = usePosStore();

// Refs
const cashInput = ref(null);

// Local state
const cashAmount = ref(0);
const cashAmountError = ref('');
const isProcessing = ref(false);
const showReceipt = ref(false);

// Computed
const cartItems = computed(() => getCartItems());
const grandTotal = computed(() => getGrandTotal());
const currentTransaction = computed(() => getCurrentTransaction());

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.subtotal, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.12; // 12% VAT
});

const changeAmount = computed(() => {
  return cashAmount.value - grandTotal.value;
});

const canProcessPayment = computed(() => {
  return cashAmount.value >= grandTotal.value && cashAmount.value > 0 && !isProcessing.value;
});

// Quick amount buttons (rounded up totals)
const quickAmounts = computed(() => {
  const total = grandTotal.value;
  if (total === 0) return [100, 200, 500, 1000];

  // Create quick amounts: exact total, and common bill denominations above total
  const amounts = [];

  // Round up to nearest 50
  const roundedUp = Math.ceil(total / 50) * 50;
  amounts.push(roundedUp);

  // Add common bill denominations
  const denominations = [100, 200, 500, 1000];
  denominations.forEach(denom => {
    if (denom > total && !amounts.includes(denom)) {
      amounts.push(denom);
    }
  });

  return amounts.slice(0, 4);
});

// Methods
const calculateChange = () => {
  cashAmountError.value = '';

  if (cashAmount.value < 0) {
    cashAmount.value = 0;
    return;
  }

  if (cashAmount.value > 0 && cashAmount.value < grandTotal.value) {
    cashAmountError.value = `Amount is insufficient by ₱${(grandTotal.value - cashAmount.value).toFixed(2)}`;
  }
};

const setCashAmount = (amount) => {
  cashAmount.value = amount;
  calculateChange();
};

const processPayment = async () => {
  if (!canProcessPayment.value) return;

  isProcessing.value = true;

  try {
    const transaction = processStorePayment(cashAmount.value);

    // Show success message
    emit('show-toast', {
      type: 'success',
      message: 'Payment processed successfully!'
    });

    // Show receipt modal
    showReceipt.value = true;

    // Emit payment complete event
    emit('payment-complete', transaction);

  } catch (error) {
    emit('show-toast', {
      type: 'error',
      message: error.message || 'Payment processing failed'
    });
  } finally {
    isProcessing.value = false;
  }
};

const cancelPayment = () => {
  emit('back-to-cart');
};

const closeReceipt = () => {
  showReceipt.value = false;
};

const printReceipt = () => {
  if (!currentTransaction.value) return;

  // Create receipt content
  const receiptContent = generateReceiptContent(currentTransaction.value);

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - Transaction ${currentTransaction.value.id}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              margin: 20px;
              line-height: 1.4;
            }
            .receipt {
              max-width: 400px;
              margin: 0 auto;
            }
            .header { text-align: center; margin-bottom: 20px; }
            .line { margin: 5px 0; }
            .total { border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <pre>${receiptContent}</pre>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  emit('show-toast', {
    type: 'success',
    message: 'Receipt sent to printer'
  });
};

const generateReceiptContent = (transaction) => {
  const items = transaction.items.map(item =>
    `${item.name.padEnd(25)} ${item.quantity}x ${item.price.toFixed(2)}\n` +
    `${''.padEnd(25)} ${item.subtotal.toFixed(2)}`
  ).join('\n\n');

  return `
LUKE PHARMA CO.
123 Pharmacy Street
Tel: 123-456-7890

====================================
OFFICIAL RECEIPT
====================================

Transaction ID: ${transaction.id}
Date: ${formatDate(transaction.timestamp)}
Cashier: ${transaction.cashier}

-------------------------------------
ITEMS
-------------------------------------
${items}

-------------------------------------
Subtotal: ₱${transaction.subtotal.toFixed(2)}
VAT (12%): ₱${transaction.tax.toFixed(2)}
Total: ₱${transaction.grandTotal.toFixed(2)}
Cash: ₱${transaction.cashAmount.toFixed(2)}
Change: ₱${transaction.change.toFixed(2)}
====================================
THANK YOU FOR SHOPPING!
====================================
  `;
};

const newTransaction = () => {
  clearCart();
  cashAmount.value = 0;
  cashAmountError.value = '';
  showReceipt.value = false;

  emit('show-toast', {
    type: 'success',
    message: 'Ready for new transaction'
  });

  emit('back-to-cart');
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// Lifecycle
onMounted(() => {
  // Focus on cash input when component mounts
  nextTick(() => {
    if (cashInput.value) {
      cashInput.value.focus();
    }
  });
});
</script>

<style scoped>
.payment-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Payment Header */
.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid #e1e5e9;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.payment-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Payment Content */
.payment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Order Summary */
.order-summary {
  padding: 1.5rem;
  border-bottom: 2px solid #e1e5e9;
  background: #f8f9fa;
}

.summary-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.summary-items {
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 500;
  font-size: 0.9rem;
  color: #2c3e50;
  display: block;
  margin-bottom: 0.25rem;
}

.item-quantity {
  font-size: 0.8rem;
  color: #6c757d;
}

.item-price {
  font-weight: 600;
  font-size: 0.9rem;
  color: #FF6347;
}

.summary-totals {
  border-top: 1px solid #e1e5e9;
  padding-top: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.grand-total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #FF6347;
  padding-top: 0.5rem;
  border-top: 1px solid #e1e5e9;
}

/* Payment Form */
.payment-form {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-title {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Cash Amount Section */
.cash-amount-section {
  margin-bottom: 1.5rem;
}

.cash-label {
  display: block;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.cash-input-group {
  display: flex;
  align-items: center;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.cash-input-group:focus-within {
  border-color: #FF6347;
}

.currency-symbol {
  padding: 1rem;
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  border-right: 1px solid #e1e5e9;
}

.cash-input {
  flex: 1;
  padding: 1rem;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-align: right;
}

.cash-input:focus {
  outline: none;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Quick Amounts */
.quick-amounts {
  margin-bottom: 1.5rem;
}

.quick-amounts-label {
  display: block;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.quick-amount-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.quick-amount-btn {
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.2s;
}

.quick-amount-btn:hover {
  background: #FF6347;
  color: white;
  border-color: #FF6347;
}

/* Change Section */
.change-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 6px;
  background: #f8f9fa;
}

.change-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.change-label {
  font-weight: 500;
  color: #2c3e50;
}

.change-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.positive-change .change-amount {
  color: #28a745;
}

.negative-change .change-amount {
  color: #dc3545;
}

.payment-status {
  text-align: center;
}

.status-success,
.status-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-success {
  color: #28a745;
}

.status-error {
  color: #dc3545;
}

/* Payment Actions */
.payment-actions {
  margin-top: auto;
  display: flex;
  gap: 1rem;
}

.cancel-btn,
.pay-btn {
  flex: 1;
  padding: 1rem;
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
  transition: all 0.2s;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background: #5a6268;
}

.pay-btn {
  background: #28a745;
  color: white;
}

.pay-btn:hover:not(:disabled) {
  background: #218838;
}

.pay-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.pay-btn.processing {
  background: #17a2b8;
}

/* Receipt Modal */
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

.receipt-modal {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e5e9;
}

.receipt-header h3 {
  margin: 0;
  font-size: 1.2rem;
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

.receipt-content {
  padding: 1.5rem;
}

.receipt-success {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #d4edda;
  border-radius: 6px;
  color: #155724;
}

.receipt-success i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.receipt-details {
  margin-bottom: 1.5rem;
}

.receipt-info {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.receipt-summary {
  border-top: 1px solid #e1e5e9;
  padding-top: 1rem;
}

.receipt-actions {
  display: flex;
  gap: 1rem;
}

.print-btn,
.new-transaction-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.print-btn {
  background: #17a2b8;
  color: white;
}

.print-btn:hover {
  background: #138496;
}

.new-transaction-btn {
  background: #FF6347;
  color: white;
}

.new-transaction-btn:hover {
  background: #e8533b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .payment-content {
    overflow-y: auto;
  }

  .quick-amount-buttons {
    justify-content: space-between;
  }

  .quick-amount-btn {
    flex: 1;
    min-width: 0;
  }

  .receipt-modal {
    margin: 1rem;
    max-height: 90vh;
  }
}

@media (max-width: 480px) {
  .order-summary,
  .payment-form {
    padding: 1rem;
  }

  .payment-actions {
    flex-direction: column;
  }

  .receipt-actions {
    flex-direction: column;
  }
}
</style>