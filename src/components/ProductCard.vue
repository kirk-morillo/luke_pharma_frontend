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
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-color: var(--primary-red, #E74C3C);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-card.out-of-stock .add-to-bag-btn {
  background-color: #ecf0f1 !important;
  color: #bdc3c7 !important;
  cursor: not-allowed !important;
}

.add-to-bag-btn:active:not(:disabled) {
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-card {
    margin: 4px;
    padding: 12px;
    min-height: 160px;
  }

  .card-icon {
    width: 40px !important;
    height: 40px !important;
    padding: 8px !important;
  }
}

@media (max-width: 480px) {
  .product-card {
    margin: 2px;
    padding: 8px;
    min-height: 140px;
  }
}
</style>