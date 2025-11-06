// Sample pharmacy products data for POS system
export const sampleProducts = [
  // Medicines - Pain Relievers
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 50.00,
    stock: 100,
    category: "medicines",
    subcategory: "pain relievers",
    sku: "MED001",
    unit: "tablet"
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    price: 75.00,
    stock: 85,
    category: "medicines",
    subcategory: "pain relievers",
    sku: "MED002",
    unit: "tablet"
  },
  {
    id: 3,
    name: "Biogesic",
    price: 45.00,
    stock: 120,
    category: "medicines",
    subcategory: "pain relievers",
    sku: "MED003",
    unit: "tablet"
  },
  {
    id: 4,
    name: "Bioflu",
    price: 65.00,
    stock: 60,
    category: "medicines",
    subcategory: "pain relievers",
    sku: "MED004",
    unit: "capsule"
  },

  // Medicines - Antibiotics
  {
    id: 5,
    name: "Amoxicillin 250mg",
    price: 120.00,
    stock: 45,
    category: "medicines",
    subcategory: "antibiotics",
    sku: "MED005",
    unit: "capsule"
  },
  {
    id: 6,
    name: "Cefalexin 500mg",
    price: 150.00,
    stock: 30,
    category: "medicines",
    subcategory: "antibiotics",
    sku: "MED006",
    unit: "capsule"
  },

  // Medicines - Vitamins
  {
    id: 7,
    name: "Vitamin C 1000mg",
    price: 85.00,
    stock: 200,
    category: "medicines",
    subcategory: "vitamins",
    sku: "MED007",
    unit: "tablet"
  },
  {
    id: 8,
    name: "Vitamin D3 1000 IU",
    price: 95.00,
    stock: 75,
    category: "medicines",
    subcategory: "vitamins",
    sku: "MED008",
    unit: "capsule"
  },
  {
    id: 9,
    name: "Zinc 50mg",
    price: 110.00,
    stock: 55,
    category: "medicines",
    subcategory: "vitamins",
    sku: "MED009",
    unit: "tablet"
  },
  {
    id: 10,
    name: "Multivitamins",
    price: 130.00,
    stock: 90,
    category: "medicines",
    subcategory: "vitamins",
    sku: "MED010",
    unit: "tablet"
  },

  // Medical Supplies
  {
    id: 11,
    name: "Medical Mask (box of 50)",
    price: 150.00,
    stock: 25,
    category: "medical supplies",
    subcategory: "ppe",
    sku: "SUP001",
    unit: "box"
  },
  {
    id: 12,
    name: "Alcohol 70% (500ml)",
    price: 45.00,
    stock: 150,
    category: "medical supplies",
    subcategory: "disinfectants",
    sku: "SUP002",
    unit: "bottle"
  },
  {
    id: 13,
    name: "Thermometer Digital",
    price: 250.00,
    stock: 35,
    category: "medical supplies",
    subcategory: "equipment",
    sku: "SUP003",
    unit: "piece"
  },
  {
    id: 14,
    name: "Bandage Strip",
    price: 35.00,
    stock: 80,
    category: "medical supplies",
    subcategory: "wound care",
    sku: "SUP004",
    unit: "piece"
  },
  {
    id: 15,
    name: "Cotton Balls (pack of 100)",
    price: 40.00,
    stock: 60,
    category: "medical supplies",
    subcategory: "wound care",
    sku: "SUP005",
    unit: "pack"
  },
  {
    id: 16,
    name: "Gloves (box of 100)",
    price: 180.00,
    stock: 40,
    category: "medical supplies",
    subcategory: "ppe",
    sku: "SUP006",
    unit: "box"
  },
  {
    id: 17,
    name: "Blood Pressure Monitor",
    price: 1200.00,
    stock: 15,
    category: "medical supplies",
    subcategory: "equipment",
    sku: "SUP007",
    unit: "unit"
  },
  {
    id: 18,
    name: "Nebulizer",
    price: 850.00,
    stock: 20,
    category: "medical supplies",
    subcategory: "equipment",
    sku: "SUP008",
    unit: "unit"
  },

  // Personal Care
  {
    id: 19,
    name: "Hand Soap (250ml)",
    price: 55.00,
    stock: 110,
    category: "personal care",
    subcategory: "hygiene",
    sku: "PER001",
    unit: "bottle"
  },
  {
    id: 20,
    name: "Hand Sanitizer 70% (500ml)",
    price: 80.00,
    stock: 95,
    category: "personal care",
    subcategory: "hygiene",
    sku: "PER002",
    unit: "bottle"
  }
];

// Categories for filtering
export const categories = [
  {
    id: 'medicines',
    name: 'Medicines',
    subcategories: [
      { id: 'pain relievers', name: 'Pain Relievers' },
      { id: 'antibiotics', name: 'Antibiotics' },
      { id: 'vitamins', name: 'Vitamins' }
    ]
  },
  {
    id: 'medical supplies',
    name: 'Medical Supplies',
    subcategories: [
      { id: 'ppe', name: 'PPE' },
      { id: 'disinfectants', name: 'Disinfectants' },
      { id: 'equipment', name: 'Equipment' },
      { id: 'wound care', name: 'Wound Care' }
    ]
  },
  {
    id: 'personal care',
    name: 'Personal Care',
    subcategories: [
      { id: 'hygiene', name: 'Hygiene' }
    ]
  }
];

// Frequently sold items for quick access
export const frequentlySoldItems = [
  sampleProducts[0], // Paracetamol 500mg
  sampleProducts[7], // Vitamin C 1000mg
  sampleProducts[3], // Bioflu
  sampleProducts[11], // Medical Mask
  sampleProducts[12] // Alcohol 70%
];