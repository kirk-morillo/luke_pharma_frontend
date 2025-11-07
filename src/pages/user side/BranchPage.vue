<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Our Branches</h1>
        <p class="text-lg text-gray-600">Visit us at any of our convenient locations</p>
        <div class="w-32 h-1 bg-red-500 mx-auto mt-6"></div>
      </div>

      <!-- Branches Grid -->
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="branch in mockBranches"
            :key="branch.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-red-500 group"
          >
            <!-- Image Placeholder -->
            <div class="h-48 bg-gray-200 rounded-t-lg flex flex-col items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors duration-200">
              <i class="pi pi-map-marker text-5xl mb-3"></i>
              <span class="text-sm font-medium">Branch Image</span>
              <span class="text-xs">Placeholder</span>
            </div>

            <!-- Branch Information -->
            <div class="p-6">
              <!-- Branch Name -->
              <h3 class="text-2xl font-bold mb-4" style="color: #E74C3C;">
                {{ branch.name }}
              </h3>

              <!-- Address -->
              <div class="flex items-start mb-3">
                <i class="pi pi-map-marker text-red-500 mt-1 mr-3 text-lg flex-shrink-0"></i>
                <div>
                  <p class="text-gray-800 font-medium">Address</p>
                  <p class="text-gray-600">{{ branch.address }}</p>
                </div>
              </div>

              <!-- Service Hours -->
              <div class="flex items-start mb-3">
                <i class="pi pi-clock text-red-500 mt-1 mr-3 text-lg flex-shrink-0"></i>
                <div>
                  <p class="text-gray-800 font-medium">Service Hours</p>
                  <p class="text-gray-600">{{ branch.serviceHours }}</p>
                </div>
              </div>

              <!-- Contact Number -->
              <div class="flex items-start mb-3">
                <i class="pi pi-phone text-red-500 mt-1 mr-3 text-lg flex-shrink-0"></i>
                <div>
                  <p class="text-gray-800 font-medium">Contact</p>
                  <p class="text-gray-600">{{ branch.contact }}</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start mb-6">
                <i class="pi pi-envelope text-red-500 mt-1 mr-3 text-lg flex-shrink-0"></i>
                <div>
                  <p class="text-gray-800 font-medium">Email</p>
                  <p class="text-gray-600">{{ branch.email }}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button
                  @click="handleGetDirections(branch)"
                  class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <i class="pi pi-directions mr-2"></i>
                  Get Directions
                </button>
                <button
                  @click="handleCallBranch(branch.contact)"
                  class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                >
                  <i class="pi pi-phone mr-2"></i>
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div class="max-w-4xl mx-auto mt-16">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Why Choose Luke Pharma?</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-shield text-2xl text-red-500"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Quality Assurance</h3>
              <p class="text-gray-600">All our medicines and equipment are FDA-approved and sourced from reputable manufacturers.</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-users text-2xl text-red-500"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Expert Staff</h3>
              <p class="text-gray-600">Our trained pharmacists are ready to provide professional advice and personalized service.</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-clock text-2xl text-red-500"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Extended Hours</h3>
              <p class="text-gray-600">Convenient service hours including weekends to serve you better when you need us most.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information Banner -->
      <div class="max-w-4xl mx-auto mt-12">
        <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white text-center">
          <h2 class="text-3xl font-bold mb-4">Need Help?</h2>
          <p class="text-lg mb-6">Our customer service team is available to assist you with any questions</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="handleContactUs"
              class="bg-white text-red-500 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <i class="pi pi-envelope mr-2"></i>
              Contact Us
            </button>
            <button
              @click="handleCallHotline"
              class="bg-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-200"
            >
              <i class="pi pi-phone mr-2"></i>
              Call Hotline
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mockBranches } from '@/data/mockData.js'
import Swal from 'sweetalert2'

// Methods
const handleGetDirections = (branch) => {
  // Open Google Maps with branch coordinates
  const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`
  window.open(url, '_blank')
}

const handleCallBranch = (contact) => {
  // Remove non-digit characters for tel: protocol
  const phoneNumber = contact.replace(/\D/g, '')
  window.location.href = `tel:+${phoneNumber}`
}

const handleContactUs = async () => {
  await Swal.fire({
    title: 'Contact Us',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h4 class="font-semibold text-gray-800 mb-2">Customer Service Hotline</h4>
          <p class="text-gray-600">+63 2 8888 9999</p>
          <p class="text-sm text-gray-500">Mon-Sat: 8AM-8PM, Sun: 9AM-6PM</p>
        </div>
        <div class="mb-4">
          <h4 class="font-semibold text-gray-800 mb-2">Email Support</h4>
          <p class="text-gray-600">support@lukepharma.com</p>
          <p class="text-sm text-gray-500">We respond within 24 hours</p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-800 mb-2">Corporate Office</h4>
          <p class="text-gray-600">789 Corporate Center, Makati City</p>
          <p class="text-sm text-gray-500">Mon-Fri: 9AM-6PM</p>
        </div>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#E74C3C',
    confirmButtonText: 'Got it'
  })
}

const handleCallHotline = () => {
  window.location.href = 'tel:+63288889999'
}

// Initialize
onMounted(() => {
  // Scroll to top on mount
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* Custom styles for branch cards */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

.group:hover .group-hover\:bg-gray-100 {
  background-color: #f3f4f6;
}

/* Button active states */
button:active {
  transform: scale(0.98);
}

/* Icon styling */
.pi {
  font-size: 1rem;
}

.pi-map-marker,
.pi-clock,
.pi-phone,
.pi-envelope {
  font-size: 1.25rem;
}

/* Gradient background */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #E74C3C, #C0392B);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .grid-cols-1.md\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

/* Card hover effects */
.bg-white:hover {
  transform: translateY(-2px);
}

/* Feature icon circles */
.w-16.h-16 {
  width: 4rem;
  height: 4rem;
}

/* Button transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>