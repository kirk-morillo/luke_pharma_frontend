<template>
  <div
    class="product-card"
    :class="{
      'compact': compact,
      'out-of-stock': !product.inStock
    }"
    :style="cardStyle"
  >
    <div class="card-icon" :style="iconStyle">
      <i :class="getProductIcon(product.category)" :style="iconElementStyle"></i>
    </div>
    <div class="card-content">
      <h4 class="product-name" :style="nameStyle">{{ product.name }}</h4>
      <p class="product-category" :style="categoryStyle">{{ product.category }}</p>
      <div class="product-price" :style="priceStyle">₱{{ product.price.toFixed(2) }}</div>
      <div class="stock-locations" :style="locationsStyle">
        <i class="pi pi-map-marker" :style="markerStyle"></i>
        {{ formatStockLocations(product.stockLocations) }}
      </div>
      <button
        v-if="showAddButton"
        @click="$emit('add-to-bag', product)"
        class="add-to-bag-btn"
        :style="buttonStyle"
        :disabled="!product.inStock"
        @mouseover="handleButtonHover(true)"
        @mouseleave="handleButtonHover(false)"
      >
        <i class="pi pi-shopping-bag" :style="buttonIconStyle"></i>
        {{ compact ? '' : 'Add to Bag' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add-to-bag'],
  data() {
    return {
      isButtonHovered: false
    }
  },
  computed: {
    cardStyle() {
      return {
        backgroundColor: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--card-border, #e0e0e0)',
        borderRadius: 'var(--card-radius, 8px)',
        padding: this.compact ? '12px' : '16px',
        margin: '8px',
        boxShadow: 'var(--card-shadow, 0 2px 4px rgba(0,0,0,0.1))',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: this.compact ? '180px' : '220px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }
    },
    iconStyle() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '12px',
        padding: '12px',
        borderRadius: '50%',
        backgroundColor: this.getProductIconBg(this.product.category),
        width: this.compact ? '48px' : '60px',
        height: this.compact ? '48px' : '60px',
        margin: '0 auto 12px auto'
      }
    },
    iconElementStyle() {
      return {
        fontSize: this.compact ? '20px' : '24px',
        color: this.getProductIconColor(this.product.category)
      }
    },
    nameStyle() {
      return {
        margin: '0 0 4px 0',
        fontSize: this.compact ? '14px' : '16px',
        fontWeight: '600',
        color: 'var(--text-primary, #2c3e50)',
        textAlign: 'center',
        lineHeight: '1.3',
        fontFamily: 'Poppins, sans-serif'
      }
    },
    categoryStyle() {
      return {
        margin: '0 0 8px 0',
        fontSize: this.compact ? '12px' : '13px',
        color: 'var(--text-secondary, #7f8c8d)',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif'
      }
    },
    priceStyle() {
      return {
        fontSize: this.compact ? '16px' : '18px',
        fontWeight: '700',
        color: 'var(--primary-red, #E74C3C)',
        textAlign: 'center',
        margin: '0 0 8px 0',
        fontFamily: 'Poppins, sans-serif'
      }
    },
    locationsStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: this.compact ? '11px' : '12px',
        color: 'var(--text-muted, #95a5a6)',
        marginBottom: '12px',
        gap: '4px',
        fontFamily: 'Poppins, sans-serif'
      }
    },
    markerStyle() {
      return {
        fontSize: '10px',
        color: 'var(--primary-red, #E74C3C)'
      }
    },
    buttonStyle() {
      const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: this.compact ? '8px 12px' : '10px 16px',
        border: 'none',
        borderRadius: '6px',
        fontSize: this.compact ? '12px' : '14px',
        fontWeight: '500',
        cursor: this.product.inStock ? 'pointer' : 'not-allowed',
        transition: 'all 0.3s ease',
        fontFamily: 'Poppins, sans-serif',
        marginTop: 'auto'
      }

      if (!this.product.inStock) {
        return {
          ...baseStyle,
          backgroundColor: '#ecf0f1',
          color: '#bdc3c7'
        }
      }

      if (this.isButtonHovered) {
        return {
          ...baseStyle,
          backgroundColor: '#c0392b',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(231, 76, 60, 0.3)'
        }
      }

      return {
        ...baseStyle,
        backgroundColor: 'var(--primary-red, #E74C3C)',
        color: '#ffffff'
      }
    },
    buttonIconStyle() {
      return {
        fontSize: this.compact ? '12px' : '14px'
      }
    }
  },
  methods: {
    getProductIcon(category) {
      return category === 'Medicine' ? 'pi pi-pill' : 'pi pi-cog'
    },
    getProductIconBg(category) {
      return category === 'Medicine'
        ? 'rgba(46, 204, 113, 0.1)'
        : 'rgba(52, 152, 219, 0.1)'
    },
    getProductIconColor(category) {
      return category === 'Medicine'
        ? '#2ecc71'
        : '#3498db'
    },
    formatStockLocations(locations) {
      if (!locations || locations.length === 0) return 'No locations'

      // Check if product is available at all branches
      const allLocations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5']
      const availableLocations = locations.filter(loc => allLocations.includes(loc))

      if (availableLocations.length >= 3) {
        return 'All Branches'
      }

      return availableLocations.join(', ')
    },
    handleButtonHover(hovering) {
      if (this.product.inStock) {
        this.isButtonHovered = hovering
      }
    }
  }
}
</script>

<style scoped>
/* Base ProductCard Styles */
.product-card {
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, #e0e0e0);
  border-radius: var(--card-radius, 8px);
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: var(--card-shadow, 0 2px 4px rgba(0,0,0,0.1));
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-color: var(--primary-red, #E74C3C);
}

.product-card.compact {
  min-height: 180px;
  padding: 0.75rem;
  margin: 0.25rem;
}

.product-card.out-of-stock {
  opacity: 0.7;
}

/* Icon Container */
.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0.75rem auto;
  padding: 0.75rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  transition: all 0.3s ease;
}

.product-card.compact .card-icon {
  width: 48px;
  height: 48px;
  padding: 0.75rem;
}

.product-card:hover .card-icon {
  transform: scale(1.1);
}

/* Product Information */
.product-name {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary, #2c3e50);
  text-align: center;
  line-height: 1.3;
  font-family: 'Poppins', sans-serif;
}

.product-card.compact .product-name {
  font-size: 0.875rem;
}

.product-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.8125rem;
  color: var(--text-secondary, #7f8c8d);
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.product-card.compact .product-category {
  font-size: 0.75rem;
}

.product-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-red, #E74C3C);
  text-align: center;
  margin: 0 0 0.5rem 0;
  font-family: 'Poppins', sans-serif;
}

.product-card.compact .product-price {
  font-size: 1rem;
}

/* Stock Locations */
.stock-locations {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--text-muted, #95a5a6);
  margin-bottom: 0.75rem;
  gap: 0.25rem;
  font-family: 'Poppins', sans-serif;
}

.product-card.compact .stock-locations {
  font-size: 0.6875rem;
  margin-bottom: 0.5rem;
}

.stock-locations i {
  font-size: 0.625rem;
  color: var(--primary-red, #E74C3C);
}

/* Add to Bag Button */
.add-to-bag-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  margin-top: auto;
  background-color: var(--primary-red, #E74C3C);
  color: #ffffff;
  min-height: 40px;
}

.product-card.compact .add-to-bag-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  min-height: 36px;
}

.add-to-bag-btn:hover:not(:disabled) {
  background-color: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

.add-to-bag-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-to-bag-btn:disabled {
  background-color: #ecf0f1;
  color: #bdc3c7;
  cursor: not-allowed;
}

.product-card.out-of-stock .add-to-bag-btn {
  background-color: #ecf0f1 !important;
  color: #bdc3c7 !important;
  cursor: not-allowed !important;
}

.add-to-bag-btn i {
  font-size: 0.875rem;
}

.product-card.compact .add-to-bag-btn i {
  font-size: 0.75rem;
}

/* Category-specific Icon Styles */
.card-icon.medicine-icon {
  background-color: rgba(46, 204, 113, 0.1);
}

.card-icon.medicine-icon i {
  color: #2ecc71;
}

.card-icon.equipment-icon {
  background-color: rgba(52, 152, 219, 0.1);
}

.card-icon.equipment-icon i {
  color: #3498db;
}

/* Responsive Design Improvements */
@media (max-width: 1024px) {
  .product-card {
    margin: 0.375rem;
    min-height: 200px;
  }

  .product-card.compact {
    min-height: 160px;
  }
}

@media (max-width: 768px) {
  .product-card {
    margin: 0.25rem;
    padding: 0.75rem;
    min-height: 180px;
  }

  .product-card.compact {
    min-height: 140px;
    padding: 0.5rem;
  }

  .card-icon {
    width: 48px !important;
    height: 48px !important;
    padding: 0.5rem !important;
  }

  .product-card.compact .card-icon {
    width: 40px !important;
    height: 40px !important;
    padding: 0.5rem !important;
  }

  .product-name {
    font-size: 0.875rem;
  }

  .product-category {
    font-size: 0.75rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .stock-locations {
    font-size: 0.6875rem;
  }

  .add-to-bag-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-height: 36px;
  }
}

@media (max-width: 480px) {
  .product-card {
    margin: 0.125rem;
    padding: 0.5rem;
    min-height: 160px;
  }

  .product-card.compact {
    min-height: 130px;
    padding: 0.375rem;
  }

  .card-icon {
    width: 40px !important;
    height: 40px !important;
    padding: 0.375rem !important;
  }

  .product-card.compact .card-icon {
    width: 32px !important;
    height: 32px !important;
    padding: 0.25rem !important;
  }

  .product-name {
    font-size: 0.8125rem;
  }

  .product-category {
    font-size: 0.6875rem;
  }

  .product-price {
    font-size: 0.875rem;
  }

  .stock-locations {
    font-size: 0.625rem;
  }

  .add-to-bag-btn {
    padding: 0.375rem 0.625rem;
    font-size: 0.6875rem;
    min-height: 32px;
  }
}

/* Touch-friendly improvements for mobile */
@media (hover: none) and (pointer: coarse) {
  .add-to-bag-btn {
    min-height: 44px;
    padding: 0.75rem 1rem;
  }

  .product-card.compact .add-to-bag-btn {
    min-height: 40px;
  }
}

/* Animation improvements */
.product-card {
  animation: cardFadeIn 0.3s ease-out;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles for accessibility */
.product-card:focus-within {
  outline: 2px solid var(--primary-red, #E74C3C);
  outline-offset: 2px;
}

.add-to-bag-btn:focus-visible {
  outline: 2px solid var(--primary-red, #E74C3C);
  outline-offset: 2px;
}
</style>