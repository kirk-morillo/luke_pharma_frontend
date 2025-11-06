<template>
    <div class="inventory-container">
        <!-- Firebase Status Indicator (Mandatory Inclusion) -->
        <div class="firebase-status" v-if="!userId">
            <i class="pi pi-spin pi-cog"></i> Initializing Database...
        </div>

        <header class="inventory-header">
            <h1><i class="pi pi-sitemap title-icon"></i> Inventory Management</h1>
            <button @click="openAddModal" class="add-product-btn">
                <i class="pi pi-plus"></i> Add New Product
            </button>
        </header>

        <div class="search-and-filter">
            <div class="search-group">
                <i class="pi pi-search search-icon"></i>
                <input type="text" v-model="searchTerm" placeholder="Search by name, ID, or supplier..."
                    class="search-input" />
            </div>
            <!-- REMOVED: Previous separate "Stock Status" filter group -->
        </div>

        <div class="inventory-table-wrapper">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th class="non-filterable-header">ID</th>
                        <th class="non-filterable-header">Name</th>

                        <!-- CATEGORY FILTER HEADER -->
                        <th class="filterable-header category-header" @click="toggleCategoryFilter">
                            Category
                            <i class="pi pi-chevron-down toggle-icon" :class="{ 'rotated': isCategoryFilterOpen }"></i>
                            <i class="pi pi-filter-fill filter-indicator" v-if="selectedCategoryFilter"></i>
                        </th>
                        <!-- END CATEGORY FILTER HEADER -->

                        <th class="non-filterable-header">Price (₱)</th>

                        <!-- NEW STOCK FILTER HEADER -->
                        <th class="filterable-header stock-header" @click="toggleStockFilter">
                            Stock
                            <i class="pi pi-chevron-down toggle-icon" :class="{ 'rotated': isStockFilterOpen }"></i>
                            <i class="pi pi-filter-fill filter-indicator" v-if="selectedStockFilter"></i>
                        </th>
                        <!-- END STOCK FILTER HEADER -->

                        <th class="non-filterable-header">Expiry Date</th>
                        <th class="non-filterable-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredInventory" :key="product.id"
                        :class="{ 'low-stock-row': product.stock < 10 && product.stock > 0, 'out-of-stock-row': product.stock === 0 }">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>
                            <span
                                :class="{ 'category-medicine': product.category === 'Medicine', 'category-equipment': product.category === 'Medical Equipment' }">
                                {{ product.category }}
                            </span>
                        </td>
                        <td>{{ product.price.toFixed(2) }}</td>
                        <td>
                            <span class="stock-level">{{ product.stock }}</span>
                        </td>
                        <td>{{ product.expiryDate || 'N/A' }}</td>
                        <td>
                            <button @click="editProduct(product)" class="action-btn edit-btn"><i
                                    class="pi pi-pencil"></i></button>
                            <button @click="deleteProduct(product.id)" class="action-btn delete-btn"><i
                                    class="pi pi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="filteredInventory.length === 0" class="no-results">No inventory items found matching your criteria.
            </p>
        </div>

        <!-- CATEGORY FILTER DROPDOWN -->
        <div v-if="isCategoryFilterOpen" class="filter-dropdown" @mouseleave="isCategoryFilterOpen = false"
            :style="{ left: dropdownPositionCategory.left + 'px', top: dropdownPositionCategory.top + 'px' }">
            <div @click="setCategoryFilter(''); isCategoryFilterOpen = false;" class="filter-option"
                :class="{ 'selected': selectedCategoryFilter === '' }">
                <i class="pi pi-check" v-if="selectedCategoryFilter === ''"></i> All Categories
            </div>
            <div v-for="cat in categories" :key="cat" @click="setCategoryFilter(cat); isCategoryFilterOpen = false;"
                class="filter-option" :class="{ 'selected': selectedCategoryFilter === cat }">
                <i class="pi pi-check" v-if="selectedCategoryFilter === cat"></i> {{ cat }}
            </div>
        </div>
        <!-- END CATEGORY FILTER DROPDOWN -->

        <!-- STOCK FILTER DROPDOWN (NEW) -->
        <div v-if="isStockFilterOpen" class="filter-dropdown" @mouseleave="isStockFilterOpen = false"
            :style="{ left: dropdownPositionStock.left + 'px', top: dropdownPositionStock.top + 'px' }">
            <div @click="setStockFilter(''); isStockFilterOpen = false;" class="filter-option"
                :class="{ 'selected': selectedStockFilter === '' }">
                <i class="pi pi-check" v-if="selectedStockFilter === ''"></i> All Stock
            </div>
            <div @click="setStockFilter('low'); isStockFilterOpen = false;" class="filter-option"
                :class="{ 'selected': selectedStockFilter === 'low' }">
                <i class="pi-check" v-if="selectedStockFilter === 'low'"></i> Low Stock (&lt; 10)
            </div>
            <div @click="setStockFilter('out'); isStockFilterOpen = false;" class="filter-option"
                :class="{ 'selected': selectedStockFilter === 'out' }">
                <i class="pi-check" v-if="selectedStockFilter === 'out'"></i> Out of Stock (0)
            </div>
        </div>
        <!-- END STOCK FILTER DROPDOWN -->

        <!-- Modal Styling (UPDATED FORM FIELDS) -->
        <div v-if="showAddModal" class="modal-overlay">
            <div class="modal-content">
                <h2>{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h2>
                <form @submit.prevent="saveProduct">
                    <!-- Product Name -->
                    <div class="form-group">
                        <label>Product Name</label>
                        <input v-model="currentProduct.name" type="text" required>
                    </div>

                    <!-- Category (NEW FIELD) -->
                    <div class="form-group">
                        <label>Category</label>
                        <select v-model="currentProduct.category" required>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>

                    <!-- Price (NEW FIELD) -->
                    <div class="form-group">
                        <label>Price (₱)</label>
                        <input v-model.number="currentProduct.price" type="number" min="0" step="0.01" required>
                    </div>

                    <!-- Stock Count -->
                    <div class="form-group">
                        <label>Stock Count</label>
                        <input v-model.number="currentProduct.stock" type="number" min="0" required>
                    </div>

                    <!-- Expiry Date (NEW FIELD) -->
                    <div class="form-group">
                        <label>Expiry Date (Optional)</label>
                        <input v-model="currentProduct.expiryDate" type="date">
                    </div>

                    <div class="modal-actions">
                        <button type="submit" class="save-btn"><i class="pi pi-save"></i> Save</button>
                        <button type="button" @click="showAddModal = false" class="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// --- FIREBASE IMPORTS (MANDATORY) ---
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, onSnapshot, collection, query, addDoc, updateDoc, deleteDoc, setLogLevel } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

setLogLevel('Debug'); // Enable logging for debugging

// --- GLOBAL VARIABLES (MANDATORY) ---
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- REACTIVE STATE ---
const db = ref(null);
const auth = ref(null);
const userId = ref(null);

// Mock Data / Categories
const inventory = ref([
    { id: 1001, name: 'Paracetamol 500mg', category: 'Medicine', price: 5.99, stock: 45, expiryDate: '2026-10-01' },
    { id: 1002, name: 'Vitamin D Tablets', category: 'Medicine', price: 12.50, stock: 5, expiryDate: '2025-03-15' },
    { id: 1003, name: 'Cough Syrup (Large)', category: 'Medicine', price: 18.00, stock: 0, expiryDate: '2027-01-20' },
    { id: 1004, name: 'First Aid Kit', category: 'Medical Equipment', price: 25.00, stock: 12, expiryDate: null },
    { id: 1005, name: 'Prescription Z', category: 'Medicine', price: 45.00, stock: 8, expiryDate: '2025-05-30' },
    { id: 1006, name: 'Digital Thermometer', category: 'Medical Equipment', price: 150.00, stock: 22, expiryDate: null },
]);

const categories = ['Medicine', 'Medical Equipment', 'Supplies', 'Others'];

// State for Modal
const showAddModal = ref(false);
const isEditing = ref(false);
const currentProduct = ref({});

// State for Search
const searchTerm = ref('');

// State for Category Filter Dropdown
const isCategoryFilterOpen = ref(false);
const selectedCategoryFilter = ref('');
const dropdownPositionCategory = ref({ left: 0, top: 0 }); // Renamed for clarity

// State for Stock Filter Dropdown (NEW)
const isStockFilterOpen = ref(false);
const selectedStockFilter = ref(''); // Replaces filterStockStatus
const dropdownPositionStock = ref({ left: 0, top: 0 });

// --- FIREBASE INITIALIZATION AND AUTH ---

onMounted(async () => {
    if (Object.keys(firebaseConfig).length) {
        try {
            const app = initializeApp(firebaseConfig);
            db.value = getFirestore(app);
            auth.value = getAuth(app);

            if (initialAuthToken) {
                await signInWithCustomToken(auth.value, initialAuthToken);
            } else {
                await signInAnonymously(auth.value);
            }

            onAuthStateChanged(auth.value, (user) => {
                if (user) {
                    userId.value = user.uid;
                    // In a real app, you would start listening to Firestore data here
                    // startInventoryListener(user.uid);
                } else {
                    userId.value = crypto.randomUUID(); // Fallback for unauthenticated user id
                }
            });
        } catch (error) {
            console.error("Firebase initialization failed:", error);
        }
    } else {
        console.warn("Firebase config not available. Running in mock data mode.");
        userId.value = crypto.randomUUID();
    }
});


// --- FILTERING LOGIC ---

const filteredInventory = computed(() => {
    let filtered = inventory.value;
    const term = searchTerm.value.toLowerCase();

    // 1. Filter by Search Term
    if (term) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            String(p.id).includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    // 2. Filter by Stock Status (UPDATED to use column filter state)
    if (selectedStockFilter.value === 'low') {
        filtered = filtered.filter(p => p.stock > 0 && p.stock < 10);
    } else if (selectedStockFilter.value === 'out') {
        filtered = filtered.filter(p => p.stock === 0);
    }

    // 3. Filter by Category
    if (selectedCategoryFilter.value) {
        filtered = filtered.filter(p => p.category === selectedCategoryFilter.value);
    }

    return filtered;
});


// --- ACTIONS & MODAL ---

const openAddModal = () => {
    isEditing.value = false;
    currentProduct.value = {
        id: Date.now(),
        name: '',
        category: categories[0],
        price: 0.00, // Added price initialization
        stock: 0,
        expiryDate: '' // Updated to empty string for date input
    };
    showAddModal.value = true;
};

const editProduct = (product) => {
    isEditing.value = true;
    // Copy product data and ensure expiryDate is a string for the date input
    currentProduct.value = {
        ...product,
        expiryDate: product.expiryDate || '' // Use empty string if null
    };
    showAddModal.value = true;
};

const deleteProduct = (id) => {
    // IMPORTANT: Replaced window.confirm() with a console warning
    console.warn(`[ACTION] Product ID ${id} deleted (Mock action). In a real application, use a custom modal for confirmation.`);
    inventory.value = inventory.value.filter(p => p.id !== id);
};

const saveProduct = () => {
    console.log('Saving product data:', currentProduct.value);

    // Ensure price is handled as a number
    const productToSave = {
        ...currentProduct.value,
        price: Number(currentProduct.value.price),
        stock: Number(currentProduct.value.stock),
        // Ensure expiryDate is null if empty string, matching original data structure preference
        expiryDate: currentProduct.value.expiryDate || null
    };


    if (isEditing.value) {
        // Find index and update
        const index = inventory.value.findIndex(p => p.id === productToSave.id);
        if (index !== -1) {
            inventory.value[index] = productToSave;
        }
    } else {
        // Add new product
        inventory.value.push(productToSave);
    }

    showAddModal.value = false;
    isEditing.value = false;
};

// --- CATEGORY FILTER HANDLERS ---

const toggleCategoryFilter = async (event) => {
    isCategoryFilterOpen.value = !isCategoryFilterOpen.value;
    // Close stock filter if category filter is opened
    if (isCategoryFilterOpen.value) {
        isStockFilterOpen.value = false;
        await nextTick();
        const headerRect = event.currentTarget.getBoundingClientRect();
        const containerRect = event.currentTarget.closest('.inventory-container').getBoundingClientRect();

        dropdownPositionCategory.value = {
            left: headerRect.left - containerRect.left,
            top: headerRect.bottom - containerRect.top + 5 // 5px offset
        };
    }
};

const setCategoryFilter = (category) => {
    selectedCategoryFilter.value = category;
};

// --- STOCK FILTER HANDLERS (NEW) ---

const toggleStockFilter = async (event) => {
    isStockFilterOpen.value = !isStockFilterOpen.value;
    // Close category filter if stock filter is opened
    if (isStockFilterOpen.value) {
        isCategoryFilterOpen.value = false;
        await nextTick();
        const headerRect = event.currentTarget.getBoundingClientRect();
        const containerRect = event.currentTarget.closest('.inventory-container').getBoundingClientRect();

        dropdownPositionStock.value = {
            left: headerRect.left - containerRect.left,
            top: headerRect.bottom - containerRect.top + 5 // 5px offset
        };
    }
};

const setStockFilter = (status) => {
    selectedStockFilter.value = status;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
/* PrimeIcons are assumed to be available from the host environment */

.inventory-container {
    padding: 20px;
    font-family: 'Inter', sans-serif;
    position: relative;
    /* Needed for positioning the absolute dropdown */
}

/* Firebase Status */
.firebase-status {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #f1f1f1;
    padding: 5px 10px;
    border-radius: 4px;
    color: #3498db;
    font-size: 0.9em;
}

.inventory-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 2px solid #eee;
    padding-bottom: 15px;
}

/* NEW: Title Icon Styling */
.inventory-header h1 {
    display: flex;
    /* Align icon and text vertically */
    align-items: center;
    font-size: 1.8em;
}

.title-icon {
    color: coral;
    /* The requested coral red color */
    margin-right: 10px;
    font-size: 1.3em;
    /* Slightly larger for emphasis */
}

.add-product-btn {
    padding: 10px 20px;
    background-color: #42b983;
    /* Vue Green */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.add-product-btn:hover {
    background-color: #3aa873;
}

/* Search and Filter */
.search-and-filter {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    flex-wrap: wrap;
}

.search-group {
    flex-grow: 1;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 10px;
    max-width: 400px;
}

.search-icon {
    color: #7f8c8d;
    margin-right: 8px;
}

.search-input {
    flex-grow: 1;
    padding: 10px 0;
    border: none;
    outline: none;
    background: transparent;
}

/* Table Styling */
.inventory-table-wrapper {
    overflow-x: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.inventory-table {
    width: 100%;
    border-collapse: collapse;
}

.inventory-table th,
.inventory-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
}

.inventory-table th {
    background-color: #f7f9fb;
    font-weight: 700;
    color: #34495e;
}

/* Filterable Header Styles */
.filterable-header {
    cursor: pointer;
    position: relative;
    user-select: none;
    transition: background-color 0.1s;
}

.filterable-header:hover {
    background-color: #eef1f3;
}

.toggle-icon {
    font-size: 0.8em;
    margin-left: 5px;
    transition: transform 0.2s;
}

.rotated {
    transform: rotate(180deg);
}

.filter-indicator {
    color: #42b983;
    /* Green active filter indicator */
    margin-left: 5px;
    font-size: 0.9em;
}

/* Stock Status Colors */
.stock-level {
    font-weight: 700;
}

.low-stock-row td {
    background-color: #fef3e5;
    /* Light orange background */
}

.out-of-stock-row td {
    background-color: #fdd;
    /* Light red background */
    color: #c0392b;
    font-weight: bold;
}

.category-medicine {
    color: #3498db;
    font-weight: 600;
}

.category-equipment {
    color: #9b59b6;
    font-weight: 600;
}

/* Actions */
.action-btn {
    padding: 8px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.edit-btn {
    background-color: #3498db;
    color: white;
}

.delete-btn {
    background-color: #e74c3c;
    color: white;
}

.no-results {
    padding: 30px;
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
}

/* Filter Dropdown (Shared for Category and Stock) */
.filter-dropdown {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 20;
    min-width: 180px;
    padding: 8px 0;
}

.filter-option {
    padding: 10px 15px;
    cursor: pointer;
    color: #34495e;
    transition: background-color 0.1s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.filter-option:hover {
    background-color: #f7f9fb;
}

.filter-option .pi-check {
    color: #42b983;
}

.filter-option.selected {
    font-weight: 700;
    background-color: #f0faff;
    color: #3498db;
}

/* Modal Styling */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
}

/* STYLING FOR ALL INPUT TYPES (input and select) */
.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    /* Added to improve select box appearance */
    appearance: none;
    background-color: white;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M10%204L6%208%202%204z%22%20fill%3D%22%23333%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
}

/* Remove custom arrow for date type */
.form-group input[type="date"] {
    background-image: none;
}


.modal-actions {
    margin-top: 25px;
    text-align: right;
}

.save-btn,
.cancel-btn {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.save-btn {
    background-color: #42b983;
    color: white;
}

.cancel-btn {
    background-color: #e0e0e0;
    color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .inventory-header h1 {
        font-size: 1.5em;
    }

    .search-and-filter {
        flex-direction: column;
        align-items: stretch;
    }

    .search-group {
        max-width: 100%;
    }

    /* Removed unnecessary filter-group flex styles */

    .inventory-table-wrapper {
        box-shadow: none;
        /* remove shadow on mobile for full width */
    }
}
</style>