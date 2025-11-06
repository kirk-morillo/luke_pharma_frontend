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
/* Variables */
:root {
    --primary-red: #FF6347;
    --secondary-blue: #34495e;
    --success-green: #2ecc71;
    --footer-bg-dark: #1f2a38;
    --footer-bg-light: #2c3e50;
    --footer-text-light: #f5f7f9;
    --footer-text-subtle: #9cb3c9;
    --newsletter-bg: linear-gradient(135deg, var(--primary-red), var(--secondary-blue));
    --hover-bg-subtle: rgba(255, 255, 255, 0.05);
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.enhanced-footer {
    margin-top: 80px;
    position: relative;
}

/* Newsletter Section */
.newsletter-section {
    background: var(--newsletter-bg);
    color: var(--white);
    padding: 40px 0;
    position: relative;
    overflow: hidden;
}

.newsletter-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="20" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="20" cy="80" r="1" fill="rgba(255,255,255,0.05)"/></svg>');
    background-size: 100px 100px;
    animation: float 20s infinite linear;
}

@keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-50px, -50px); }
}

.newsletter-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    position: relative;
    z-index: 1;
}

.newsletter-info h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.newsletter-info h3 i {
    font-size: 1.8rem;
}

.newsletter-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    line-height: 1.5;
    max-width: 400px;
}

.newsletter-form {
    flex-shrink: 0;
    max-width: 500px;
    width: 100%;
}

.form-group {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.newsletter-input {
    flex: 1;
    padding: 16px 20px;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    background: rgba(255, 255, 255, 0.95);
    color: var(--text-dark);
    box-shadow: var(--shadow-md);
}

.newsletter-input:focus {
    outline: none;
    box-shadow: var(--shadow-lg);
}

.newsletter-input::placeholder {
    color: var(--text-light);
}

.newsletter-btn {
    padding: 16px 28px;
    background: var(--white);
    color: var(--primary-red);
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    white-space: nowrap;
}

.newsletter-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.newsletter-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.subscribe-message {
    margin-top: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
}

.subscribe-message.success {
    background: rgba(46, 204, 113, 0.2);
    color: var(--white);
    border: 1px solid rgba(46, 204, 113, 0.3);
}

.subscribe-message.error {
    background: rgba(231, 76, 60, 0.2);
    color: var(--white);
    border: 1px solid rgba(231, 76, 60, 0.3);
}

/* Main Footer */
.footer-main {
    background: var(--footer-bg-dark);
    color: var(--footer-text-light);
    padding: 60px 0 0;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr;
    gap: 40px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Company Section */
.footer-company {
    max-width: 400px;
}

.footer-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--white);
    margin-bottom: 20px;
}

.footer-logo {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    object-fit: contain;
}

.footer-site-name {
    font-weight: 800;
    font-size: 1.8rem;
    color: var(--primary-red);
}

.tagline {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--footer-text-subtle);
    margin-bottom: 30px;
}

.social-links {
    margin-bottom: 30px;
}

.social-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--white);
}

.social-icons {
    display: flex;
    gap: 12px;
}

.social-link {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.1rem;
}

.social-link:hover {
    background: var(--primary-red);
    transform: translateY(-3px);
}

.app-download {
    margin-top: 30px;
}

.app-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--white);
}

.app-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.app-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: var(--white);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.app-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.app-btn i {
    font-size: 1.2rem;
}

.app-btn-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.app-small {
    font-size: 0.7rem;
    opacity: 0.8;
}

.app-large {
    font-size: 0.9rem;
    font-weight: 600;
}

/* Links Section */
.section-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--primary-red);
    position: relative;
    padding-bottom: 10px;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-red);
    border-radius: 2px;
}

.links-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.link-column-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 15px;
}

.link-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link-list li {
    margin-bottom: 10px;
}

.footer-link {
    color: var(--footer-text-subtle);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
}

.footer-link:hover {
    color: var(--primary-red);
    transform: translateX(4px);
}

/* Locations Section */
.locations-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.location-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.location-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.location-info {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex: 1;
}

.location-icon {
    color: var(--primary-red);
    font-size: 1.1rem;
    margin-top: 2px;
}

.location-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 4px;
}

.location-address {
    font-size: 0.85rem;
    color: var(--footer-text-subtle);
    margin-bottom: 4px;
    line-height: 1.4;
}

.location-hours {
    font-size: 0.8rem;
    color: var(--footer-text-subtle);
}

.location-call {
    width: 36px;
    height: 36px;
    background: var(--primary-red);
    border: none;
    border-radius: 50%;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-left: 10px;
}

.location-call:hover {
    background: #e8533b;
    transform: scale(1.1);
}

/* Staff Portal Section */
.staff-portal {
    background: rgba(255, 99, 71, 0.1);
    border: 1px solid rgba(255, 99, 71, 0.3);
    border-radius: 12px;
    padding: 20px;
}

.staff-info {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
}

.staff-icon {
    color: var(--primary-red);
    font-size: 1.2rem;
    margin-top: 2px;
}

.staff-description {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--footer-text-subtle);
}

.staff-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.staff-login-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: var(--primary-red);
    color: var(--white);
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    justify-content: center;
}

.staff-login-btn:hover {
    background: #e8533b;
    transform: translateY(-2px);
}

.staff-login-btn.cashier {
    background: var(--success-green);
}

.staff-login-btn.cashier:hover {
    background: #27ae60;
}

.staff-help {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.staff-help p {
    font-size: 0.85rem;
    color: var(--footer-text-subtle);
    margin-bottom: 8px;
}

.support-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--primary-red);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.support-link:hover {
    color: #e8533b;
}

/* Footer Bottom */
.footer-bottom {
    background: var(--footer-bg-light);
    padding: 25px 0;
}

.bottom-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.copyright {
    display: flex;
    align-items: center;
    gap: 30px;
}

.copyright p {
    font-size: 0.9rem;
    color: var(--footer-text-subtle);
    margin: 0;
}

.legal-links {
    display: flex;
    gap: 20px;
}

.legal-link {
    color: var(--footer-text-subtle);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.3s ease;
}

.legal-link:hover {
    color: var(--primary-red);
}

.certifications {
    display: flex;
    gap: 20px;
}

.certification {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--footer-text-subtle);
}

.certification i {
    color: var(--success-green);
}

/* Responsive Design */
@media (max-width: 1200px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }

    .newsletter-content {
        flex-direction: column;
        text-align: center;
    }

    .newsletter-info h3 {
        justify-content: center;
    }

    .newsletter-form {
        max-width: 100%;
    }
}

@media (max-width: 768px) {
    .newsletter-section {
        padding: 30px 0;
    }

    .newsletter-content,
    .footer-content,
    .bottom-content {
        padding: 0 20px;
    }

    .newsletter-info h3 {
        font-size: 1.5rem;
    }

    .form-group {
        flex-direction: column;
        gap: 15px;
    }

    .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 0 20px 40px;
    }

    .footer-company {
        max-width: 100%;
        text-align: center;
    }

    .footer-logo-link {
        justify-content: center;
        margin-bottom: 15px;
    }

    .tagline {
        text-align: center;
    }

    .social-icons {
        justify-content: center;
    }

    .links-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .bottom-content {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }

    .copyright {
        flex-direction: column;
        gap: 15px;
    }

    .legal-links {
        justify-content: center;
    }

    .certifications {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .newsletter-info h3 {
        font-size: 1.3rem;
    }

    .newsletter-subtitle {
        font-size: 1rem;
    }

    .app-buttons {
        align-items: center;
    }

    .app-btn {
        width: 100%;
        max-width: 200px;
    }

    .location-item {
        flex-direction: column;
        gap: 15px;
    }

    .location-call {
        margin-left: 0;
        align-self: flex-start;
    }

    .staff-buttons {
        gap: 8px;
    }

    .legal-links {
        flex-direction: column;
        gap: 10px;
    }

    .certifications {
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
}
</style>