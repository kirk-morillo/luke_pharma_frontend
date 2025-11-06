<template>
  <section id="stores" class="stores-section">
    <div class="section-header">
      <div class="section-content">
        <h2 class="section-title">
          <i class="pi pi-map-marker"></i>
          Our Store Locations
        </h2>
        <p class="section-subtitle">Find us at 5 convenient locations across Metro Manila</p>
      </div>
    </div>

    <div class="stores-container">
      <div class="stores-content">
        <div class="stores-grid">
          <div
            v-for="(store, index) in stores"
            :key="store.id"
            class="store-card"
            :class="{ 'featured': store.featured }"
          >
            <div class="store-header">
              <div class="store-image">
                <img :src="store.image" :alt="store.name" />
                <div class="store-badge" v-if="store.featured">
                  <i class="pi pi-star"></i>
                  Featured
                </div>
              </div>
              <div class="store-info">
                <h3 class="store-name">{{ store.name }}</h3>
                <div class="store-type">{{ store.type }}</div>
              </div>
            </div>

            <div class="store-details">
              <div class="store-address">
                <i class="pi pi-map-marker"></i>
                <span>{{ store.address }}</span>
              </div>

              <div class="store-contact">
                <div class="contact-item">
                  <i class="pi pi-phone"></i>
                  <span>{{ store.phone }}</span>
                </div>
                <div class="contact-item">
                  <i class="pi pi-envelope"></i>
                  <span>{{ store.email }}</span>
                </div>
              </div>

              <div class="store-hours">
                <div class="hours-header">
                  <i class="pi pi-clock"></i>
                  <span>Operating Hours</span>
                </div>
                <div class="hours-list">
                  <div
                    v-for="hours in store.operatingHours"
                    :key="hours.days"
                    class="hours-item"
                    :class="{ 'closed': hours.closed }"
                  >
                    <span class="days">{{ hours.days }}</span>
                    <span class="time">{{ hours.closed ? 'CLOSED' : hours.time }}</span>
                  </div>
                </div>
              </div>

              <div class="store-features">
                <div class="features-header">
                  <i class="pi pi-check-circle"></i>
                  <span>Features & Services</span>
                </div>
                <div class="features-list">
                  <div
                    v-for="feature in store.features"
                    :key="feature"
                    class="feature-item"
                  >
                    <i class="pi pi-check"></i>
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </div>

              <div class="store-actions">
                <button @click="getDirections(store)" class="directions-btn">
                  <i class="pi pi-directions"></i>
                  Get Directions
                </button>
                <button @click="callStore(store.phone)" class="call-btn">
                  <i class="pi pi-phone"></i>
                  Call Store
                </button>
              </div>

              <div class="store-status">
                <div class="status-indicator" :class="{ 'open': store.isOpen }">
                  <div class="status-dot"></div>
                  <span>{{ store.isOpen ? 'Open Now' : 'Closed' }}</span>
                </div>
                <div class="next-open" v-if="!store.isOpen">
                  Opens at {{ store.nextOpenTime }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="map-section">
          <div class="map-container">
            <div class="map-placeholder">
              <i class="pi pi-map"></i>
              <h3>Interactive Map</h3>
              <p>Click on any store location to get detailed directions</p>
              <div class="map-legend">
                <div class="legend-item">
                  <div class="legend-dot main"></div>
                  <span>Main Branch</span>
                </div>
                <div class="legend-item">
                  <div class="legend-dot regular"></div>
                  <span>Regular Branch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Info Section -->
        <div class="quick-info-section">
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">
                <i class="pi pi-truck"></i>
              </div>
              <div class="info-content">
                <h4>Free Delivery</h4>
                <p>On orders above ₱500 within 5km radius</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <i class="pi pi-clock"></i>
              </div>
              <div class="info-content">
                <h4>24/7 Pharmacy</h4>
                <p>Location 1 offers round-the-clock service</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <i class="pi pi-headphones"></i>
              </div>
              <div class="info-content">
                <h4>Customer Service</h4>
                <p>Hotline: 0919 002 4637</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <i class="pi pi-mobile"></i>
              </div>
              <div class="info-content">
                <h4>Mobile App</h4>
                <p>Order anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State
const stores = ref([]);
const currentTime = ref(new Date());

// Store data
const storeData = [
  {
    id: 1,
    name: "Luked Pharma - Main Branch",
    type: "Main Branch & 24/7 Pharmacy",
    address: "1626 Rizal Avenue, Sta. Cruz, Manila",
    phone: "0919 002 4637",
    email: "main@lukedpharma.com",
    image: "/api/placeholder/400/300",
    featured: true,
    operatingHours: [
      { days: "Monday - Friday", time: "8:00 AM - 10:00 PM" },
      { days: "Saturday", time: "8:00 AM - 8:00 PM" },
      { days: "Sunday", time: "9:00 AM - 6:00 PM" },
      { days: "24/7 Service", time: "Available for emergencies" }
    ],
    features: [
      "24/7 Emergency Service",
      "Prescription Compounding",
      "Free Blood Pressure Monitoring",
      "Free Diabetes Screening",
      "Senior Citizen Discount",
      "Wheelchair Accessible",
      "Parking Available",
      "ATM Machine"
    ]
  },
  {
    id: 2,
    name: "Luked Pharma - Makati Branch",
    type: "Premium Branch",
    address: "Ayala Avenue, Makati City",
    phone: "0918 123 4567",
    email: "makati@lukedpharma.com",
    image: "/api/placeholder/400/300",
    featured: false,
    operatingHours: [
      { days: "Monday - Saturday", time: "8:00 AM - 9:00 PM" },
      { days: "Sunday", time: "9:00 AM - 7:00 PM" }
    ],
    features: [
      "Premium Medication Counseling",
      "Health Check-up Services",
      "Free Delivery",
      "Corporate Accounts",
      "Parking Available",
      "Wheelchair Accessible"
    ]
  },
  {
    id: 3,
    name: "Luked Pharma - Quezon City Branch",
    type: "Community Branch",
    address: "Quezon Avenue, Quezon City",
    phone: "0917 987 6543",
    email: "quezon@lukedpharma.com",
    image: "/api/placeholder/400/300",
    featured: false,
    operatingHours: [
      { days: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
      { days: "Saturday", time: "9:00 AM - 6:00 PM" },
      { days: "Sunday", time: "10:00 AM - 5:00 PM" }
    ],
    features: [
      "Family Medicine Focus",
      "Pediatric Medications",
      "Free Vitamin Consultation",
      "Senior Citizen Discount",
      "Parking Available"
    ]
  },
  {
    id: 4,
    name: "Luked Pharma - Pasay Branch",
    type: "Airport Branch",
    address: "EDSA Extension, Pasay City",
    phone: "0916 456 7890",
    email: "pasay@lukedpharma.com",
    image: "/api/placeholder/400/300",
    featured: false,
    operatingHours: [
      { days: "Monday - Saturday", time: "7:00 AM - 10:00 PM" },
      { days: "Sunday", time: "8:00 AM - 8:00 PM" }
    ],
    features: [
      "Travel Medications",
      "Vaccination Services",
      "Medical Certificate Processing",
      "Airport Shuttle Service",
      "24/7 Service"
    ]
  },
  {
    id: 5,
    name: "Luked Pharma - Caloocan Branch",
    type: "North Metro Branch",
    address: "Monumento, Caloocan City",
    phone: "0915 234 5678",
    email: "caloocan@lukedpharma.com",
    image: "/api/placeholder/400/300",
    featured: false,
    operatingHours: [
      { days: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
      { days: "Saturday", time: "8:00 AM - 7:00 PM" },
      { days: "Sunday", time: "9:00 AM - 6:00 PM" }
    ],
    features: [
      "Bulk Order Discounts",
      "Home Delivery Service",
      "Free Medicine Packaging",
      "Community Health Programs",
      "Parking Available"
    ]
  }
];

// Methods
const initializeStores = () => {
  stores.value = storeData.map(store => ({
    ...store,
    isOpen: checkIfOpen(store),
    nextOpenTime: getNextOpenTime(store)
  }));
};

const checkIfOpen = (store) => {
  const now = currentTime.value;
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const currentTimeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  for (const hours of store.operatingHours) {
    if (hours.time.includes('24/7')) {
      return true; // 24/7 service is always open
    }

    if (hours.closed) {
      continue; // Skip closed days
    }

    // Check if current day matches the hours
    const dayRange = hours.days.toLowerCase();
    const currentDayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    if (dayRange.includes(currentDayName)) {
      const [openTime, closeTime] = hours.time.split(' - ');
      if (openTime && closeTime) {
        return isTimeInRange(currentTimeStr, openTime, closeTime);
      }
    }
  }

  return false;
};

const isTimeInRange = (current, open, close) => {
  const currentMinutes = timeToMinutes(current);
  const openMinutes = timeToMinutes(open);
  const closeMinutes = timeToMinutes(close);

  if (closeMinutes < openMinutes) {
    // Handles overnight hours (e.g., 8:00 PM - 2:00 AM)
    return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
  }

  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};

const timeToMinutes = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let totalMinutes = hours * 60 + minutes;

  if (period === 'PM' && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hours === 12) {
    totalMinutes = 0; // 12 AM is 0 minutes
  }

  return totalMinutes;
};

const getNextOpenTime = (store) => {
  // Simplified logic - in a real app, this would be more sophisticated
  const tomorrow = new Date(currentTime.value);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return "8:00 AM";
};

const getDirections = (store) => {
  const encodedAddress = encodeURIComponent(store.address);
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
};

const callStore = (phone) => {
  window.open(`tel:${phone}`);
};

const updateTime = () => {
  currentTime.value = new Date();
  // Update store open status
  stores.value = stores.value.map(store => ({
    ...store,
    isOpen: checkIfOpen(store)
  }));
};

// Lifecycle
let timeInterval;

onMounted(() => {
  initializeStores();
  timeInterval = setInterval(updateTime, 60000); // Update every minute
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<style scoped>
/* Variables */
:root {
  --primary-red: #FF6347;
  --secondary-blue: #34495e;
  --success-green: #2ecc71;
  --warning-orange: #f39c12;
  --danger-red: #e74c3c;
  --light-bg: #f8f9fa;
  --white: #ffffff;
  --text-dark: #2c3e50;
  --text-light: #7f8c8d;
  --border-light: #e1e5e9;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stores-section {
  background: var(--white);
  padding: 80px 0 60px;
}

/* Section Header */
.section-header {
  background: linear-gradient(135deg, var(--secondary-blue), var(--primary-red));
  color: var(--white);
  padding: 60px 0 40px;
  text-align: center;
}

.section-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.section-title i {
  font-size: 2.5rem;
}

.section-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Stores Container */
.stores-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.stores-content {
  padding: 60px 0;
}

/* Stores Grid */
.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.store-card {
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 2px solid var(--border-light);
}

.store-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.store-card.featured {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 4px rgba(255, 99, 71, 0.1);
}

.store-header {
  position: relative;
}

.store-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.store-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.store-card:hover .store-image img {
  transform: scale(1.05);
}

.store-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--primary-red);
  color: var(--white);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: var(--shadow-sm);
}

.store-info {
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 99, 71, 0.05), rgba(52, 73, 94, 0.05));
}

.store-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.store-type {
  font-size: 0.9rem;
  color: var(--primary-red);
  font-weight: 500;
}

.store-details {
  padding: 0 20px 20px;
}

.store-address {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--light-bg);
  border-radius: 8px;
}

.store-address i {
  color: var(--primary-red);
  font-size: 1.1rem;
  margin-top: 2px;
}

.store-address span {
  color: var(--text-dark);
  line-height: 1.5;
  font-weight: 500;
}

.store-contact {
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.contact-item i {
  color: var(--secondary-blue);
  font-size: 1rem;
  width: 20px;
}

.store-hours {
  margin-bottom: 20px;
}

.hours-header,
.features-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.hours-header i,
.features-header i {
  color: var(--success-green);
}

.hours-list {
  margin-bottom: 0;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  background: var(--light-bg);
  border-radius: 6px;
  font-size: 0.9rem;
}

.hours-item .days {
  color: var(--text-dark);
  font-weight: 500;
}

.hours-item .time {
  color: var(--text-dark);
  font-weight: 600;
}

.hours-item.closed .time {
  color: var(--danger-red);
}

.store-features {
  margin-bottom: 20px;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-dark);
}

.feature-item i {
  color: var(--success-green);
  font-size: 0.8rem;
}

.store-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.directions-btn,
.call-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.directions-btn {
  background: var(--primary-red);
  color: var(--white);
}

.directions-btn:hover {
  background: #e8533b;
  transform: translateY(-2px);
}

.call-btn {
  background: var(--success-green);
  color: var(--white);
}

.call-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
}

.store-status {
  text-align: center;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-indicator.open {
  background: #d4edda;
  color: #155724;
}

.status-indicator:not(.open) {
  background: #f8d7da;
  color: #721c24;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

.status-indicator.open .status-dot {
  background: var(--success-green);
}

.status-indicator:not(.open) .status-dot {
  background: var(--danger-red);
}

.next-open {
  font-size: 0.75rem;
  color: var(--text-light);
  margin-top: 4px;
}

/* Map Section */
.map-section {
  margin-bottom: 60px;
}

.map-container {
  background: var(--light-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  height: 400px;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: var(--secondary-blue);
}

.map-placeholder i {
  font-size: 4rem;
  margin-bottom: 20px;
}

.map-placeholder h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.map-placeholder p {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 20px;
}

.map-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.main {
  background: var(--primary-red);
}

.legend-dot.regular {
  background: var(--secondary-blue);
}

/* Quick Info Section */
.quick-info-section {
  margin-top: 60px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border-left: 4px solid var(--primary-red);
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-red), var(--secondary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.info-content p {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.5;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .section-content,
  .stores-container {
    padding: 0 20px;
  }

  .stores-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }

  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .stores-section {
    padding: 60px 0 40px;
  }

  .section-header {
    padding: 40px 0 30px;
  }

  .section-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-title i {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .stores-content {
    padding: 40px 0;
  }

  .stores-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .store-actions {
    flex-direction: column;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .info-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .info-card {
    padding: 20px;
  }

  .map-container {
    height: 300px;
  }

  .map-legend {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .section-content,
  .stores-container {
    padding: 0 15px;
  }

  .store-card {
    margin-bottom: 20px;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .info-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .map-container {
    height: 250px;
  }

  .map-placeholder i {
    font-size: 3rem;
  }

  .map-placeholder h3 {
    font-size: 1.3rem;
  }
}
</style>