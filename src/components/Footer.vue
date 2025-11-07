<template>
    <footer class="main-footer">
        <div class="footer-content">

            <div class="footer-section footer-left">
                <router-link to="/" class="footer-logo-link">
                    <img src="/logo.png" alt="Company Logo" class="footer-logo" />
                    <span class="footer-site-name">Luked Pharma Co.</span>
                </router-link>
                <p class="tagline">Your trusted health partner.</p>

                <div class="footer-actions">
                    <router-link to="/login" class="admin-login-link-btn">
                        <i class="pi pi-lock"></i> Admin Login
                    </router-link>

                    <div class="social-links">
                        <a href="https://www.facebook.com/profile.php?id=100083107822016" target="_blank"
                            rel="noopener noreferrer" class="social-icon-wrapper">
                            <i class="pi pi-facebook social-icon"></i>
                        </a>
                    </div>
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
// No script logic needed
</script>

<style scoped>
/* Importing Poppins for nav links (as discussed previously) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

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
    font-family: 'Poppins', sans-serif;
    /* Applied Poppins to details */
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
/* --- 1. LEFT SECTION (Logo, Tagline, Button, Social) --- */
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
    font-family: 'Poppins', sans-serif;
    /* Added Poppins */
}

.tagline {
    font-size: 1.0em;
    font-weight: 300;
    margin-top: 5px;
    margin-left: 0;
    color: var(--footer-text-subtle);
    padding-left: 115px;
}

.footer-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
    margin-left: 115px;
}

.admin-login-link-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--footer-text-light);
    text-decoration: none;
    font-weight: 300;
    width: 150px;
    padding: 5px 5px;
    border-radius: 5px;

    margin: 0;

    transition: background-color 0.3s, transform 0.1s;
    border: 1px solid var(--primary-red);
    font-family: 'Poppins', sans-serif;
    /* Added Poppins */
}

.admin-login-link-btn:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
}

.admin-login-link-btn .pi {
    margin-right: 8px;
    font-size: 1.1em;
}

/* --- Social Links Styling --- */
.social-links {
    margin: 0;
    padding-left: 0;
}

.social-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: var(--footer-text-light);
    font-size: 1.2em;
    transition: background-color 0.3s, color 0.3s;
}

.social-icon-wrapper:hover {
    background-color: var(--primary-red);
    color: white;
}


/* ---------------------------------------------------------------------- */
/* --- 2, 3, 4. CENTER, HOURS, CONTACTS (Keep Existing Styles) --- */
/* ---------------------------------------------------------------------- */
.location-text-emphasis {
    font-family: 'Poppins', sans-serif;
}

.nearby-text {
    font-family: 'Poppins', sans-serif;
}

.hour-item .day,
.hour-item .time {
    font-family: 'Poppins', sans-serif;
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

    .tagline {
        margin-left: 0;
        text-align: center;
        padding-left: 0;
    }

    /* NEW: Reset footer-actions on mobile to stack elements */
    .footer-actions {
        display: flex;
        flex-direction: column;
        /* Stack vertically on small screens */
        gap: 15px;
        margin: 15px auto 0;
        /* Center the group and add top margin */
    }

    .admin-login-link-btn {
        width: 100%;
        /* Make button full width on small screens */
        max-width: 250px;
        margin: 0 auto;
        /* Ensure it's centered within footer-actions */
    }

    .social-links {
        margin: 0;
        /* Re-clear margin */
        padding: 0;
    }

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