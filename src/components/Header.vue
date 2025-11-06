<template>
    <header class="enhanced-header">
        <div class="header-top">
            <div class="header-content">
                <div class="header-left">
                    <router-link to="/" class="logo-link">
                        <img src="/logo.png" alt="Company Logo" class="logo" />
                        <span class="site-name">Luked Pharma Co.</span>
                    </router-link>
                    <div class="tagline">Your Trusted Health Partner Since 2020</div>
                </div>

                <div class="header-right">
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="pi pi-phone"></i>
                            <span>0919 002 4637</span>
                        </div>
                        <div class="contact-item">
                            <i class="pi pi-envelope"></i>
                            <span>lukedpharma@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="header-nav">
            <div class="nav-content">
                <nav class="main-nav">
                    <router-link to="/" class="nav-link">
                        <i class="pi pi-home"></i>
                        <span>Home</span>
                    </router-link>
                    <router-link to="#items" class="nav-link" @click="scrollToSection('items')">
                        <i class="pi pi-list"></i>
                        <span>Items</span>
                    </router-link>
                    <router-link to="#stores" class="nav-link" @click="scrollToSection('stores')">
                        <i class="pi pi-map-marker"></i>
                        <span>Stores</span>
                    </router-link>
                    <router-link to="#about" class="nav-link" @click="scrollToSection('about')">
                        <i class="pi pi-info-circle"></i>
                        <span>About</span>
                    </router-link>
                    <router-link to="/login" class="nav-link login-link">
                        <i class="pi pi-user"></i>
                        <span>Staff Portal</span>
                    </router-link>
                </nav>

                <div class="mobile-menu-toggle" @click="toggleMobileMenu">
                    <i class="pi" :class="mobileMenuOpen ? 'pi-times' : 'pi-bars'"></i>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="mobile-menu" @click="toggleMobileMenu">
            <div class="mobile-menu-content" @click.stop>
                <router-link to="/" class="mobile-nav-link" @click="toggleMobileMenu">
                    <i class="pi pi-home"></i>
                    <span>Home</span>
                </router-link>
                <router-link to="#items" class="mobile-nav-link" @click="scrollToSection('items'); toggleMobileMenu()">
                    <i class="pi pi-list"></i>
                    <span>Items</span>
                </router-link>
                <router-link to="#stores" class="mobile-nav-link" @click="scrollToSection('stores'); toggleMobileMenu()">
                    <i class="pi pi-map-marker"></i>
                    <span>Stores</span>
                </router-link>
                <router-link to="#about" class="mobile-nav-link" @click="scrollToSection('about'); toggleMobileMenu()">
                    <i class="pi pi-info-circle"></i>
                    <span>About</span>
                </router-link>
                <router-link to="/login" class="mobile-nav-link" @click="toggleMobileMenu">
                    <i class="pi pi-user"></i>
                    <span>Staff Portal</span>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
</script>

<style scoped>
:root {
    --primary-red: #E74C3C;
    --bg-light-red: #FADBD8;
    --text-dark: #000000;
    --border-light: #ecf0f1;
}

.main-header {
    background-color: var(--bg-light-red);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Adjusted padding slightly since the stacked button is gone */
    padding: 20px 40px;
    margin-bottom: 20px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
}

/* --- Layout Containers --- */
.header-left {
    /* No need for complex column layout anymore, just a wrapper */
    display: flex;
    align-items: center;
}

/* --- Logo Styling --- */
.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary-red);
    font-size: 1.5em;
    font-weight: 700;
    margin-left: -20px;
    /* Removed margin-bottom since nothing is stacked below it */
    margin-bottom: 0;
}

.logo {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    object-fit: contain;
}

.site-name {
    font-weight: 500;
    color: var(--primary-red);
    font-size: 1.8em;
}

/* --- Stacked Account Button Styling (REMOVED) --- */
/* .user-area-stacked and .account-link-stacked styles are gone */


/* --- Navigation Styling --- */
.main-nav {
    display: flex;
    gap: 15px;
    margin-left: auto;
}

.nav-link {
    text-decoration: none;
    color: var(--primary-red);
    font-size: 1.1em;
    padding: 10px 15px;
    border-radius: 4px;
    transition: color 0.3s, background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: var(--text-dark);
    background-color: #fce4e4;
    border-bottom: none;
}


/* --- Responsive Adjustments --- */
@media (max-width: 800px) {
    .header-content {
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    .header-left {
        align-items: center;
    }

    .logo-link {
        margin-left: 0;
    }

    .main-header {
        padding: 20px 20px;
    }

    .main-nav {
        gap: 10px;
        margin-left: 0;
    }

    .nav-link {
        padding: 8px 10px;
    }

    .logo {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .site-name {
        font-size: 1.5em;
    }
}
</style>