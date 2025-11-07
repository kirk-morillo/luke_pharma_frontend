<template>
    <div class="landing-page-container">
        <Header />

        <main class="main-content">
            <!-- Hero Section -->
            <section id="hero" class="hero-section">
                <div class="hero-text-content">
                    <h1>"Your Health, Our Commitment"</h1>
                    <p class="subtitle-text">Trusted pharmaceutical care with quality medicines and health supplies for your family's wellness journey.</p>
                    <router-link to="/products" class="hero-cta-button">
                        Explore Products <i class="pi pi-arrow-right"></i>
                    </router-link>
                </div>
            </section>

            <!-- Frequently Sold Products Section -->
            <section id="frequently-sold" class="frequently-sold-section">
                <div class="section-header">
                    <h2>Frequently Sold Products</h2>
                    <p>Discover our most popular health essentials trusted by our community.</p>
                </div>

                <div class="products-grid">
                    <div v-for="product in frequentlySoldProducts" :key="product.id" class="product-card"
                         @mouseenter="hoveredProduct = product.id"
                         @mouseleave="hoveredProduct = null">
                        <div class="card-content">
                            <i :class="getProductIcon(product.category)" class="product-icon"></i>
                            <h4 class="product-name">{{ product.name }}</h4>
                            <p class="product-description">{{ product.description }}</p>
                        </div>
                        <div class="card-footer">
                            <div>
                                <span class="product-price">₱{{ product.price.toFixed(2) }}</span>
                                <p class="stock-locations">
                                    <i class="pi pi-map-marker"></i>
                                    {{ product.stockLocations.join(', ') }}
                                </p>
                            </div>
                            <button @click.stop="addToBag(product)"
                                    class="add-to-bag-btn"
                                    :disabled="!product.inStock">
                                <i class="pi pi-shopping-bag"></i>
                                Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Branch Carousel Section -->
            <section id="branches" class="branches-section">
                <div class="section-header">
                    <h2>Our Store Branches</h2>
                    <p>Visit any of our convenient locations serving your community.</p>
                </div>

                <div class="carousel-container">
                    <button @click="previousBranches" class="carousel-arrow prev-arrow">
                        <i class="pi pi-chevron-left"></i>
                    </button>

                    <div class="carousel-wrapper">
                        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="(branch, index) in displayedBranches" :key="`${branch.id}-${index}`"
                                 class="branch-card">
                                <div class="branch-icon">
                                    <i class="pi pi-building"></i>
                                </div>
                                <h3 class="branch-name">{{ branch.name }}</h3>
                                <p class="branch-hours">{{ branch.serviceHours }}</p>
                                <div class="branch-contact">
                                    <p><i class="pi pi-phone"></i> {{ branch.contact }}</p>
                                    <p><i class="pi pi-envelope"></i> {{ branch.email }}</p>
                                </div>
                                <button class="branch-details-btn">
                                    View Details <i class="pi pi-external-link"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button @click="nextBranches" class="carousel-arrow next-arrow">
                        <i class="pi pi-chevron-right"></i>
                    </button>
                </div>

                <!-- Carousel Indicators -->
                <div class="carousel-indicators">
                    <button v-for="(_, index) in totalCarouselSlides"
                            :key="index"
                            @click="goToSlide(index)"
                            :class="{ active: index === currentSlideIndex }"
                            class="indicator">
                    </button>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import { useBag } from '@/composables/useBag.js';
import { frequentlySoldProducts, mockBranches } from '@/data/mockData.js';

// Bag functionality
const { addToBag: bagAddToBag } = useBag();

// State management
const hoveredProduct = ref(null);
const currentIndex = ref(0);
const autoPlayInterval = ref(null);

// Carousel logic
const BRANCHES_PER_SLIDE = 3;
const displayedBranches = computed(() => {
    const branches = [];
    const totalBranches = mockBranches.length;

    // Create infinite carousel by duplicating branches
    for (let i = 0; i < totalBranches * 3; i++) {
        branches.push(mockBranches[i % totalBranches]);
    }

    return branches;
});

const totalCarouselSlides = computed(() => {
    return Math.ceil(displayedBranches.value.length / BRANCHES_PER_SLIDE);
});

const currentSlideIndex = computed(() => {
    return Math.floor(currentIndex.value / BRANCHES_PER_SLIDE);
});

// Methods
const getProductIcon = (category) => {
    const icons = {
        'Medicine': 'pi pi-pill',
        'Medical Equipment': 'pi pi-cog'
    };
    return icons[category] || 'pi pi-box';
};

const addToBag = (product) => {
    if (product.inStock) {
        bagAddToBag(product, 1);
        // Show success feedback (you can integrate SweetAlert2 here later)
        console.log(`Added ${product.name} to bag`);
    }
};

const nextBranches = () => {
    const maxIndex = displayedBranches.value.length - BRANCHES_PER_SLIDE;
    currentIndex.value = (currentIndex.value + BRANCHES_PER_SLIDE) % (maxIndex + 1);
};

const previousBranches = () => {
    const maxIndex = displayedBranches.value.length - BRANCHES_PER_SLIDE;
    currentIndex.value = currentIndex.value - BRANCHES_PER_SLIDE < 0
        ? maxIndex
        : currentIndex.value - BRANCHES_PER_SLIDE;
};

const goToSlide = (slideIndex) => {
    currentIndex.value = slideIndex * BRANCHES_PER_SLIDE;
};

const startAutoPlay = () => {
    autoPlayInterval.value = setInterval(() => {
        nextBranches();
    }, 5000);
};

const stopAutoPlay = () => {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
        autoPlayInterval.value = null;
    }
};

onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<style scoped>
/* --- CSS Variables --- */
:root {
    --primary-red: #E74C3C;
    --bg-light-red: #FADBD8;
    --text-dark: #000000;
    --border-light: #ecf0f1;
    --text-secondary: #666666;
    --shadow-light: 0 2px 8px rgba(0,0,0,0.1);
    --shadow-medium: 0 4px 16px rgba(0,0,0,0.15);
}

.landing-page-container {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
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
    margin-bottom: 50px;
}

.section-header h2 {
    font-size: 2.5em;
    font-weight: 700;
    color: var(--primary-red);
    margin-bottom: 15px;
    font-family: 'Poppins', sans-serif;
}

.section-header p {
    color: var(--text-secondary);
    font-size: 1.1em;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
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