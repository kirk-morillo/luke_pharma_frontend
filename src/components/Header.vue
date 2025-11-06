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
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<style scoped>
:root {
    --primary-red: #E74C3C;
    --secondary-blue: #3498db;
    --dark-bg: #1f2a38;
    --light-bg: #f8f9fa;
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --border-light: #ecf0f1;
}

.enhanced-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Header Top Section */
.header-top {
    background: linear-gradient(135deg, var(--primary-red), #c0392b);
    color: white;
    padding: 15px 0;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}

.header-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 700;
    margin-bottom: 8px;
}

.logo {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

.site-name {
    font-weight: 700;
    color: white;
    font-size: 1.8em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.tagline {
    font-size: 0.9em;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    margin-left: 65px;
}

.header-right {
    display: flex;
    align-items: center;
}

.contact-info {
    display: flex;
    gap: 30px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
}

.contact-item i {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1em;
}

.contact-item span {
    color: white;
    font-weight: 500;
}

/* Navigation Section */
.header-nav {
    background: white;
    border-bottom: 1px solid var(--border-light);
    position: relative;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}

.main-nav {
    display: flex;
    align-items: center;
    gap: 5px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--text-dark);
    font-size: 1em;
    font-weight: 500;
    padding: 20px 20px;
    border-radius: 0;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: var(--primary-red);
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: var(--primary-red);
    background-color: rgba(231, 76, 60, 0.05);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
    width: 80%;
}

.nav-link.router-link-active {
    color: var(--primary-red);
    background-color: rgba(231, 76, 60, 0.05);
}

.nav-link.login-link {
    background: var(--primary-red);
    color: white;
    margin-left: 10px;
    border-radius: 8px;
    padding: 12px 24px;
    transition: all 0.3s ease;
}

.nav-link.login-link:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.nav-link.login-link::after {
    display: none;
}

.nav-link i {
    font-size: 1.1em;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5em;
    color: var(--text-dark);
    cursor: pointer;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.mobile-menu-toggle:hover {
    background-color: var(--light-bg);
}

/* Mobile Menu */
.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.mobile-menu-content {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: var(--text-dark);
    font-size: 1.1em;
    font-weight: 500;
    padding: 15px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 5px;
}

.mobile-nav-link:hover {
    background-color: var(--light-bg);
    color: var(--primary-red);
}

.mobile-nav-link i {
    font-size: 1.2em;
    width: 24px;
    text-align: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .header-content,
    .nav-content {
        padding: 0 20px;
    }

    .contact-info {
        gap: 20px;
    }

    .contact-item {
        font-size: 0.85em;
    }

    .tagline {
        font-size: 0.8em;
    }
}

@media (max-width: 768px) {
    .header-top {
        padding: 10px 0;
    }

    .header-content {
        flex-direction: column;
        gap: 15px;
        padding: 0 15px;
    }

    .header-left {
        align-items: center;
    }

    .logo-link {
        margin-bottom: 5px;
    }

    .tagline {
        margin-left: 0;
        text-align: center;
        font-size: 0.85em;
    }

    .contact-info {
        gap: 15px;
    }

    .contact-item {
        font-size: 0.8em;
    }

    .logo {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .site-name {
        font-size: 1.5em;
    }

    .nav-content {
        padding: 0 15px;
    }

    .main-nav {
        display: none;
    }

    .mobile-menu-toggle {
        display: block;
    }

    .nav-link {
        padding: 15px 20px;
    }
}

@media (max-width: 480px) {
    .header-content {
        padding: 0 10px;
    }

    .contact-info {
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }

    .logo {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }

    .site-name {
        font-size: 1.3em;
    }

    .tagline {
        font-size: 0.75em;
    }

    .nav-content {
        padding: 0 10px;
    }
}

/* Animation for mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>