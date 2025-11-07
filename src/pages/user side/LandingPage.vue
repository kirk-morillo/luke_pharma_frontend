<template>
    <div class="landing-page-container">

        <Header />

        <main class="main-content">

            <section id="hero" class="hero-section">
                <div class="hero-text-content">
                    <h1>Your Health, Our Priority.</h1>
                    <p class="subtitle-text">Find the right medicine and health supplies from our trusted locations.</p>
                    <a href="#items-section" @click.prevent="scrollToSection('items-section')" class="hero-cta-button">
                        Explore Our Items <i class="pi pi-arrow-right"></i>
                    </a>
                </div>
            </section>

            <section id="items-section" class="items-section-container">
                <div class="section-header">
                    <h2>Our Health Items</h2>
                    <p>Search, filter by category, and check availability across our locations.</p>
                </div>

                <div class="search-filter-controls">
                    <div class="search-input-wrapper">
                        <i class="pi pi-search search-icon"></i>
                        <input type="text" v-model="searchTerm" placeholder="Search for a medicine or product name..."
                            class="search-input" @input="clearSelection" />
                        <i v-if="searchTerm" class="pi pi-times clear-search"
                            @click="searchTerm = ''; clearSelection()"></i>
                    </div>

                    <div class="category-filters">
                        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat; clearSelection()"
                            :class="{ 'active': selectedCategory === cat }" class="category-button">
                            {{ cat }}
                        </button>
                    </div>
                </div>

                <div v-if="selectedItem" class="item-availability-card">
                    <div class="availability-header">
                        <h3>Availability for: {{ selectedItem.name }} ({{ selectedItem.category }})</h3>
                        <i class="pi pi-times-circle close-btn" @click="clearSelection"></i>
                    </div>
                    <div class="availability-list">
                        <p v-if="selectedItem.locations.length === 0" class="not-available">
                            Currently out of stock at all locations.
                        </p>
                        <div v-else class="locations-list">
                            <span v-for="loc in selectedItem.locations" :key="loc" class="location-tag">
                                <i class="pi pi-check-circle"></i> {{ loc }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="product-grid">
                    <div v-if="filteredItems.length === 0" class="no-results">
                        <i class="pi pi-exclamation-triangle"></i>
                        <p>No items found matching your search and filter criteria.</p>
                    </div>

                    <div v-else v-for="item in filteredItems" :key="item.id" class="product-card"
                        @click="selectItem(item)">
                        <div class="card-content">
                            <i class="pi pi-pills product-icon"></i>
                            <h4 class="product-name">{{ item.name }}</h4>
                            <p class="product-category">{{ item.category }}</p>
                        </div>
                        <div class="card-footer">
                            <span class="product-price">₱{{ item.price.toFixed(2) }}</span>
                            <button class="availability-btn">
                                Check Stock <i class="pi pi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="stores-section" class="stores-section-container">
                <div class="section-header">
                    <h2>Our Store Locations</h2>
                    <p>Visit any of our five convenient locations across the city.</p>
                </div>
                <div class="stores-grid">
                    <div v-for="location in storeLocations" :key="location" class="store-card">
                        <i class="pi pi-building store-icon"></i>
                        <h3 class="store-name">{{ location }}</h3>
                        <p class="store-address">1626 Rizal Avenue Sta.Cruz Manila Area (Near Jose Reyes Hospital)</p>
                        <button class="view-map-btn">
                            View Details <i class="pi pi-external-link"></i>
                        </button>
                    </div>
                </div>
            </section>
        </main>

        <Footer />

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

// --- MOCK DATA ---
const items = ref([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', locations: ['Location 1', 'Location 3', 'Location 5'], price: 5.00 },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', locations: ['Location 2', 'Location 4'], price: 12.50 },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Vitamins', locations: ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'], price: 8.99 },
    { id: 4, name: 'Loperamide 2mg', category: 'Digestive', locations: ['Location 3', 'Location 5'], price: 6.25 },
    { id: 5, name: 'Cetirizine 10mg', category: 'Allergy', locations: ['Location 1', 'Location 4'], price: 4.75 },
    { id: 6, name: 'Ibuprofen 200mg', category: 'Pain Relief', locations: ['Location 2', 'Location 5'], price: 7.00 },
    { id: 7, name: 'Ginseng Complex', category: 'Vitamins', locations: ['Location 1', 'Location 2'], price: 15.00 },
    { id: 8, name: 'Omeprazole 20mg', category: 'Digestive', locations: ['Location 3', 'Location 4'], price: 10.50 },
]);

const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Digestive', 'Allergy'];
const storeLocations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'];

// --- STATE MANAGEMENT ---
const selectedCategory = ref('All');
const searchTerm = ref('');
const selectedItem = ref(null);

// --- LOGIC ---
const filteredItems = computed(() => {
    let list = items.value;

    if (selectedCategory.value !== 'All') {
        list = list.filter(item => item.category === selectedCategory.value);
    }

    if (searchTerm.value.trim()) {
        const query = searchTerm.value.toLowerCase().trim();
        list = list.filter(item => item.name.toLowerCase().includes(query));
    }

    return list;
});

const selectItem = (item) => {
    selectedItem.value = item;
};

const clearSelection = () => {
    selectedItem.value = null;
};

/**
 * Handles smooth internal scrolling for navigation.
 */
const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerElement = document.querySelector('.main-header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;

        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};
</script>

<style scoped>
/* --- CSS Variables --- */
:root {
    --primary-red: #E74C3C;
    --bg-light-red: #FADBD8;
    --text-dark: #000000;
    --border-light: #ecf0f1;
    --search-bg: #ffffff;
    --footer-bg-dark: #1f2a38;
}

.landing-page-container {
    display: flex;
    padding: '20px';
    flex-direction: column;
    font-family: 'Inter', sans-serif;
    background-color: #f7f7f7;
}

/* Padding to prevent content from being hidden by a fixed header */
.main-content {
    flex-grow: 1;
    padding-top: 75px;
}

section {
    padding: 60px 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

.section-header {
    text-align: center;
    margin-bottom: 40px;
}

.section-header h2 {
    font-size: 2.5em;
    font-weight: 800;
    color: var(--primary-red);
    margin-bottom: 10px;
}

.section-header p {
    color: #555;
    font-size: 1.1em;
}

/* ========================================
2. HERO STYLES
========================================
*/
.hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, #fefefe, var(--bg-light-red));
    padding: 100px 40px;
    min-height: 400px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.hero-text-content h1 {
    font-size: 3.5em;
    color: var(--text-dark);
    margin-bottom: 10px;
}

.subtitle-text {
    font-size: 1.4em;
    color: #555;
    margin-bottom: 30px;
    font-weight: 300;
}

.hero-cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: var(--primary-red);
    color: white;
    padding: 12px 25px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1em;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
    transition: background-color 0.3s, transform 0.2s;
}

.hero-cta-button:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
}

/* ========================================
3. ITEMS SECTION STYLES
========================================
*/

.items-section-container {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    margin-top: 30px;
    margin-bottom: 30px;
}

/* --- Search & Filter Controls --- */
.search-filter-controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
    align-items: center;
}

.search-input-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
}

.search-input {
    width: 100%;
    padding: 12px 45px 12px 45px;
    border: 2px solid var(--border-light);
    border-radius: 25px;
    font-size: 1em;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
    border-color: var(--primary-red);
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}

.clear-search {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
    transition: color 0.2s;
}

.clear-search:hover {
    color: var(--primary-red);
}

.category-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.category-button {
    background-color: var(--border-light);
    color: #555;
    padding: 8px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, transform 0.1s;
    font-weight: 500;
}

.category-button:hover {
    background-color: #e0e0e0;
}

.category-button.active {
    background-color: var(--primary-red);
    color: white;
    box-shadow: 0 2px 5px rgba(231, 76, 60, 0.3);
}

/* --- Availability Card --- */
.item-availability-card {
    background-color: #ffeaea;
    border: 1px solid var(--primary-red);
    border-radius: 8px;
    padding: 15px 25px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(231, 76, 60, 0.1);
    animation: fadeIn 0.3s ease-out;
}

.availability-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.availability-header h3 {
    color: var(--primary-red);
    font-size: 1.2em;
    margin: 0;
}

.close-btn {
    color: var(--primary-red);
    cursor: pointer;
    font-size: 1.4em;
    transition: transform 0.2s;
}

.close-btn:hover {
    transform: rotate(90deg);
}

.locations-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.location-tag {
    background-color: var(--primary-red);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9em;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.not-available {
    color: #999;
    font-style: italic;
}


/* --- Product Grid --- */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
}

.product-card {
    background-color: white;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.15);
    border-color: var(--primary-red);
}

.card-content {
    padding: 20px;
    text-align: center;
}

.product-icon {
    font-size: 3em;
    color: var(--primary-red);
    margin-bottom: 10px;
}

.product-name {
    font-size: 1.3em;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 5px;
}

.product-category {
    font-size: 0.9em;
    color: #888;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid #f0f0f0;
    background-color: #fcfcfc;
}

.product-price {
    font-size: 1.2em;
    font-weight: 800;
    color: var(--primary-red);
}

.availability-btn {
    background: none;
    border: none;
    color: var(--primary-red);
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 50px;
    color: #999;
    font-size: 1.2em;
    background-color: #fcfcfc;
    border-radius: 12px;
}

.no-results .pi {
    font-size: 2em;
    display: block;
    margin-bottom: 10px;
}

/* ========================================
4. STORES SECTION STYLES
========================================
*/
.stores-section-container {
    background-color: #f7f7f7;
    margin-bottom: 40px;
    /* Reduced margin-bottom back to original */
}

.stores-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.store-card {
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.store-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.store-icon {
    font-size: 3em;
    color: #5a7d9a;
    margin-bottom: 15px;
}

.store-name {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 5px;
}

.store-address {
    color: #777;
    margin-bottom: 20px;
    font-size: 0.95em;
}

.view-map-btn {
    background-color: #5a7d9a;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.view-map-btn:hover {
    background-color: #436a87;
}

/* ========================================
RESPONSIVE ADJUSTMENTS
========================================
*/

/* Mobile Adjustments */
@media (max-width: 700px) {
    section {
        padding: 40px 20px;
    }

    .section-header h2 {
        font-size: 2em;
    }

    .category-filters {
        justify-content: flex-start;
        padding-left: 0;
        width: 100%;
        overflow-x: scroll;
        flex-wrap: nowrap;
        padding-bottom: 10px;
    }

    .product-grid {
        grid-template-columns: 1fr;
    }
}
</style>