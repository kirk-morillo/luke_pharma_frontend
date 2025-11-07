<template>
    <header class="main-header sticky top-0 bg-white shadow-lg z-50 transition duration-300 ease-in-out py-3 sm:py-4">
        <div class="header-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

            <!-- Header Left (Logo and Site Name) -->
            <div class="header-left flex items-center">
                <router-link to="/"
                    class="logo-link flex items-center text-red-600 font-bold hover:text-red-700 transition">
                    <!-- Using your actual logo.png --><img src="/logo.png" alt="Luked Pharma Logo"
                        class="w-8 h-8 sm:w-10 sm:h-10 mr-2 object-contain rounded-full border-2 border-red-500" />
                    <span class="site-name text-lg sm:text-xl font-extrabold tracking-tight hidden sm:inline">
                        Luked Pharma Co.
                    </span>
                    <span class="site-name text-lg sm:text-xl font-extrabold tracking-tight sm:hidden">
                        Luked Pharma
                    </span>
                </router-link>
            </div>

            <!-- Main Navigation (Desktop) -->
            <nav class="main-nav hidden md:flex items-center space-x-2 lg:space-x-4">

                <!-- Products Dropdown -->
                <div class="relative group" @mouseenter="showProductsDropdown = true"
                    @mouseleave="showProductsDropdown = false">
                    <router-link to="/products" :class="['nav-link flex items-center p-3 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-700 transition relative',
                        isProductsActive ? 'bg-red-50 text-red-700' : '' // Apply active state
                    ]">
                        <i class="pi pi-box mr-2 text-lg"></i>
                        <span class="nav-text">Products</span>
                        <i
                            :class="['pi pi-chevron-down ml-1 text-xs transition-transform duration-200', { 'rotate-180': showProductsDropdown }]"></i>
                        <!-- Vertical red line for active state --><span v-if="isProductsActive"
                            class="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-0.5 bg-red-600 rounded-full"></span>
                    </router-link>

                    <div :class="['absolute top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 origin-top',
                        showProductsDropdown ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible']">
                        <router-link to="/products?category=medicine"
                            class="dropdown-item flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition border-b border-gray-100">
                            <i class="pi pi-plus-circle mr-3"></i>
                            <span>Medicine</span>
                        </router-link>
                        <router-link to="/products?category=equipment"
                            class="dropdown-item flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                            <i class="pi pi-cog mr-3"></i>
                            <span>Medical Equipment</span>
                        </router-link>
                    </div>
                </div>

                <!-- Branch Dropdown -->
                <div class="relative group" @mouseenter="showBranchDropdown = true"
                    @mouseleave="showBranchDropdown = false">
                    <button @click="scrollToFooter" :class="['nav-link flex items-center p-3 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-700 transition relative',
                        isLocationActive ? 'bg-red-50 text-red-700' : ''
                    ]">
                        <i class="pi pi-building mr-2 text-lg"></i>
                        <span class="nav-text">Location</span>
                        <i
                            :class="['pi pi-chevron-down ml-1 text-xs transition-transform duration-200', { 'rotate-180': showBranchDropdown }]"></i>
                        <span v-if="isLocationActive"
                            class="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-0.5 bg-red-600 rounded-full"></span>
                    </button>
                    <div :class="['absolute top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 origin-top',
                        showBranchDropdown ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible']">
                        <a href="#" @click.prevent="scrollToFooter"
                            class="dropdown-item flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition border-b border-gray-100">
                            <i class="pi pi-map-marker mr-3 text-red-500"></i> Location 1
                        </a>
                        <a href="#" @click.prevent="scrollToFooter"
                            class="dropdown-item flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition border-b border-gray-100">
                            <i class="pi pi-map-marker mr-3 text-red-500"></i> Location 2
                        </a>
                        <a href="#" @click.prevent="scrollToFooter"
                            class="dropdown-item flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                            <i class="pi pi-map-marker mr-3 text-red-500"></i> Location 3
                        </a>
                    </div>
                </div>

                <!-- Contacts Button (Direct Link) --><button @click="scrollToFooter" :class="['nav-link flex items-center p-3 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-700 transition relative',
                    isContactsActive ? 'bg-red-50 text-red-700' : ''
                ]">
                    <i class="pi pi-phone mr-2 text-lg"></i>
                    <span class="nav-text">Contacts</span>
                    <span v-if="isContactsActive"
                        class="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-0.5 bg-red-600 rounded-full"></span>
                </button>

            </nav>

            <!-- Bag Dropdown / Mobile Menu (Right) -->
            <div class="flex items-center space-x-4">
                <div class="relative group" @mouseenter="showBagDropdown = true" @mouseleave="showBagDropdown = false">
                    <router-link to="/bag" :class="['nav-link flex items-center p-3 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-700 transition relative',
                        isBagPage ? 'bg-red-50 text-red-700' : ''
                    ]">
                        <div class="relative">
                            <i class="pi pi-shopping-bag text-lg sm:text-xl"></i>
                            <span v-if="itemCount > 0 && !isBagPage"
                                class="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                                {{ itemCount }}
                            </span>
                        </div>
                        <span class="nav-text ml-2 hidden sm:inline">Bag</span>
                        <span v-if="isBagPage"
                            class="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-0.5 bg-red-600 rounded-full"></span>
                    </router-link>

                    <div :class="['absolute top-full mt-2 w-72 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 origin-top right-0',
                        showBagDropdown ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible']">
                        <div v-if="itemCount > 0" class="p-4">
                            <div class="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                                <span class="text-base font-semibold text-gray-800">Recently Added ({{ itemCount
                                }})</span>
                                <router-link to="/bag" class="text-sm font-medium text-red-600 hover:text-red-700">View
                                    Bag</router-link>
                            </div>
                            <div class="space-y-2 max-h-40 overflow-y-auto mb-3">
                                <div v-for="item in recentBagItems" :key="item.product.id"
                                    class="flex justify-between items-center text-sm">
                                    <span class="item-name text-gray-700 truncate mr-2">{{ item.product.name }}</span>
                                    <span class="item-quantity font-semibold text-red-600 flex-shrink-0">×{{
                                        item.quantity }}</span>
                                </div>
                            </div>
                            <div class="pt-3 border-t border-gray-100 flex justify-between items-center">
                                <span class="text-base font-bold text-gray-800">Total:</span>
                                <span class="bag-total text-xl font-extrabold text-red-600">₱{{ totalPrice.toFixed(2)
                                }}</span>
                            </div>
                        </div>
                        <div v-else class="p-6 text-center">
                            <i class="pi pi-shopping-bag text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500 mb-4">Your bag is empty. Start shopping now!</p>
                            <router-link to="/products"
                                class="inline-block px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                                Explore Products
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Mobile Navigation (Footer-style bar on small screens) -->
        <nav
            class="main-nav-mobile md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl p-2 flex justify-around">
            <router-link to="/bag"
                class="flex flex-col items-center p-1 text-gray-500 hover:text-red-600 transition relative">
                <i class="pi pi-shopping-bag text-xl"></i>
                <span class="text-xs">Bag</span>
                <span v-if="itemCount > 0 && !isBagPage"
                    class="absolute top-0 right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center -mt-1 -mr-1 ring-2 ring-white z-10">
                    {{ itemCount }}
                </span>
            </router-link>

            <router-link to="/products"
                class="flex flex-col items-center p-1 text-gray-500 hover:text-red-600 transition">
                <i class="pi pi-box text-xl"></i>
                <span class="text-xs">Products</span>
            </router-link>
            <button @click="scrollToFooter"
                class="flex flex-col items-center p-1 text-gray-500 hover:text-red-600 transition">
                <i class="pi pi-building text-xl"></i>
                <span class="text-xs">Location</span>
            </button>
            <button @click="scrollToFooter"
                class="flex flex-col items-center p-1 text-gray-500 hover:text-red-600 transition">
                <i class="pi pi-phone text-xl"></i>
                <span class="text-xs">Contacts</span>
            </button>
        </nav>
    </header>
    <div class="h-5 md:h-5"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBag } from '@/composables/useBag.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getBagItems, getTotalPrice, getItemCount } = useBag()

const showProductsDropdown = ref(false)
const showBranchDropdown = ref(false)
const showBagDropdown = ref(false)

const itemCount = computed(() => getItemCount())
const totalPrice = computed(() => getTotalPrice())

const isBagPage = computed(() => route.path === '/bag')
const isProductsActive = computed(() => route.path.startsWith('/products')) // For Products & sub-categories
const isLocationActive = computed(() => route.hash === '#footer') // Assuming location scrolls to footer
const isContactsActive = computed(() => route.hash === '#footer') // Assuming contacts scrolls to footer

const recentBagItems = computed(() => {
    const items = getBagItems()
    return items.slice(0, 3)
})

const scrollToFooter = () => {
    const footer = document.querySelector('footer')
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>