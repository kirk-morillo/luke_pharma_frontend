<template>
    <div class="landing-page-container page-container">
        <Header />

        <main class="main-content">
            <section id="hero" class="hero-section">
                <div class="hero-text-content">
                    <h1>"Your Health, Our Commitment"</h1>
                    <p class="subtitle-text">Trusted pharmaceutical care with quality medicines and health supplies for
                        your family's wellness journey.</p>
                    <router-link to="/products" class="hero-cta-button">
                        Explore Products <i class="pi pi-arrow-right"></i>
                    </router-link>
                </div>
            </section>

            <section id="frequently-sold" class="frequently-sold-section">
                <div class="section-header">
                    <h2>Frequently Sold Products</h2>
                    <p>Discover our most popular health essentials trusted by our community.</p>
                </div>

                <div class="products-grid">
                    <ProductCard
                        v-for="product in frequentlySoldProducts"
                        :key="product.id"
                        :product="product"
                        @add-to-bag="handleAddToBag"
                    />
                </div>
            </section>

            <section id="branches" class="branches-section">
                <div class="section-header">
                    <h2>Our Store Branches</h2>
                    <p>Visit any of our convenient locations serving your community.</p>
                </div>

                <div class="carousel-container carousel-responsive" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
                    <button @click="previousBranches" class="carousel-arrow prev-arrow">
                        <i class="pi pi-chevron-left"></i>
                    </button>

                    <div class="carousel-wrapper">
                        <div class="carousel-track"
                            :style="{
                                transform: `translateX(-${currentIndex * (100 / getBranchesPerSlide())}%)`,
                                width: `${(mockBranches.length / getBranchesPerSlide()) * 100}%`
                            }">
                            <div v-for="branch in mockBranches" :key="branch.id" class="branch-card"
                                :style="{
                                    minWidth: `${100 / getBranchesPerSlide()}%`,
                                    padding: getResponsivePadding()
                                }">
                                <div class="branch-icon" :style="branchIconStyle">
                                    <i class="pi pi-building"></i>
                                </div>
                                <h3 class="branch-name" :style="branchNameStyle">{{ branch.name }}</h3>
                                <p class="branch-hours" :style="branchHoursStyle">{{ branch.serviceHours }}</p>
                                <div class="branch-contact">
                                    <p :style="branchContactStyle">
                                        <i class="pi pi-phone" style="margin-right: 8px; color: var(--primary-red, #E74C3C);"></i>
                                        {{ branch.contact }}
                                    </p>
                                    <p :style="branchContactStyle">
                                        <i class="pi pi-envelope" style="margin-right: 8px; color: var(--primary-red, #E74C3C);"></i>
                                        {{ branch.email }}
                                    </p>
                                </div>
                                <button class="branch-details-btn" :style="branchButtonStyle">
                                    View Details <i class="pi pi-external-link" style="margin-left: 8px;"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button @click="nextBranches" class="carousel-arrow next-arrow">
                        <i class="pi pi-chevron-right"></i>
                    </button>
                </div>

                <div class="carousel-indicators">
                    <button v-for="(_, index) in totalCarouselSlides" :key="index" @click="goToSlide(index)"
                        :class="{ active: index === currentSlideIndex }" class="indicator">
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
import ProductCard from '../../components/ProductCard.vue';
import { useBag } from '@/composables/useBag.js';
import { frequentlySoldProducts, mockBranches } from '@/data/mockData.js';
import { showProductAddedAlert } from '@/utils/sweetAlertConfig.js';

// Bag functionality
const { addToBag: bagAddToBag } = useBag();

// State management
const currentIndex = ref(0); // Tracks the index of the first visible branch
const autoPlayInterval = ref(null);

// Responsive carousel logic
const getBranchesPerSlide = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) return 1; // Mobile
        if (window.innerWidth <= 1024) return 2; // Tablet
        return 3; // Desktop
    }
    return 3; // Default for SSR
};

const totalBranches = computed(() => mockBranches.length);
const branchesPerSlide = ref(getBranchesPerSlide());

// Calculated property for the number of slides
const totalCarouselSlides = computed(() => {
    return Math.ceil(totalBranches.value / branchesPerSlide.value);
});

// The current slide index for the indicators
const currentSlideIndex = computed(() => {
    return Math.floor(currentIndex.value / branchesPerSlide.value);
});

// Responsive branch styling
const branchIconStyle = computed(() => ({
    fontSize: window.innerWidth < 768 ? '2.5em' : '3.5em',
    color: 'var(--primary-red, #E74C3C)',
    marginBottom: window.innerWidth < 768 ? '15px' : '20px',
    opacity: 0.8,
    transition: 'all 0.3s ease'
}));

const branchNameStyle = computed(() => ({
    fontSize: window.innerWidth < 768 ? '1.2em' : '1.4em',
    color: 'var(--text-dark, #000000)',
    marginBottom: window.innerWidth < 768 ? '8px' : '10px',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif'
}));

const branchHoursStyle = computed(() => ({
    color: 'var(--text-secondary, #666666)',
    marginBottom: window.innerWidth < 768 ? '12px' : '15px',
    fontSize: window.innerWidth < 768 ? '0.9em' : '0.95em',
    fontFamily: 'Poppins, sans-serif'
}));

const branchContactStyle = computed(() => ({
    color: 'var(--text-secondary, #666666)',
    margin: '5px 0',
    fontSize: window.innerWidth < 768 ? '0.85em' : '0.9em',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const branchButtonStyle = computed(() => ({
    backgroundColor: 'var(--primary-red, #E74C3C)',
    color: 'white',
    border: 'none',
    padding: window.innerWidth < 768 ? '8px 16px' : '10px 20px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: window.innerWidth < 768 ? '12px' : '15px',
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontSize: window.innerWidth < 768 ? '0.9em' : '1em'
}));

const getResponsivePadding = () => {
    return window.innerWidth < 768 ? '30px 20px' : '40px 30px';
};

// Handle window resize
const handleResize = () => {
    branchesPerSlide.value = getBranchesPerSlide();
    currentIndex.value = 0; // Reset to first slide on resize
};


// Methods
const handleAddToBag = (product) => {
    if (product.inStock) {
        bagAddToBag(product, 1, false); // Feedback handled by composable
    }
};

const nextBranches = () => {
    // Determine the furthest possible starting index (the index of the first branch in the last 'slide')
    const lastBranchIndex = totalBranches.value - branchesPerSlide.value;

    // Calculate the new index. Max of 0 is needed in case totalBranches < branchesPerSlide
    const maxIndex = Math.max(0, lastBranchIndex);

    // Move by the slide size (branchesPerSlide)
    let newIndex = currentIndex.value + branchesPerSlide.value;

    // Wrap around to the start (index 0) if we exceed the max index.
    if (newIndex > maxIndex) {
        newIndex = 0;
    }

    currentIndex.value = newIndex;
};

const previousBranches = () => {
    const lastBranchIndex = totalBranches.value - branchesPerSlide.value;
    const maxIndex = Math.max(0, lastBranchIndex);

    let newIndex = currentIndex.value - branchesPerSlide.value;

    // Wrap around to the last slide if we go below 0
    if (newIndex < 0) {
        // Calculate the starting index of the *last* complete/partial slide
        const lastSlideStart = Math.floor(maxIndex / branchesPerSlide.value) * branchesPerSlide.value;
        newIndex = lastSlideStart;
    }

    currentIndex.value = newIndex;
};

const goToSlide = (slideIndex) => {
    // Move to the starting branch index of the requested slide
    currentIndex.value = slideIndex * branchesPerSlide.value;

    // Ensure we don't exceed the boundary
    const lastBranchIndex = totalBranches.value - branchesPerSlide.value;
    const maxIndex = Math.max(0, lastBranchIndex);

    if (currentIndex.value > maxIndex) {
        currentIndex.value = maxIndex;
    }
};

const startAutoPlay = () => {
    // Only start if it's not already running
    if (!autoPlayInterval.value) {
        autoPlayInterval.value = setInterval(() => {
            nextBranches();
        }, 5000);
    }
};

const stopAutoPlay = () => {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
        autoPlayInterval.value = null;
    }
};

onMounted(() => {
    startAutoPlay();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    stopAutoPlay();
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.landing-page-container {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    background-color: #f7f7f7;
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
    color: var(--primary-red, #E74C3C);
    margin-bottom: 15px;
    font-family: 'Poppins', sans-serif;
}

.section-header p {
    color: var(--text-secondary, #666666);
    font-size: 1.1em;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
}

/* Hero Section */
.hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, #fefefe, #FADBD8);
    padding: 120px 40px;
    min-height: 500px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: relative;
    overflow: hidden;
}

.hero-text-content h1 {
    font-size: 3.5em;
    color: var(--text-dark, #000000);
    margin-bottom: 20px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    line-height: 1.2;
}

.subtitle-text {
    font-size: 1.3em;
    color: var(--text-secondary, #666666);
    margin-bottom: 35px;
    font-weight: 400;
    font-family: 'Poppins', sans-serif';
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
}

.hero-cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: var(--primary-red, #E74C3C);
    color: white;
    padding: 15px 35px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1em;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.3);
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.hero-cta-button:hover {
    background-color: #C0392B;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
    text-decoration: none;
    color: white;
}

/* Products Section */
.frequently-sold-section {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 30px auto;
}

/* Branches Carousel */
.branches-section {
    background-color: #f8f9fa;
    margin: 30px auto 40px;
    border-radius: 20px;
}

.carousel-container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 15px;
}

.carousel-wrapper {
    overflow: hidden;
    border-radius: 15px;
}

.carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.branch-card {
    text-align: center;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
    transition: all 0.3s ease;
}

.branch-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--primary-red, #E74C3C);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;
    font-size: 1.2em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-arrow:hover {
    background-color: #C0392B;
    transform: translateY(-50%) scale(1.1);
}

.prev-arrow {
    left: -25px;
}

.next-arrow {
    right: -25px;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 25px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--primary-red, #E74C3C);
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s;
}

.indicator.active {
    background-color: var(--primary-red, #E74C3C);
}

.indicator:hover {
    transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .carousel-arrow {
        width: 45px;
        height: 45px;
    }

    .prev-arrow {
        left: -20px;
    }

    .next-arrow {
        right: -20px;
    }
}

@media (max-width: 768px) {
    section {
        padding: 40px 20px;
    }

    .hero-section {
        padding: 80px 20px;
        min-height: 400px;
    }

    .hero-text-content h1 {
        font-size: 2.2em;
        line-height: 1.3;
    }

    .subtitle-text {
        font-size: 1.1em;
        margin-bottom: 25px;
    }

    .hero-cta-button {
        padding: 12px 25px;
        font-size: 1em;
    }

    .section-header h2 {
        font-size: 2em;
        margin-bottom: 12px;
    }

    .carousel-arrow {
        display: flex;
        top: 30%;
    }

    .prev-arrow {
        left: 0;
    }

    .next-arrow {
        right: 0;
    }

    .carousel-container {
        margin: 0 40px;
    }
}

@media (max-width: 480px) {
    .hero-text-content h1 {
        font-size: 1.8em;
    }

    .subtitle-text {
        font-size: 1em;
    }

    .carousel-container {
        margin: 0 20px;
    }
}
</style>