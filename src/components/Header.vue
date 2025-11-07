<template>
    <header class="main-header">
        <div class="header-content">

            <div class="header-left">
                <router-link to="/" class="logo-link">
                    <img src="/logo.png" alt="Company Logo" class="logo" />
                    <span class="site-name">Luked Pharma Co.</span>
                </router-link>
            </div>

            <nav class="main-nav">
                <!-- Products Dropdown -->
                <div class="nav-dropdown" @mouseenter="showProductsDropdown = true" @mouseleave="showProductsDropdown = false">
                    <router-link to="/products" class="nav-link dropdown-toggle">
                        <i class="pi pi-box nav-icon"></i>
                        <span class="nav-text">Products</span>
                        <i class="pi pi-chevron-down dropdown-icon"></i>
                    </router-link>
                    <div class="dropdown-menu" :class="{ active: showProductsDropdown }">
                        <router-link to="/products" class="dropdown-item">
                            <i class="pi pi-pill dropdown-item-icon"></i>
                            Medicine
                        </router-link>
                        <router-link to="/products" class="dropdown-item">
                            <i class="pi pi-cog dropdown-item-icon"></i>
                            Medical Equipment
                        </router-link>
                    </div>
                </div>

                <!-- Branch Dropdown -->
                <div class="nav-dropdown" @mouseenter="showBranchDropdown = true" @mouseleave="showBranchDropdown = false">
                    <button class="nav-link dropdown-toggle" @click="scrollToFooter">
                        <i class="pi pi-building nav-icon"></i>
                        <span class="nav-text">Branch</span>
                        <i class="pi pi-chevron-down dropdown-icon"></i>
                    </button>
                    <div class="dropdown-menu" :class="{ active: showBranchDropdown }">
                        <a href="#" class="dropdown-item" @click.prevent="scrollToFooter">
                            <i class="pi pi-map-marker dropdown-item-icon"></i>
                            Location 1
                        </a>
                        <a href="#" class="dropdown-item" @click.prevent="scrollToFooter">
                            <i class="pi pi-map-marker dropdown-item-icon"></i>
                            Location 2
                        </a>
                        <a href="#" class="dropdown-item" @click.prevent="scrollToFooter">
                            <i class="pi pi-map-marker dropdown-item-icon"></i>
                            Location 3
                        </a>
                    </div>
                </div>

                <!-- Contacts Button -->
                <button class="nav-link" @click="scrollToFooter">
                    <i class="pi pi-phone nav-icon"></i>
                    <span class="nav-text">Contacts</span>
                </button>

                <!-- Bag Dropdown -->
                <div class="nav-dropdown" @mouseenter="showBagDropdown = true" @mouseleave="showBagDropdown = false">
                    <router-link to="/bag" class="nav-link dropdown-toggle">
                        <i class="pi pi-shopping-bag nav-icon"></i>
                        <span class="nav-text">Bag</span>
                        <span v-if="itemCount > 0" class="bag-badge">{{ itemCount }}</span>
                        <i class="pi pi-chevron-down dropdown-icon"></i>
                    </router-link>
                    <div class="dropdown-menu bag-dropdown" :class="{ active: showBagDropdown }">
                        <div v-if="itemCount > 0" class="bag-preview">
                            <div class="bag-preview-header">
                                <span class="bag-preview-title">Recently Added</span>
                                <router-link to="/bag" class="view-bag-btn">View All</router-link>
                            </div>
                            <div class="bag-preview-items">
                                <div v-for="item in recentBagItems" :key="item.product.id" class="bag-preview-item">
                                    <span class="item-name">{{ item.product.name }}</span>
                                    <span class="item-quantity">×{{ item.quantity }}</span>
                                </div>
                            </div>
                            <div class="bag-preview-footer">
                                <span class="bag-total">Total: ₱{{ totalPrice.toFixed(2) }}</span>
                            </div>
                        </div>
                        <div v-else class="empty-bag">
                            <i class="pi pi-shopping-bag empty-bag-icon"></i>
                            <p class="empty-bag-text">Your bag is empty</p>
                            <router-link to="/products" class="explore-products-btn">
                                Explore Products
                            </router-link>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBag } from '@/composables/useBag.js'

const { bagState, getBagItems, getTotalPrice, getItemCount } = useBag()

// Dropdown visibility states
const showProductsDropdown = ref(false)
const showBranchDropdown = ref(false)
const showBagDropdown = ref(false)

// Computed properties
const itemCount = computed(() => getItemCount())
const totalPrice = computed(() => getTotalPrice())

// Get recent bag items (max 3 for preview)
const recentBagItems = computed(() => {
    const items = getBagItems()
    return items.slice(0, 3)
})

// Method to scroll to footer
const scrollToFooter = () => {
    const footer = document.querySelector('footer')
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped>
/* NOTE: Icons will only appear if primeicons/primeicons.css is imported globally. */

:root {
    --primary-red: #E74C3C;
    --bg-light-red: #FADBD8;
    --text-dark: #000000;
    --border-light: #ecf0f1;
    --search-bg: #ffffff;
}

.main-header {
    position: fixed;
        top: 0;
        left: 0;
        right: 0;
    background-color: var(--bg-light-red);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    padding: 15px 40px;
    margin-bottom: 20px;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    gap: 30px;
}

/* --- Left Section (Logo) --- */
.header-left {
    display: flex;
    align-items: center;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary-red);
    font-weight: 700;
}

.logo {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: contain;
}

.site-name {
    font-weight: 600;
    color: var(--primary-red);
    font-size: 1.6em;
}

/* --- Center Section (Search) --- */
.header-center {
    flex-grow: 1;
    max-width: 450px;
}

.search-input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid var(--border-light);
    border-radius: 25px;
    font-size: 1em;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: var(--search-bg);
}

.search-input:focus {
    border-color: var(--primary-red);
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

/* --- Right Section (Navigation) --- */
.main-nav {
    display: flex;
    gap: 15px;
}

.nav-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary-red);
    font-size: 1em;
    padding: 8px 12px;
    border-radius: 4px;
    transition: color 0.3s, background-color 0.3s;
    font-weight: 500;
    white-space: nowrap;
}

.nav-icon {
    margin-right: 6px;
    font-size: 1.1em;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: var(--bg-light-red);
    background-color: var(--primary-red);
}

/* Account Icon Styling (Icon-only on Desktop) */
.account-icon-link {
    padding: 8px 10px;
    margin-left: 5px;
}

.account-icon-link .nav-text {
    display: none;
}

.account-icon-link .nav-icon {
    margin-right: 0;
    font-size: 1.4em;
}


/* --- Responsive Adjustments --- */
/* Medium Screens (950px and below) */
@media (max-width: 950px) {
    .header-content {
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 15px;
    }

    .header-left {
        order: 1;
    }

    .main-nav {
        order: 3;
        flex-basis: 100%;
        justify-content: center;
        margin-left: 0;
    }

    .header-center {
        order: 2;
        flex-basis: 100%;
        max-width: 100%;
    }

    /* Re-show 'Account' text on wider mobile views */
    .account-icon-link .nav-text {
        display: initial;
    }

    .account-icon-link .nav-icon {
        margin-right: 6px;
        font-size: 1.1em;
    }
}

/* Small Screens (600px and below) - Icon-only navigation */
@media (max-width: 600px) {
    .main-header {
        padding: 15px 10px;
    }

    .header-content {
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    .header-left,
    .main-nav,
    .header-center {
        order: unset;
        margin: 0;
        width: 100%;
        max-width: 100%;
        justify-content: center;
    }

    .main-nav {
        flex-wrap: nowrap;
        justify-content: space-around;
        gap: 0;
    }

    .nav-link {
        padding: 6px 10px;
    }

    /* Hide text on all small-screen links */
    .nav-text {
        display: none;
    }

    .nav-icon {
        margin-right: 0;
        font-size: 1.2em;
    }

    .account-icon-link {
        margin-left: 0;
        padding: 6px 10px;
    }
}
</style>