import { reactive, computed } from 'vue';
const API_URL = 'http://localhost:3000/api';

const state = reactive({
    cart: {
        items: [],
        subtotal: 0,
        tax: 0,
        grandTotal: 0
    },
    products: [],
    isLoading: false,
    error: null,
    currentTransaction: null,
    transactionHistory: [],
    searchQuery: '',
    selectedCategory: '',
    selectedSubcategory: ''
});

const TAX_RATE = 0.12;

// --- API ACTIONS ---

export const fetchProducts = async () => {
    state.isLoading = true;
    state.error = null;
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        state.products = data.map(p => ({
            // DB Fields
            product_id: p.product_id,
            item_name: p.item_name, 
            // 🛑 CRITICAL FIX: Ensure selling_price is a float for .toFixed() to work 
            selling_price: parseFloat(p.selling_price), 
            category: p.category || 'Other',
            brand: p.brand, 
            stock_quantity: p.stock_quantity, 
            
            // Store Aliases (used by logic)
            id: p.product_id,
            name: p.item_name, 
            // 🛑 CRITICAL FIX: Ensure price is a float
            price: parseFloat(p.selling_price), 
            stock: p.stock_quantity, 
            
            // Safety defaults for fields missing from API
            sku: 'N/A', 
            unit: 'pc',
            subcategory: p.subcategory || ''
        }));

    } catch (err) {
        state.error = 'Failed to load products from API. Check the Node.js server.';
        console.error('API Fetch Error:', err);
    } finally {
        state.isLoading = false;
    }
};

export const submitOrder = async (orderData) => {
    state.isLoading = true;
    state.error = null;
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Order submission failed on the server.');
        }
        
        console.log('Order successfully submitted to DB:', result);
        return result;

    } catch (err) {
        state.error = err.message;
        console.error('API Submission Error:', err);
        throw err;
    } finally {
        state.isLoading = false;
    }
};

export const fetchOrderItemsByBagCode = async (bagCode) => {
    state.isLoading = true;
    state.error = null;
    try {
        const response = await fetch(`${API_URL}/orders/code/${bagCode}`);

        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error('Order not found or has expired.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const orderData = await response.json();
        
        if (!orderData || !orderData.items || orderData.items.length === 0) {
            throw new Error('Order data is incomplete or missing items.');
        }

        const items = orderData.items.map(item => ({
             product_id: item.product_id,
             item_name: item.product_name || item.item_name, 
             selling_price: item.unit_price_at_sale || item.price, 
             quantity: item.quantity,
             item_image: item.item_image || null,
             status: orderData.status || 'Pending'
        }));


        return {
            items: items,
            total_amount: parseFloat(orderData.total_amount),
            status: orderData.status
        };

    } catch (err) {
        state.error = err.message || 'Failed to fetch order details.';
        console.error('API Fetch Order Error:', err);
        throw err;
    } finally {
        state.isLoading = false;
    }
};

// --- CORE LOGIC UPDATES ---

export const processPayment = async (cashAmount, customerName = 'Guest', bagCode = `BAG-${Date.now() % 10000}`) => {
    if (cartIsEmpty.value) {
        throw new Error('Cart is empty. Cannot process payment.');
    }

    if (cashAmount < state.cart.grandTotal) {
        throw new Error('Insufficient cash amount.');
    }

    const change = cashAmount - state.cart.grandTotal;

    const orderItemsForBackend = state.cart.items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price_at_sale: item.price,
        subtotal: item.subtotal
    }));

    const orderPayload = {
        customer_name: customerName,
        bag_code: bagCode,
        total_amount: state.cart.grandTotal,
        items: orderItemsForBackend
    };

    try {
        const dbResult = await submitOrder(orderPayload);
        
        const transaction = {
            id: dbResult.order_id.toString(),
            timestamp: new Date().toISOString(),
            items: [...state.cart.items],
            subtotal: state.cart.subtotal,
            tax: state.cart.tax,
            grandTotal: state.cart.grandTotal,
            cashAmount: cashAmount,
            change: change,
            bagCode: dbResult.bag_code,
            cashier: 'Current User'
        };

        state.currentTransaction = transaction;
        state.transactionHistory.unshift(transaction);

        clearCart();
        return transaction;

    } catch (e) {
        throw new Error(`Payment failed: Could not save order to database. (${e.message})`);
    }
};

// --- REST OF COMPOSABLE (No functional changes) ---

export const cartItemCount = computed(() => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
});

export const cartIsEmpty = computed(() => {
    return state.cart.items.length === 0;
});

export const filteredProducts = computed(() => {
    let filtered = state.products;

    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query)
        );
    }

    if (state.selectedCategory) {
        filtered = filtered.filter(product =>
            product.category === state.selectedCategory
        );
    }

    if (state.selectedSubcategory) {
        filtered = filtered.filter(product =>
            product.subcategory === state.selectedSubcategory
        );
    }

    return filtered;
});

export const addToCart = (productId, quantity = 1) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) {
        throw new Error('Product not found or not loaded from API');
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
            sku: product.sku || 'N/A', 
            unit: product.unit || 'pc' 
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
    state.cart.subtotal = state.cart.items.reduce((total, item) => total + parseFloat(item.subtotal), 0);
    state.cart.tax = state.cart.subtotal * TAX_RATE; 
    state.cart.grandTotal = state.cart.subtotal + state.cart.tax;
};

export const setSearchQuery = (query) => {
    state.searchQuery = query;
};

export const setSelectedCategory = (category) => {
    state.selectedCategory = category;
    state.selectedSubcategory = '';
};

export const setSelectedSubcategory = (subcategory) => {
    state.selectedSubcategory = subcategory;
};

export const clearFilters = () => {
    state.searchQuery = '';
    state.selectedCategory = '';
    state.selectedSubcategory = '';
};

export const generateReceipt = (transactionId) => {
    const transaction = state.transactionHistory.find(t => t.id === transactionId.toString()); 
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
        `Bag Code: ${transaction.bagCode || 'N/A'}`,
        '',
        '---------------------',
        'ITEMS',
        '---------------------'
    ];

    transaction.items.forEach(item => {
        receiptLines.push(`${item.name}`);
        receiptLines.push(`  ${item.quantity} ${item.unit} @ ₱${item.price.toFixed(2)}`);
        receiptLines.push(`  Subtotal: ₱${item.subtotal.toFixed(2)}`);
        receiptLines.push('');
    });

    receiptLines.push('---------------------');
    receiptLines.push(`Subtotal (VAT Exclusive): ₱${transaction.subtotal.toFixed(2)}`); 
    receiptLines.push(`VAT (12%): ₱${transaction.tax.toFixed(2)}`);
    receiptLines.push(`Total (Grand Total): ₱${transaction.grandTotal.toFixed(2)}`);
    receiptLines.push(`Cash: ₱${transaction.cashAmount.toFixed(2)}`);
    receiptLines.push(`Change: ₱${transaction.change.toFixed(2)}`);
    receiptLines.push('====================');
    receiptLines.push('THANK YOU FOR SHOPPING!');
    receiptLines.push('====================');

    return receiptLines.join('\n');
};

export const usePosStore = () => {
    return {
        state,
        isLoading: computed(() => state.isLoading),

        cartItemCount,
        cartIsEmpty,
        filteredProducts,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotals,

        processPayment,

        setSearchQuery,
        setSelectedCategory,
        setSelectedSubcategory,
        clearFilters,

        fetchProducts, 
        submitOrder,
        fetchOrderItemsByBagCode,

        generateReceipt,

        getGrandTotal: () => state.cart.grandTotal,
        getCartItems: () => state.cart.items,
        getTransactionHistory: () => state.transactionHistory,
        getCurrentTransaction: () => state.currentTransaction
    };
};