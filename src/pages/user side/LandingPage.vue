<template>
    <div class="enhanced-landing-page">
        <Header />

        <main class="main-content">
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">
                            Your Trusted Health Partner
                        </h1>
                        <p class="hero-subtitle">
                            Quality medicines and healthcare products delivered with care.
                            Serving our community with compassion and excellence since 2020.
                        </p>
                        <div class="hero-actions">
                            <a href="#items" class="cta-btn primary">
                                <i class="pi pi-search"></i>
                                Browse Products
                            </a>
                            <a href="#stores" class="cta-btn secondary">
                                <i class="pi pi-map-marker"></i>
                                Find Store
                            </a>
                        </div>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <div class="stat-number">5+</div>
                                <div class="stat-label">Store Locations</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">1000+</div>
                                <div class="stat-label">Products Available</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">24/7</div>
                                <div class="stat-label">Emergency Service</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">50K+</div>
                                <div class="stat-label">Happy Customers</div>
                            </div>
                        </div>
                    </div>
                    <div class="hero-image">
                        <div class="hero-image-placeholder">
                            <i class="pi pi-heart"></i>
                            <span>Healthcare Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Items Section -->
            <ItemsSection />

            <!-- Stores Section -->
            <StoresSection />

            <!-- Features Section -->
            <section class="features-section">
                <div class="features-content">
                    <div class="section-header">
                        <h2 class="section-title">
                            <i class="pi pi-star"></i>
                            Why Choose Luked Pharma?
                        </h2>
                        <p class="section-subtitle">We're committed to your health and wellbeing</p>
                    </div>

                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-shield"></i>
                            </div>
                            <h3 class="feature-title">FDA Approved</h3>
                            <p class="feature-description">All our medications are FDA approved and sourced from reputable manufacturers</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-truck"></i>
                            </div>
                            <h3 class="feature-title">Free Delivery</h3>
                            <p class="feature-description">Free delivery on orders above ₱500 within our service areas</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-clock"></i>
                            </div>
                            <h3 class="feature-title">24/7 Service</h3>
                            <p class="feature-description">Round-the-clock pharmacy service at our main branch for emergencies</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-users"></i>
                            </div>
                            <h3 class="feature-title">Expert Staff</h3>
                            <p class="feature-description">Licensed pharmacists ready to provide professional advice and consultation</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-mobile"></i>
                            </div>
                            <h3 class="feature-title">Mobile App</h3>
                            <p class="feature-description">Order medications and track your health with our mobile application</p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="pi pi-gift"></i>
                            </div>
                            <h3 class="feature-title">Loyalty Program</h3>
                            <p class="feature-description">Earn rewards and discounts with every purchase through our loyalty program</p>
                        </div>
                    </div>

                    <!-- Testimonial Section -->
                    <div class="testimonial-section">
                        <h3 class="testimonial-title">What Our Customers Say</h3>
                        <div class="testimonials-grid">
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <i class="pi pi-quote-left quote-icon"></i>
                                    <p>"Excellent service and very knowledgeable staff. They always have what I need in stock."</p>
                                </div>
                                <div class="testimonial-author">
                                    <div class="author-avatar">
                                        <i class="pi pi-user"></i>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Maria Santos</div>
                                        <div class="author-role">Regular Customer</div>
                                    </div>
                                </div>
                            </div>

                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <i class="pi pi-quote-left quote-icon"></i>
                                    <p>"The 24/7 service saved me during an emergency. Thank you for being there when we needed you most."</p>
                                </div>
                                <div class="testimonial-author">
                                    <div class="author-avatar">
                                        <i class="pi pi-user"></i>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Juan Reyes</div>
                                        <div class="author-role">Emergency Customer</div>
                                    </div>
                                </div>
                            </div>

                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <i class="pi pi-quote-left quote-icon"></i>
                                    <p>"Fast delivery and competitive prices. I've been a loyal customer for over 3 years now."</p>
                                </div>
                                <div class="testimonial-author">
                                    <div class="author-avatar">
                                        <i class="pi pi-user"></i>
                                    </div>
                                    <div class="author-info">
                                        <div class="author-name">Catherine Lee</div>
                                        <div class="author-role">Senior Citizen</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="cta-section">
                <div class="cta-content">
                    <h2 class="cta-title">Ready to Experience Quality Healthcare?</h2>
                    <p class="cta-subtitle">Join thousands of satisfied customers who trust us with their health needs</p>
                    <div class="cta-actions">
                        <a href="#items" class="cta-btn large primary">
                            <i class="pi pi-shopping-cart"></i>
                            Shop Now
                        </a>
                        <a href="tel:0919-002-4637" class="cta-btn large secondary">
                            <i class="pi pi-phone"></i>
                            Call Us
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import ItemsSection from '../../components/ItemsSection.vue';
import StoresSection from '../../components/StoresSection.vue';
import Footer from '../../components/Footer.vue';
</script>

<style scoped>
/* Variables */
:root {
    --primary-red: #FF6347;
    --secondary-blue: #34495e;
    --success-green: #2ecc71;
    --light-bg: #f8f9fa;
    --white: #ffffff;
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --gradient-primary: linear-gradient(135deg, var(--primary-red), var(--secondary-blue));
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.enhanced-landing-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1;
}

/* Hero Section */
.hero-section {
    background: var(--gradient-primary);
    color: var(--white);
    padding: 100px 0 80px;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
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

.hero-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 60px;
    position: relative;
    z-index: 1;
}

.hero-text {
    flex: 1;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 40px;
    opacity: 0.9;
    max-width: 600px;
}

.hero-actions {
    display: flex;
    gap: 20px;
    margin-bottom: 50px;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
}

.cta-btn.primary {
    background: var(--white);
    color: var(--primary-red);
}

.cta-btn.primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.cta-btn.secondary {
    background: transparent;
    color: var(--white);
    border: 2px solid var(--white);
}

.cta-btn.secondary:hover {
    background: var(--white);
    color: var(--primary-red);
    transform: translateY(-3px);
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-image-placeholder {
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.hero-image-placeholder i {
    font-size: 4rem;
    margin-bottom: 15px;
}

.hero-image-placeholder span {
    font-size: 1.1rem;
    font-weight: 600;
}

/* Features Section */
.features-section {
    background: var(--light-bg);
    padding: 100px 0 80px;
}

.features-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.section-title i {
    color: var(--primary-red);
    font-size: 2rem;
}

.section-subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 80px;
}

.feature-card {
    background: var(--white);
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: all 0.3s ease;
    border-top: 4px solid var(--primary-red);
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 2rem;
    margin: 0 auto 25px;
}

.feature-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 15px;
}

.feature-description {
    font-size: 1rem;
    color: var(--text-light);
    line-height: 1.6;
}

/* Testimonial Section */
.testimonial-section {
    margin-top: 80px;
}

.testimonial-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-dark);
    text-align: center;
    margin-bottom: 50px;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.testimonial-card {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    position: relative;
}

.testimonial-content {
    margin-bottom: 25px;
    position: relative;
    padding-left: 30px;
}

.quote-icon {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--primary-red);
    font-size: 1.5rem;
    opacity: 0.3;
}

.testimonial-content p {
    font-size: 1rem;
    color: var(--text-dark);
    line-height: 1.6;
    font-style: italic;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 15px;
}

.author-avatar {
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.2rem;
}

.author-name {
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 2px;
}

.author-role {
    font-size: 0.9rem;
    color: var(--text-light);
}

/* CTA Section */
.cta-section {
    background: var(--gradient-primary);
    color: var(--white);
    padding: 80px 0;
    text-align: center;
    position: relative;
}

.cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 40px;
}

.cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cta-subtitle {
    font-size: 1.2rem;
    margin-bottom: 40px;
    opacity: 0.9;
}

.cta-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.cta-btn.large {
    padding: 20px 40px;
    font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero-content {
        padding: 0 20px;
        gap: 40px;
    }

    .hero-title {
        font-size: 2.8rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .hero-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero-image-placeholder {
        width: 300px;
        height: 300px;
    }

    .features-content,
    .cta-content {
        padding: 0 20px;
    }

    .features-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

@media (max-width: 768px) {
    .hero-section {
        padding: 80px 0 60px;
    }

    .hero-content {
        flex-direction: column;
        text-align: center;
        gap: 30px;
    }

    .hero-title {
        font-size: 2.2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
        margin: 0 auto 30px;
    }

    .hero-actions {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .hero-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .stat-number {
        font-size: 2rem;
    }

    .hero-image-placeholder {
        width: 250px;
        height: 250px;
    }

    .features-section {
        padding: 60px 0 40px;
    }

    .section-title {
        font-size: 2rem;
    }

    .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .feature-card {
        padding: 30px 20px;
    }

    .testimonials-grid {
        grid-template-columns: 1fr;
    }

    .cta-section {
        padding: 60px 0;
    }

    .cta-title {
        font-size: 2rem;
    }

    .cta-actions {
        flex-direction: column;
        align-items: center;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.8rem;
    }

    .hero-subtitle {
        font-size: 0.95rem;
    }

    .hero-stats {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .stat-number {
        font-size: 1.8rem;
    }

    .hero-image-placeholder {
        width: 200px;
        height: 200px;
    }

    .hero-image-placeholder i {
        font-size: 3rem;
    }

    .cta-btn {
        padding: 14px 28px;
        font-size: 1rem;
    }

    .cta-btn.large {
        padding: 16px 32px;
        font-size: 1.1rem;
    }
}
</style>