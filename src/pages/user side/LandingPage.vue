<template>
    <div class="min-h-screen flex flex-col font-sans bg-gray-50">
        <Header />

        <main class="flex-grow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8 lg:py-16">

                <section id="hero"
                    class="flex flex-col items-center justify-center text-center bg-gradient-to-br from-white to-red-50/70 rounded-3xl shadow-xl p-12 lg:p-20 relative overflow-hidden">
                    <div class="hero-text-content max-w-3xl">
                        <h1
                            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 lg:mb-6 leading-tight">
                            "Your Health, Our Commitment"
                        </h1>
                        <p class="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-10 max-w-xl mx-auto leading-relaxed">
                            Trusted pharmaceutical care with quality medicines and health
                            supplies for your family's wellness journey.
                        </p>
                        <router-link to="/products"
                            class="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-xl font-bold uppercase tracking-wider shadow-lg shadow-red-100/50 transition-all duration-300 transform hover:scale-105">
                            Explore Products <i class="pi pi-arrow-right"></i>
                        </router-link>
                    </div>
                </section>

                <section id="frequently-sold"
                    class="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
                    <div class="section-header text-center mb-10">
                        <h2 class="text-3xl sm:text-4xl font-extrabold text-red-600 mb-3">
                            Frequently Sold Products
                        </h2>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our most popular health essentials trusted by our community.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        <template v-if="loadingProducts">
                            <div v-for="i in 4" :key="i"
                                class="product-card bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 h-64 animate-pulse">
                                <div class="bg-gray-200 h-20 w-20 rounded-full mx-auto mb-4"></div>
                                <div class="bg-gray-200 h-6 w-3/4 mx-auto mb-2 rounded"></div>
                                <div class="bg-gray-200 h-4 w-1/2 mx-auto mb-8 rounded"></div>
                                <div class="bg-red-100 h-10 w-2/3 mx-auto rounded-full"></div>
                            </div>
                        </template>
                        <template v-else>
                            <ProductCard v-for="product in frequentlySoldProducts" :key="product.product_id"
                                :product="product" @add-to-bag="handleAddToBag" />
                        </template>
                    </div>
                </section>

                <section id="branches" class="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                    <div class="section-header text-center mb-10">
                        <h2 class="text-3xl sm:text-4xl font-extrabold text-red-600 mb-3">
                            Our Store Branches 🗺️
                        </h2>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            Visit any of our convenient locations serving your community.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        <div v-for="branch in mockBranches.slice(0, 3)" :key="branch.id"
                            class="branch-card text-center bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm border-2 border-transparent hover:border-red-400">

                            <div class="branch-icon text-5xl text-red-600 mb-4 opacity-90">
                                <i class="pi pi-map-marker"></i>
                            </div>

                            <h3 class="text-2xl font-extrabold text-gray-900 mb-2">
                                {{ branch.name }}
                            </h3>

                            <p class="text-sm text-gray-500 mb-6 font-medium">
                                <i class="pi pi-clock mr-1 text-red-400"></i> {{ branch.serviceHours }}
                            </p>

                            <div class="branch-contact mb-6 border-y border-gray-100 py-4 flex flex-col items-center">
                                <p
                                    class="flex items-center justify-center font-semibold text-base whitespace-nowrap mb-2">
                                    <i class="pi pi-phone text-red-600 mr-2 flex-shrink-0"></i>
                                    {{ branch.contact }}
                                </p>
                                <p class="flex items-center justify-center text-sm whitespace-nowrap">
                                    <i class="pi pi-envelope text-red-600 mr-2 flex-shrink-0"></i>
                                    {{ branch.email }}
                                </p>
                            </div>

                            <button
                                class="w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-bold transition duration-300 transform hover:scale-[1.02] shadow-md">
                                View Map & Details
                                <i class="pi pi-arrow-right ml-2 text-sm"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import ProductCard from "../../components/ProductCard.vue";
import { useBag } from "@/composables/useBag.js";
import { mockBranches } from "@/data/mockData.js";

const frequentlySoldProducts = ref([]);
const loadingProducts = ref(true);

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        frequentlySoldProducts.value = data;
    } catch (error) {
        console.error('Failed to fetch frequently sold products:', error);
        // Optionally, display a user-friendly error message
    } finally {
        loadingProducts.value = false;
    }
});


// --- Bag Composable ---
const { addToBag: bagAddToBag } = useBag();

const handleAddToBag = (product) => {
    if (product.stock_quantity > 0) {
        bagAddToBag(product, 1, false);
    }
};
</script>