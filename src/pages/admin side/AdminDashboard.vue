<template>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <h1 class="main-title">Welcome, Pharmacy Admin!</h1>
            <p class="subtitle">Quick overview of your pharmacy operations.</p>
        </header>

        <div class="stats-grid">

            <div class="stat-card primary">
                <div class="stat-icon-group">
                    <i class="pi pi-chart-line stat-icon"></i>
                    <h3>Today's Sales (₱)</h3>
                </div>
                <p class="stat-value">{{(stats.todaySales) }}</p>
                <span class="stat-label">Total Revenue</span>
            </div>

            <div class="stat-card warning">
                <div class="stat-icon-group">
                    <i class="pi pi-box stat-icon"></i>
                    <h3>Low Stock Items</h3>
                </div>
                <p class="stat-value">{{ stats.lowStockCount }}</p>
                <span class="stat-label">Needs Reorder</span>
            </div>

            <div class="stat-card info">
                <div class="stat-icon-group">
                    <i class="pi pi-truck stat-icon"></i>
                    <h3>Total Stock Items</h3>
                </div>
                <p class="stat-value">{{ stats.totalStockCount.toLocaleString() }}</p>
                <span class="stat-label">Total Inventory Units</span>
            </div>

            <div class="stat-card alert">
                <div class="stat-icon-group">
                    <i class="pi pi-exclamation-triangle stat-icon"></i>
                    <h3>Expiring Soon</h3>
                </div>
                <p class="stat-value">{{ stats.expiringSoonCount }}</p>
                <span class="stat-label">Critical Inventory</span>
            </div>
        </div>

        <div class="quick-lists-grid">

            <div class="list-card">
                <h2 class="list-title primary-text"><i class="pi pi-list list-icon"></i> Products Sold Today</h2>
                <ul class="product-list">
                    <li v-for="(item, index) in lists.productsSoldToday" :key="index">
                        {{ item.name }} <span class="quantity">x {{ item.quantity }}</span>
                    </li>
                    <li>*View all sales...*</li>
                </ul>
            </div>

            <div class="list-card">
                <h2 class="list-title alert-text"><i class="pi pi-clock list-icon"></i> Near Expiry</h2>
                <ul class="product-list">
                    <li v-for="(item, index) in lists.nearExpiry" :key="index" class="expiry-item">
                        {{ item.name }} ({{ item.expiryDate }}) <span class="days">{{ item.daysLeft }} days left</span>
                    </li>
                    <li>*View full expiry list...*</li>
                </ul>
            </div>

            <div class="list-card">
                <h2 class="list-title warning-text"><i class="pi pi-truck list-icon"></i> Low Stock</h2>
                <ul class="product-list">
                    <li v-for="(item, index) in lists.lowStock" :key="index" class="stock-item">
                        {{ item.name }} <span class="count">{{ item.count }} units</span>
                    </li>
                    <li>*View full low stock report...*</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref({
    todaySales: 1245.50,
    lowStockCount: 12,
    totalStockCount: 4500,
    expiringSoonCount: 5,
});

const lists = ref({
    productsSoldToday: [
        { name: 'Paracetamol (500mg)', quantity: 45 },
        { name: 'Amoxicillin (250mg)', quantity: 18 },
        { name: 'Vitamin C (1000mg)', quantity: 32 },
        { name: 'Ibuprofen (200mg)', quantity: 20 },
    ],
    nearExpiry: [
        { name: 'Asthma Inhaler', expiryDate: "Mar '26", daysLeft: 30 },
        { name: 'Insulin Pen', expiryDate: "Apr '26", daysLeft: 45 },
        { name: 'Thyroxin Tabs', expiryDate: "May '26", daysLeft: 70 },
    ],
    lowStock: [
        { name: 'Infant Syrup', count: 2 },
        { name: 'Bandaids (Large)', count: 5 },
        { name: 'Prescription Z', count: 1 },
    ]
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
}

/* --- HEADER STYLES (Unchanged) --- */
.dashboard-header {
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.main-title {
    color: #333;
    margin-bottom: 2px;
    font-weight: 700;
    font-size: 2em;
}

.subtitle {
    color: #7f8c8d;
    font-size: 1em;
}

/* --- STATS GRID STYLES (Unchanged) --- */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.stat-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    border-left: 5px solid;
    transition: box-shadow 0.2s;
}

.stat-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.stat-card h3 {
    font-size: 1.1em;
    font-weight: 600;
    margin: 0;
    color: #555;
}

.stat-icon {
    font-size: 1.5em;
    margin-right: 10px;
}

.stat-value {
    font-size: 2.8em;
    font-weight: 700;
    margin: 5px 0 5px 0;
}

.stat-label {
    display: block;
    font-size: 0.85em;
    color: #95a5a6;
}

/* Card Coloring (Unchanged) */
.stat-card.primary {
    border-left-color: #FF6347;
}

.stat-card.primary .stat-icon {
    color: #FF6347;
}

.stat-card.primary .stat-value {
    color: #34495e;
}

.stat-card.warning {
    border-left-color: #f39c12;
}

.stat-card.warning .stat-icon {
    color: #f39c12;
}

.stat-card.warning .stat-value {
    color: #f39c12;
}

.stat-card.info {
    border-left-color: #3498db;
}

.stat-card.info .stat-icon {
    color: #3498db;
}

.stat-card.info .stat-value {
    color: #3498db;
}

.stat-card.alert {
    border-left-color: #e74c3c;
}

.stat-card.alert .stat-icon {
    color: #e74c3c;
}

.stat-card.alert .stat-value {
    color: #e74c3c;
}


/* --- NEW: QUICK LISTS GRID STYLES --- */

.quick-lists-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.list-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.list-title {
    font-size: 1.25em;
    font-weight: 600;
    margin: 0 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ecf0f1;

    /* --- FIX: Make title a flex container for icon alignment --- */
    display: flex;
    align-items: center;
}

.list-icon {
    margin-right: 8px;
    font-size: 1.1em;
}

/* List Item Styles */
.product-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
}

.product-list li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed #f0f0f0;
    color: #34495e;
    font-size: 0.95em;
}

.product-list li:last-child {
    border-bottom: none;
    padding-top: 15px;
    font-style: italic;
    color: #7f8c8d;
    cursor: pointer;
}

.quantity,
.count,
.days {
    font-weight: 600;
    color: #2ecc71;
}

.expiry-item .days {
    color: #e74c3c;
}

.stock-item .count {
    color: #f39c12;
}

/* Color Classes for Titles */
.primary-text {
    color: #34495e;
}

.warning-text {
    color: #f39c12;
}

.alert-text {
    color: #e74c3c;
}

.primary-text .list-icon {
    color: #FF6347;
}

.warning-text .list-icon {
    color: #f39c12;
}

.alert-text .list-icon {
    color: #e74c3c;
}
</style>
