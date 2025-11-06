<template>
    <footer class="enhanced-footer">
        <!-- Newsletter Section -->
        <div class="newsletter-section">
            <div class="newsletter-content">
                <div class="newsletter-info">
                    <h3 class="newsletter-title">
                        <i class="pi pi-envelope"></i>
                        Stay Updated with Health Tips
                    </h3>
                    <p class="newsletter-subtitle">Get the latest health news and exclusive offers delivered to your inbox</p>
                </div>
                <div class="newsletter-form">
                    <div class="form-group">
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your email address"
                            class="newsletter-input"
                            @keyup.enter="subscribeNewsletter"
                        />
                        <button @click="subscribeNewsletter" class="newsletter-btn" :disabled="!email || isSubscribing">
                            <i class="pi" :class="isSubscribing ? 'pi-spin pi-spinner' : 'pi-send'"></i>
                            {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
                        </button>
                    </div>
                    <p v-if="subscribeMessage" class="subscribe-message" :class="subscribeMessage.type">
                        {{ subscribeMessage.text }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Footer Content -->
        <div class="footer-main">
            <div class="footer-content">

                <!-- Company Info Section -->
                <div class="footer-section footer-company">
                    <router-link to="/" class="footer-logo-link">
                        <img src="/logo.png" alt="Company Logo" class="footer-logo" />
                        <span class="footer-site-name">Luked Pharma Co.</span>
                    </router-link>
                    <p class="tagline">Your trusted health partner since 2020. We are committed to providing quality medicines and healthcare products to serve our community.</p>

                    <div class="social-links">
                        <h4 class="social-title">Follow Us</h4>
                        <div class="social-icons">
                            <a href="https://www.facebook.com/profile.php?id=100083107822016" target="_blank"
                                rel="noopener noreferrer" class="social-link">
                                <i class="pi pi-facebook"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                                <i class="pi pi-instagram"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                                <i class="pi pi-twitter"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                                <i class="pi pi-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    <div class="app-download">
                        <h4 class="app-title">Download Our App</h4>
                        <div class="app-buttons">
                            <button class="app-btn">
                                <i class="pi pi-mobile"></i>
                                <div class="app-btn-text">
                                    <span class="app-small">Download on the</span>
                                    <span class="app-large">App Store</span>
                                </div>
                            </button>
                            <button class="app-btn">
                                <i class="pi pi-android"></i>
                                <div class="app-btn-text">
                                    <span class="app-small">Get it on</span>
                                    <span class="app-large">Google Play</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Links Section -->
                <div class="footer-section footer-links">
                    <div class="section-title-icon-wrapper">
                        <h3 class="section-title">Quick Links</h3>
                    </div>
                    <div class="links-grid">
                        <div class="link-column">
                            <h4 class="link-column-title">Products</h4>
                            <ul class="link-list">
                                <li><a href="#items" class="footer-link">All Medicines</a></li>
                                <li><a href="#" class="footer-link">Medical Supplies</a></li>
                                <li><a href="#" class="footer-link">Personal Care</a></li>
                                <li><a href="#" class="footer-link">Vitamins</a></li>
                                <li><a href="#" class="footer-link">Prescriptions</a></li>
                            </ul>
                        </div>
                        <div class="link-column">
                            <h4 class="link-column-title">Services</h4>
                            <ul class="link-list">
                                <li><a href="#" class="footer-link">Free Delivery</a></li>
                                <li><a href="#" class="footer-link">Online Consultation</a></li>
                                <li><a href="#" class="footer-link">Health Checkup</a></li>
                                <li><a href="#" class="footer-link">Prescription Transfer</a></li>
                                <li><a href="#" class="footer-link">Senior Citizen Program</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Locations Section -->
                <div class="footer-section footer-locations">
                    <div class="section-title-icon-wrapper">
                        <h3 class="section-title">Our Locations</h3>
                    </div>
                    <div class="locations-list">
                        <div class="location-item" v-for="location in mainLocations" :key="location.id">
                            <div class="location-info">
                                <i class="pi pi-map-marker location-icon"></i>
                                <div class="location-details">
                                    <h4 class="location-name">{{ location.name }}</h4>
                                    <p class="location-address">{{ location.address }}</p>
                                    <span class="location-hours">{{ location.hours }}</span>
                                </div>
                            </div>
                            <button @click="callLocation(location.phone)" class="location-call">
                                <i class="pi pi-phone"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Staff Portal Section -->
                <div class="footer-section footer-staff">
                    <div class="section-title-icon-wrapper">
                        <h3 class="section-title">Staff Portal</h3>
                    </div>
                    <div class="staff-portal">
                        <div class="staff-info">
                            <i class="pi pi-lock staff-icon"></i>
                            <p class="staff-description">Access staff dashboard, inventory management, and POS system</p>
                        </div>
                        <div class="staff-buttons">
                            <router-link to="/login" class="staff-login-btn">
                                <i class="pi pi-user"></i>
                                <span>Admin Login</span>
                            </router-link>
                            <router-link to="/login" class="staff-login-btn cashier">
                                <i class="pi pi-shopping-cart"></i>
                                <span>Cashier Login</span>
                            </router-link>
                        </div>
                        <div class="staff-help">
                            <p>Need help? Contact IT Support:</p>
                            <a href="tel:0919-002-4637" class="support-link">
                                <i class="pi pi-phone"></i>
                                0919 002 4637
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
            <div class="bottom-content">
                <div class="copyright">
                    <p>&copy; 2025 Luked Pharma Co. All rights reserved.</p>
                    <div class="legal-links">
                        <a href="#" class="legal-link">Privacy Policy</a>
                        <a href="#" class="legal-link">Terms of Service</a>
                        <a href="#" class="legal-link">Cookie Policy</a>
                    </div>
                </div>
                <div class="certifications">
                    <div class="certification">
                        <i class="pi pi-shield"></i>
                        <span>FDA Approved</span>
                    </div>
                    <div class="certification">
                        <i class="pi pi-check-circle"></i>
                        <span>ISO Certified</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

// State
const email = ref('');
const isSubscribing = ref(false);
const subscribeMessage = ref(null);

// Main locations data
const mainLocations = ref([
  {
    id: 1,
    name: "Main Branch - Sta. Cruz",
    address: "1626 Rizal Avenue, Sta. Cruz Manila",
    phone: "0919 002 4637",
    hours: "8:00 AM - 10:00 PM"
  },
  {
    id: 2,
    name: "Makati Branch",
    address: "Ayala Avenue, Makati City",
    phone: "0918 123 4567",
    hours: "8:00 AM - 9:00 PM"
  },
  {
    id: 3,
    name: "Quezon City Branch",
    address: "Quezon Avenue, Quezon City",
    phone: "0917 987 6543",
    hours: "8:00 AM - 8:00 PM"
  }
]);

// Methods
const subscribeNewsletter = async () => {
  if (!email.value || !isValidEmail(email.value)) {
    subscribeMessage.value = {
      type: 'error',
      text: 'Please enter a valid email address.'
    };
    setTimeout(() => {
      subscribeMessage.value = null;
    }, 3000);
    return;
  }

  isSubscribing.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  subscribeMessage.value = {
    type: 'success',
    text: 'Thank you for subscribing! Check your email for confirmation.'
  };

  isSubscribing.value = false;
  email.value = '';

  setTimeout(() => {
    subscribeMessage.value = null;
  }, 5000);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const callLocation = (phone) => {
  window.open(`tel:${phone}`);
};
</script>

<style scoped>
:root {
    --primary-red: #E74C3C;
    --footer-bg-dark: #1f2a38;
    --footer-text-light: #f5f7f9;
    --footer-text-subtle: #9cb3c9;
    --hover-bg-subtle: rgba(255, 255, 255, 0.05);
}

.main-footer {
    background-color: var(--footer-bg-dark);
    color: var(--footer-text-light);
    padding: 60px 40px 0;
    margin-top: 60px;
    box-shadow: inset 0 8px 10px -8px rgba(0, 0, 0, 0.5);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 30px;
    border-bottom: 1px solid #34495e;
}

/* ---------------------------------------------------------------------- */
/* --- GENERAL SECTION STYLING (4-Column Layout) --- */
/* ---------------------------------------------------------------------- */

.footer-section {
    /* Width for 4 columns */
    width: 23%;
}

.section-title-icon-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
}

.footer-section h3 {
    position: relative;
    padding-bottom: 12px;
    color: var(--footer-text-light);
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 1.3em;
    text-transform: uppercase;
    margin: 0;
}

/* Class for the requested red headings */
.red-text {
    color: var(--primary-red) !important;
}

.footer-section h3::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 3px;
    background-color: var(--primary-red);
    border-radius: 2px;
}

.detail-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 0.95em;
    color: var(--footer-text-light);
    margin-bottom: 8px;
    padding: 3px 0;
    transition: background-color 0.2s;
    border-radius: 4px;
}

.detail-item:hover {
    background-color: var(--hover-bg-subtle);
}

.detail-item i {
    font-size: 1.4em;
    margin-top: 2px;
}

.icon-red {
    color: var(--primary-red);
}

.detail-item p {
    margin: 0;
    line-height: 1.5;
}

/* ---------------------------------------------------------------------- */
/* --- 1. LEFT SECTION (Logo and Social Links ONLY) --- */
/* ---------------------------------------------------------------------- */
.footer-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 20px;
}

.footer-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    margin-bottom: 0px;
}

.footer-logo {
    width: 100px;
    height: 100px;
    margin-right: 15px;
}

.footer-site-name {
    font-weight: 800;
    font-size: 1.8em;
    color: rgb(248, 84, 84);
}

.tagline {
    font-size: 1.0em;
    font-weight: 300;
    margin-top: 5px;
    margin-left: 0;
    color: var(--footer-text-subtle);
    padding-left: 115px;
    /* Offset to align under site name */
}

.social-links {
    margin-top: 15px;
    margin-left: 0;
    padding-left: 115px;
    margin-bottom: 0;
    /* Adjusted: No button, so no extra bottom margin needed */
}

/* REMOVED .admin-login-link-btn STYLES */

/* ---------------------------------------------------------------------- */
/* --- 2. LOCATION SECTION --- */
/* ---------------------------------------------------------------------- */

.footer-center {
    padding-right: 20px;
}

.location-text-emphasis {
    color: var(--primary-red);
    font-weight: 600;
    margin: 0;
    line-height: 1.5;
}

.nearby-text {
    display: block;
    font-size: 0.8em;
    font-style: italic;
    color: var(--footer-text-subtle);
    margin-top: 2px;
}

/* ---------------------------------------------------------------------- */
/* --- 3. OPERATING HOURS SECTION --- */
/* ---------------------------------------------------------------------- */
.footer-hours {
    padding-right: 20px;
}

.hours-list {
    font-size: 0.9em;
}

.hour-item {
    display: flex;
    justify-content: space-between;
    padding: 2px 0;
    color: var(--footer-text-light);
}

.hour-item .day {
    font-weight: 400;
}

.hour-item .time {
    font-weight: 600;
    color: var(--footer-text-subtle);
}

.hour-item.closed .time {
    color: var(--primary-red);
    font-weight: 700;
}

/* ---------------------------------------------------------------------- */
/* --- COPYRIGHT BAR (Simplified Bottom) --- */
/* ---------------------------------------------------------------------- */
.copyright-bar {
    text-align: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 15px 0 15px;
    font-size: 0.8em;
    color: var(--footer-text-subtle);
    border-top: 1px solid #34495e;
}

/* ---------------------------------------------------------------------- */
/* --- RESPONSIVE ADJUSTMENTS (Mobile Layout) --- */
/* ---------------------------------------------------------------------- */
@media (max-width: 900px) {

    .main-footer {
        padding: 40px 20px 0;
    }

    .footer-content {
        flex-direction: column;
        gap: 30px;
        align-items: flex-start;
        padding-bottom: 40px;
    }

    .footer-section {
        width: 100%;
        padding-right: 0;
    }

    /* Left Section Centering */
    .footer-left {
        align-items: center;
    }

    .tagline,
    .social-links {
        margin-left: 0;
        text-align: center;
        padding-left: 0;
        /* Remove offsets on mobile */
    }

    /* REMOVED .admin-login-link-btn mobile styles */

    .footer-logo-link {
        margin-bottom: 15px;
        justify-content: center;
    }

    /* Title Centering for all Sections */
    .section-title-icon-wrapper {
        align-items: center;
        width: 100%;
    }

    .footer-section h3 {
        text-align: center;
    }

    .footer-section h3::after {
        left: 50%;
        transform: translateX(-50%);
    }

    /* Detail Item Centering (Address/Hours/Contacts) */
    .detail-item,
    .hours-list {
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .detail-item {
        justify-content: flex-start;
    }

    .copyright-bar {
        border-top: none;
    }
}
</style>