<template>
    <footer class="main-footer">
        <div class="footer-content">

            <div class="footer-section footer-left">
                <router-link to="/" class="footer-logo-link">
                    <img src="/logo.png" alt="Company Logo" class="footer-logo" />
                    <span class="footer-site-name">Luked Pharma Co.</span>
                </router-link>
                <p class="tagline">Your trusted health partner.</p>
                <div class="social-links">
                    <a href="https://www.facebook.com/profile.php?id=100083107822016" target="_blank"
                        rel="noopener noreferrer">
                        <i class="pi pi-facebook social-icon"></i>
                    </a>
                </div>
            </div>

            <div class="footer-section footer-center">
                <div class="section-title-icon-wrapper">
                    <h3 class="red-text">Location</h3>
                </div>
                <div class="detail-item detail-location">
                    <i class="pi pi-map-marker icon-red"></i>
                    <div class="detail-text">
                        <p class="location-text-emphasis">1626 Rizal Avenue Sta.Cruz Manila</p>
                        <span class="nearby-text">Near Jose Reyes Hospital</span>
                    </div>
                </div>
            </div>

            <div class="footer-section footer-hours">
                <div class="section-title-icon-wrapper">
                    <h3 class="red-text">Hours</h3>
                </div>
                <div class="hours-list">
                    <div class="hour-item">
                        <span class="day">Sunday - Friday</span>
                        <span class="time">8:00 AM - 5:00 PM</span>
                    </div>
                    <div class="hour-item closed">
                        <span class="day">Saturday</span>
                        <span class="time">CLOSED</span>
                    </div>
                </div>
            </div>

            <div class="footer-section footer-right">
                <div class="section-title-icon-wrapper">
                    <h3 class="red-text">Contacts</h3>
                </div>
                <div class="contact-details">
                    <div class="detail-item">
                        <i class="pi pi-phone icon-red"></i>
                        <p>0919 002 4637</p>
                    </div>
                    <div class="detail-item">
                        <i class="pi pi-envelope icon-red"></i>
                        <p>lukedpharma@gmail.com</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="copyright-bar">
            <p>&copy; 2025 Luked Pharma Co. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
// No script logic needed for this footer
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