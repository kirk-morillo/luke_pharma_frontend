<template>
    <div class="catalog-container page-container">
        <header-component />

        <div class="search-and-filter">
            <input v-if="isStaff" type="text" placeholder="Scan Barcode or Enter Product ID" class="barcode-input" />
            <input type="text" v-model="searchTerm" placeholder="Search for medicine, brand, or symptom..."
                class="search-input" />
            <select v-model="selectedCategory" class="filter-select">
                <option value="">All Categories</option>
                <option value="pain_relief">Pain Relief</option>
                <option value="vitamins">Vitamins</option>
                <option value="prescription">Prescription</option>
            </select>

            <router-link v-if="!isStaff" to="/login" class="admin-link-btn">
                Staff Login
            </router-link>
        </div>

        <div class="main-pos-layout">

            <div class="product-catalog-area">
                <h1>Browse Our Medicines</h1>
                <p v-if="loading" class="loading-message">Loading products...</p>
                <div v-if="!loading" class="product-grid">
                    <ProductCard
                        v-for="product in mappedProducts"
                        :key="product.id"
                        :product="product"
                        :compact="true"
                        @add-to-bag="handleAddToCart"
                    />
                </div>
            </div>

            <aside v-if="isStaff" class="pos-cart-area">
                <h2>Current Sale</h2>
                <div class="cart-items">
                    <p>Cart Item 1 x 2 (<span class="cart-price">₱20.00</span>)</p>
                    <p>Cart Item 2 x 1 (<span class="cart-price">₱15.50</span>)</p>
                    <hr>
                </div>
                <div class="sale-summary">
                    <p>Subtotal: <span class="summary-value">₱35.50</span></p>
                    <p>Tax (10%): <span class="summary-value">₱3.55</span></p>
                    <h3>Total: <span class="summary-total">₱39.05</span></h3>
                </div>
                <button class="checkout-btn">PROCESS PAYMENT</button>
                <button class="cancel-btn">Cancel Sale</button>
            </aside>

        </div>
        <footer-component />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import { showProductAddedAlert, showErrorAlert } from '@/utils/sweetAlertConfig.js';

const products = ref([]);
const loading = ref(true);
const searchTerm = ref('');
const selectedCategory = ref('');

// Updated to use the correct variable name for userRole
const userRole = ref(localStorage.getItem('userRole') || 'public');

const isStaff = computed(() => {
    return userRole.value === 'admin' || userRole.value === 'cashier';
});

// Utility function exposed for testing (optional, but useful)
const setTestRole = (role) => {
    localStorage.setItem('userRole', role);
    userRole.value = role;
    console.log(`Test role set to: ${role}. isStaff: ${isStaff.value}`);
};
window.setTestRole = setTestRole; // Expose for console testing

const fetchProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    products.value = [
        { id: 1, name: 'Pain Away (20 Tablets)', price: 9.99, stock: 45, category: 'pain_relief', image: 'placeholder-pain.jpg' },
        { id: 2, name: 'Vitamin C 1000mg', price: 15.50, stock: 8, category: 'vitamins', image: 'placeholder-vitc.jpg' },
        { id: 3, name: 'Cough Syrup', price: 12.00, stock: 0, category: 'pain_relief', image: 'placeholder-cough.jpg' },
        { id: 4, name: 'Prescription Drug X', price: 55.00, stock: 20, category: 'prescription', image: 'placeholder-rx.jpg' },
        { id: 5, name: 'Multi-Vitamin Daily', price: 22.50, stock: 12, category: 'vitamins', image: 'placeholder-multi.jpg' },
        { id: 6, name: 'Fever Blocker 500', price: 6.75, stock: 3, category: 'pain_relief', image: 'placeholder-fever.jpg' },
    ];
    loading.value = false;
};

// Map MedicineSection products to ProductCard format
const mappedProducts = computed(() => {
    return filteredProducts.value.map(product => ({
        id: product.id,
        name: product.name,
        category: mapCategory(product.category),
        price: product.price,
        inStock: product.stock > 0,
        stockLocations: getStockLocations(product.stock),
        description: `${product.category.replace('_', ' ')} - Stock: ${product.stock}`
    }));
});

const filteredProducts = computed(() => {
    let filtered = products.value.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.value.toLowerCase());
        // Category filter
        const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value;

        return matchesSearch && matchesCategory;
    });
    return filtered;
});

// Map internal categories to standard ProductCard categories
const mapCategory = (category) => {
    const categoryMap = {
        'pain_relief': 'Medicine',
        'vitamins': 'Medicine',
        'prescription': 'Medicine'
    };
    return categoryMap[category] || 'Medicine';
};

// Generate stock locations based on stock level
const getStockLocations = (stock) => {
    if (stock === 0) return [];
    if (stock >= 20) return ['Location 1', 'Location 2', 'Location 3'];
    if (stock >= 10) return ['Location 1', 'Location 2'];
    return ['Location 1'];
};

const handleAddToCart = (product) => {
    if (product.inStock) {
        addToCart(product);
        showProductAddedAlert(product.name, false);
    } else {
        showErrorAlert('Out of Stock', 'This product is currently out of stock.');
    }
};

const addToCart = (product) => {
    console.log(`${product.name} added to cart/sale.`);
};

onMounted(fetchProducts);

</script>

<style scoped>
/* Define primary colors */
:root {
    --primary-red: #E74C3C;
    /* Used for main actions and highlights */
    --secondary-blue: #3498db;
    /* Used for staff mode highlights */
    --background-light: #f4f6f9;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --pos-bg: #ecf0f1;
}

/* ---------------------------------------------------------------------- */
/* --- 1. MAIN LAYOUT & CONTAINERS --- */
/* ---------------------------------------------------------------------- */
.catalog-container {
    background-color: var(--background-light, #f4f6f9);
    min-height: 100vh;
}

.main-pos-layout {
    display: flex;
    max-width: 1400px;
    margin: 30px auto;
    padding: 0 20px;
    gap: 30px;
}

.product-catalog-area {
    flex-grow: 1;
}

.product-catalog-area h1 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 2.2em;
    border-bottom: 3px solid var(--primary-red);
    display: inline-block;
    padding-bottom: 5px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
}

/* ---------------------------------------------------------------------- */
/* --- 2. SEARCH & FILTER BAR --- */
/* ---------------------------------------------------------------------- */
.search-and-filter {
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: white;
    padding: 15px 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    max-width: 1400px;
    margin: 0 auto;
}

.barcode-input,
.search-input,
.filter-select {
    padding: 12px 15px;
    border: 1px solid #bdc3c7;
    border-radius: 6px;
    font-size: 1.0em;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input {
    flex-grow: 1;
}

.barcode-input {
    flex-grow: 1.5;
    background-color: #fffde7;
    /* Light yellow background for highlight */
    font-weight: 600;
    color: #2c3e50;
    border-color: var(--secondary-blue);
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.search-input:focus,
.barcode-input:focus,
.filter-select:focus {
    border-color: var(--primary-red);
    outline: none;
    box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
}

.admin-link-btn {
    padding: 12px 18px;
    background-color: var(--secondary-blue);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 1.0em;
    font-weight: 600;
    transition: background-color 0.2s;
}

.admin-link-btn:hover {
    background-color: #2980b9;
}

/* ---------------------------------------------------------------------- */
/* --- 3. PRODUCT CARD --- */
/* ---------------------------------------------------------------------- */
.product-card {
    background: white;
    border-radius: 10px;
    box-shadow: var(--card-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image-placeholder {
    height: 120px;
    background-color: #f0f3f5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    color: #bdc3c7;
}

.product-icon {
    color: var(--secondary-blue);
}

.product-details {
    padding: 15px;
    flex-grow: 1;
}

.product-name {
    font-size: 1.3em;
    color: #2c3e50;
    margin: 0 0 5px 0;
    font-weight: 700;
}

.product-category {
    font-size: 0.9em;
    color: #95a5a6;
    text-transform: capitalize;
    margin-bottom: 10px;
}

.price-and-stock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.product-price {
    font-size: 1.4em;
    font-weight: 800;
    color: var(--primary-red);
}

.product-stock {
    font-size: 0.9em;
    font-weight: 600;
    color: #27ae60;
    /* Green for in stock */
}

.product-stock.low {
    color: #f39c12;
    /* Yellow/Orange for low stock */
}

.product-stock.zero {
    color: var(--primary-red);
    /* Red for out of stock */
    font-weight: 700;
}

.add-to-cart-btn {
    width: 100%;
    padding: 12px;
    border: none;
    background-color: #2ecc71;
    /* Green for general cart */
    color: white;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-to-cart-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.add-to-cart-btn.staff-mode {
    background-color: var(--primary-red);
    /* Red for staff/sale mode */
}

.add-to-cart-btn.staff-mode:hover:not(:disabled) {
    background-color: #C0392B;
}

/* ---------------------------------------------------------------------- */
/* --- 4. POS CART AREA (Staff Only) --- */
/* ---------------------------------------------------------------------- */
.pos-cart-area {
    width: 350px;
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    height: fit-content;
    position: sticky;
    top: 90px;
    /* Adjust based on the search bar height */
}

.pos-cart-area h2 {
    color: #2c3e50;
    border-bottom: 2px solid var(--primary-red);
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.8em;
}

.cart-items {
    min-height: 150px;
    max-height: 350px;
    /* Add max height for scrolling long lists */
    overflow-y: auto;
    margin-bottom: 15px;
}

.cart-items p {
    display: flex;
    justify-content: space-between;
    font-size: 0.95em;
    color: #34495e;
    margin: 5px 0;
}

.cart-items hr {
    border: 0;
    border-top: 1px dashed #bdc3c7;
    margin: 10px 0;
}

.cart-price {
    font-weight: 600;
    color: #2c3e50;
}

.sale-summary {
    margin: 20px 0;
    padding-top: 15px;
    border-top: 2px solid #bdc3c7;
}

.sale-summary p,
.sale-summary h3 {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
}

.sale-summary h3 {
    font-size: 1.5em;
    color: var(--primary-red);
    margin-top: 15px;
}

.summary-value {
    font-weight: 600;
}

.summary-total {
    font-weight: 800;
}

.checkout-btn {
    width: 100%;
    padding: 15px;
    background-color: var(--primary-red);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 10px;
}

.checkout-btn:hover {
    background-color: #C0392B;
}

.cancel-btn {
    width: 100%;
    padding: 10px;
    background-color: #95a5a6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s;
}

.cancel-btn:hover {
    background-color: #7f8c8d;
}

/* ---------------------------------------------------------------------- */
/* --- RESPONSIVE ADJUSTMENTS --- */
/* ---------------------------------------------------------------------- */
@media (max-width: 1024px) {
    .main-pos-layout {
        flex-direction: column;
        gap: 20px;
    }

    .pos-cart-area {
        width: 100%;
        position: static;
        /* Remove sticky on mobile for better flow */
        order: -1;
        /* Place cart above catalog on mobile */
    }

    .search-and-filter {
        flex-wrap: wrap;
        padding: 15px;
    }

    .barcode-input {
        flex-basis: 100%;
        /* Full width for barcode scan */
    }

    .search-input {
        flex-basis: 60%;
    }

    .filter-select {
        flex-basis: calc(40% - 15px);
        /* Half width for filter */
    }

    .admin-link-btn {
        flex-basis: 100%;
        text-align: center;
        margin-top: 10px;
    }
}

@media (max-width: 600px) {
    .product-grid {
        grid-template-columns: 1fr;
        /* Single column product list on small phones */
    }
}
</style>