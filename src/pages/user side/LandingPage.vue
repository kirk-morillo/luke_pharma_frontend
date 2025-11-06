<template>
    <div class="landing-page-wrapper">
        <Header />

        <main class="main-content">
            <MedicineSection />

        </main>

        <Footer />
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import MedicineSection from '../../components/MedecineSection.vue'; 
import Footer from '../../components/Footer.vue';

// No specific logic needed here, just composition
</script>

<style scoped>
.landing-page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    /* Ensures the main content takes up remaining vertical space */
    flex-grow: 1;
}
</style>