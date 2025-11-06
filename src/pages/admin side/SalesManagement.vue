<template>
    <div class="sales-container">
        <div class="firebase-status" v-if="!userId">
            <i class="pi pi-spin pi-cog"></i> Initializing Database...
        </div>

        <header class="sales-header">
            <h1><i class="pi pi-chart-bar title-icon"></i> Sales Management & Reports</h1>
        </header>

        <div class="report-controls">
            <h2>📊 Sales Reports Breakdown</h2>

            <div class="filter-group-row">
                <div class="filter-group">
                    <label for="time-period">Time Period:</label>
                    <select id="time-period" v-model="filterTimePeriod" class="filter-select">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                <div class="filter-group date-range" v-if="filterTimePeriod === 'custom'">
                    <label>From:</label>
                    <input type="date" v-model="filterDateStart" class="filter-input" />
                    <label>To:</label>
                    <input type="date" v-model="filterDateEnd" class="filter-input" />
                </div>
            </div>

            <div class="filter-group-row">
                <div class="filter-group">
                    <label for="category-filter">Category:</label>
                    <select id="category-filter" v-model="filterCategory" class="filter-select">
                        <option value="">All Categories</option>
                        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label for="product-filter">Product:</label>
                    <select id="product-filter" v-model="filterProduct" class="filter-select">
                        <option value="">All Products</option>
                        <option v-for="prod in uniqueProducts" :key="prod" :value="prod">{{ prod }}</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label for="location-filter">Location:</label>
                    <select id="location-filter" v-model="filterLocation" class="filter-select">
                        <option value="">All Locations</option>
                        <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>
                </div>
            </div>

            <button @click="generateReport" class="generate-btn">
                <i class="pi pi-refresh"></i> Generate Report ({{ filteredSales.length }} Items)
            </button>
        </div>

        <hr>

        <div class="sales-metrics">
            <div class="metric-card total-sales">
                <h3>Total Revenue</h3>
                <p>₱ {{ totalRevenue.toFixed(2) }}</p>
            </div>
            <div class="metric-card total-units">
                <h3>Total Units Sold</h3>
                <p>{{ totalUnitsSold }} units</p>
            </div>
            <div class="metric-card average-sale">
                <h3>Average Sale Value</h3>
                <p>₱ {{ averageSaleValue.toFixed(2) }}</p>
            </div>
        </div>

        <div class="sales-table-wrapper">
            <h3>Detailed Sales Data</h3>
            <table class="sales-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit Price (₱)</th>
                        <th>Location</th>
                        <th>Total Sale (₱)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredSales.length === 0">
                        <td colspan="7" class="no-results">No sales data found matching the selected criteria.</td>
                    </tr>
                    <tr v-else v-for="sale in filteredSales" :key="sale.id">
                        <td>{{ sale.date }}</td>
                        <td>{{ sale.productName }}</td>
                        <td>{{ sale.category }}</td>
                        <td>{{ sale.quantity }}</td>
                        <td>{{ sale.price.toFixed(2) }}</td>
                        <td>{{ sale.location }}</td>
                        <td>{{ sale.totalSale.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const db = ref(null);
const auth = ref(null);
const userId = ref(null);

onMounted(async () => {
    if (Object.keys(firebaseConfig).length) {
        try {
            const app = initializeApp(firebaseConfig);
            db.value = getFirestore(app);
            auth.value = getAuth(app);

            // Authentication logic
            if (initialAuthToken) {
                await signInWithCustomToken(auth.value, initialAuthToken);
            } else {
                await signInAnonymously(auth.value);
            }

            onAuthStateChanged(auth.value, (user) => {
                userId.value = user ? user.uid : crypto.randomUUID();
            });

        } catch (error) {
            console.error("Firebase initialization failed:", error);
        }
    } else {
        // Fallback for environment where config is missing
        userId.value = crypto.randomUUID();
    }
});
// --- END FIREBASE SETUP ---

// --- MOCK SALES DATA (Replace with Firestore fetching later) ---
const mockSales = ref([
    { id: 1, date: '2025-11-01', productName: 'Paracetamol 500mg', category: 'Medicine', price: 5.99, quantity: 10, totalSale: 59.90, location: 'Main Branch' },
    { id: 2, date: '2025-11-01', productName: 'Digital Thermometer', category: 'Medical Equipment', price: 150.00, quantity: 2, totalSale: 300.00, location: 'Online Store' },
    { id: 3, date: '2025-10-28', productName: 'First Aid Kit', category: 'Medical Equipment', price: 25.00, quantity: 5, totalSale: 125.00, location: 'Satellite Branch' },
    { id: 4, date: '2025-10-25', productName: 'Vitamin D Tablets', category: 'Medicine', price: 12.50, quantity: 20, totalSale: 250.00, location: 'Main Branch' },
    { id: 5, date: '2025-11-03', productName: 'Cough Syrup (Large)', category: 'Medicine', price: 18.00, quantity: 3, totalSale: 54.00, location: 'Main Branch' },
    { id: 6, date: '2025-11-05', productName: 'Paracetamol 500mg', category: 'Medicine', price: 5.99, quantity: 15, totalSale: 89.85, location: 'Online Store' },
    { id: 7, date: '2025-11-05', productName: 'Prescription Z', category: 'Medicine', price: 45.00, quantity: 1, totalSale: 45.00, location: 'Main Branch' },
    { id: 8, date: '2025-11-06', productName: 'Digital Thermometer', category: 'Medical Equipment', price: 150.00, quantity: 1, totalSale: 150.00, location: 'Online Store' },
]);

// --- FILTER STATE ---
const filterTimePeriod = ref('monthly');
const filterDateStart = ref('2025-10-01');
const filterDateEnd = ref('2025-11-30');
const filterCategory = ref('');
const filterProduct = ref('');
const filterLocation = ref('');

// Generate unique filter options
const uniqueCategories = computed(() => [...new Set(mockSales.value.map(s => s.category))]);
const uniqueProducts = computed(() => [...new Set(mockSales.value.map(s => s.productName))]);
const uniqueLocations = computed(() => [...new Set(mockSales.value.map(s => s.location))]);


// --- FILTERING LOGIC ---

// Helper function for date comparison (YYYY-MM-DD format)
const isDateInRange = (saleDate, start, end) => {
    return saleDate >= start && saleDate <= end;
};

// Initial Date Setup based on current time
const today = new Date().toISOString().split('T')[0];
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
filterDateStart.value = oneMonthAgo.toISOString().split('T')[0];
filterDateEnd.value = today;

// Watcher to auto-adjust date range based on filterTimePeriod
watch(filterTimePeriod, (newPeriod) => {
    const now = new Date();
    const end = now.toISOString().split('T')[0];
    let start;

    switch (newPeriod) {
        case 'daily':
            start = end;
            break;
        case 'weekly':
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            start = oneWeekAgo.toISOString().split('T')[0];
            break;
        case 'monthly':
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 1);
            start = oneMonthAgo.toISOString().split('T')[0];
            break;
        case 'custom':
            // Keep existing custom dates
            return;
    }
    filterDateStart.value = start;
    filterDateEnd.value = end;
});


const filteredSales = computed(() => {
    return mockSales.value.filter(sale => {
        // 1. Filter by Time Period (Date Range)
        let isDateMatch = false;

        // Use custom range if set, otherwise use the dynamically calculated range
        const startDate = filterDateStart.value;
        const endDate = filterDateEnd.value;

        if (isDateInRange(sale.date, startDate, endDate)) {
            isDateMatch = true;
        }

        if (!isDateMatch) return false;

        // 2. Filter by Category
        if (filterCategory.value && sale.category !== filterCategory.value) {
            return false;
        }

        // 3. Filter by Product
        if (filterProduct.value && sale.productName !== filterProduct.value) {
            return false;
        }

        // 4. Filter by Location
        if (filterLocation.value && sale.location !== filterLocation.value) {
            return false;
        }

        return true;
    });
});


// --- METRICS CALCULATION ---
const totalRevenue = computed(() => {
    return filteredSales.value.reduce((sum, sale) => sum + sale.totalSale, 0);
});

const totalUnitsSold = computed(() => {
    return filteredSales.value.reduce((sum, sale) => sum + sale.quantity, 0);
});

// A count of distinct sales transactions
const totalTransactions = computed(() => filteredSales.value.length);

const averageSaleValue = computed(() => {
    if (totalTransactions.value === 0) return 0;
    return totalRevenue.value / totalTransactions.value;
});


// --- ACTIONS ---

const generateReport = () => {
    // In a real application, this function would call a backend API to fetch filtered data.
    // Since we are using mock data, this simply re-triggers the computed properties.
    console.log(`Generating report for:
        Period: ${filterTimePeriod.value} (${filterDateStart.value} to ${filterDateEnd.value})
        Category: ${filterCategory.value || 'All'}
        Product: ${filterProduct.value || 'All'}
        Location: ${filterLocation.value || 'All'}
    `);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
/* PrimeIcons are assumed to be available from the host environment */

.sales-container {
    padding: 20px;
    font-family: 'Inter', sans-serif;
}

/* Header and Title */
.sales-header {
    margin-bottom: 25px;
    border-bottom: 2px solid #eee;
    padding-bottom: 15px;
}

.sales-header h1 {
    display: flex;
    align-items: center;
    font-size: 1.8em;
}

.title-icon {
    color: #007bff;
    /* Blue color for sales/charts */
    margin-right: 10px;
    font-size: 1.3em;
}

/* Report Controls and Filters */
.report-controls {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f7f9fb;
}

.report-controls h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #34495e;
    font-size: 1.4em;
    font-weight: 700;
    display: flex;
    align-items: center;
}

.filter-group-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 15px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.filter-group label {
    font-weight: 600;
    color: #34495e;
    min-width: 50px;
}

.filter-select,
.filter-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.95em;
    min-width: 120px;
}

.date-range label {
    font-weight: 400;
}

.generate-btn {
    padding: 10px 20px;
    background-color: #42b983;
    /* Vue Green */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.generate-btn:hover {
    background-color: #3aa873;
}

/* Sales Metrics Cards */
.sales-metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card {
    flex: 1;
    min-width: 200px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.metric-card h3 {
    margin-top: 0;
    font-size: 1.1em;
    color: #7f8c8d;
    font-weight: 600;
}

.metric-card p {
    font-size: 2.2em;
    font-weight: 800;
    margin: 5px 0 0 0;
}

.total-revenue p {
    color: #27ae60;
    /* Green for revenue */
}

/* Sales Table */
.sales-table-wrapper {
    overflow-x: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
}

.sales-table-wrapper h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #34495e;
}

.sales-table {
    width: 100%;
    border-collapse: collapse;
}

.sales-table th,
.sales-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
    font-size: 0.9em;
}

.sales-table th {
    background-color: #eef1f3;
    font-weight: 700;
    color: #34495e;
    position: sticky;
    top: 0;
}

.no-results {
    text-align: center !important;
    padding: 30px !important;
    color: #7f8c8d;
    font-style: italic;
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
    z-index: 100;
}

/* Responsive adjustments */
@media (max-width: 900px) {
    .filter-group-row {
        flex-direction: column;
        gap: 10px;
    }

    .filter-group {
        justify-content: space-between;
    }

    .date-range {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
}
</style>