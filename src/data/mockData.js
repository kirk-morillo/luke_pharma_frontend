// Database-ready mock data for Luke Pharma Co. website

// Ready for database migration
export const mockProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Medicine",
    price: 5.00,
    stockLocations: ["Location 1", "Location 3"],
    description: "Pain relief medication",
    inStock: true,
    sku: "MED001"
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    category: "Medicine",
    price: 7.50,
    stockLocations: ["Location 1", "Location 2"],
    description: "Anti-inflammatory medication",
    inStock: true,
    sku: "MED002"
  },
  {
    id: 3,
    name: "Biogesic",
    category: "Medicine",
    price: 4.50,
    stockLocations: ["Location 2", "Location 3"],
    description: "Fever and pain relief",
    inStock: true,
    sku: "MED003"
  },
  {
    id: 4,
    name: "Vitamin C 1000mg",
    category: "Medicine",
    price: 8.50,
    stockLocations: ["Location 1", "Location 2", "Location 3"],
    description: "Immune system support",
    inStock: true,
    sku: "MED004"
  },
  {
    id: 5,
    name: "Amoxicillin 250mg",
    category: "Medicine",
    price: 12.00,
    stockLocations: ["Location 1"],
    description: "Antibiotic medication",
    inStock: true,
    sku: "MED005"
  },
  {
    id: 6,
    name: "Medical Mask (box of 50)",
    category: "Medical Equipment",
    price: 15.00,
    stockLocations: ["Location 1", "Location 2", "Location 3"],
    description: "Disposable face masks",
    inStock: true,
    sku: "EQP001"
  },
  {
    id: 7,
    name: "Alcohol 70% (500ml)",
    category: "Medical Equipment",
    price: 4.50,
    stockLocations: ["Location 1", "Location 2"],
    description: "Antiseptic alcohol solution",
    inStock: true,
    sku: "EQP002"
  },
  {
    id: 8,
    name: "Digital Thermometer",
    category: "Medical Equipment",
    price: 25.00,
    stockLocations: ["Location 2", "Location 3"],
    description: "Digital temperature measurement",
    inStock: true,
    sku: "EQP003"
  },
  {
    id: 9,
    name: "Blood Pressure Monitor",
    category: "Medical Equipment",
    price: 120.00,
    stockLocations: ["Location 1"],
    description: "Automatic blood pressure monitoring",
    inStock: true,
    sku: "EQP004"
  },
  {
    id: 10,
    name: "Nebulizer Machine",
    category: "Medical Equipment",
    price: 85.00,
    stockLocations: ["Location 3"],
    description: "Breathing treatment device",
    inStock: true,
    sku: "EQP005"
  },
  {
    id: 11,
    name: "Bandage Strip",
    category: "Medical Equipment",
    price: 3.50,
    stockLocations: ["Location 1", "Location 2", "Location 3"],
    description: "Adhesive bandage strips",
    inStock: true,
    sku: "EQP006"
  },
  {
    id: 12,
    name: "Hand Sanitizer 70%",
    category: "Medical Equipment",
    price: 8.00,
    stockLocations: ["Location 1", "Location 2"],
    description: "Hand disinfectant gel",
    inStock: true,
    sku: "EQP007"
  },
  {
    id: 13,
    name: "Multivitamins",
    category: "Medicine",
    price: 13.00,
    stockLocations: ["Location 1", "Location 3"],
    description: "Complete daily multivitamin supplement",
    inStock: true,
    sku: "MED006"
  },
  {
    id: 14,
    name: "Face Shield",
    category: "Medical Equipment",
    price: 6.00,
    stockLocations: ["Location 2", "Location 3"],
    description: "Protective face shield",
    inStock: true,
    sku: "EQP008"
  },
  {
    id: 15,
    name: "Vitamin D3 1000 IU",
    category: "Medicine",
    price: 9.50,
    stockLocations: ["Location 1"],
    description: "Bone health support",
    inStock: true,
    sku: "MED007"
  }
];

// Frequently sold products for landing page display
export const frequentlySoldProducts = mockProducts.slice(0, 8);

export const mockBranches = [
  {
    id: 1,
    name: "Luke Pharma - Location 1",
    address: "123 Main Street, Manila",
    coordinates: { lat: 14.5995, lng: 120.9842 },
    serviceHours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    contact: "+63 2 1234 5678",
    email: "location1@lukepharma.com"
  },
  {
    id: 2,
    name: "Luke Pharma - Location 2",
    address: "456 Quezon Avenue, Quezon City",
    coordinates: { lat: 14.6760, lng: 121.0437 },
    serviceHours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    contact: "+63 2 2345 6789",
    email: "location2@lukepharma.com"
  },
  {
    id: 3,
    name: "Luke Pharma - Location 3",
    address: "789 Makati Avenue, Makati City",
    coordinates: { lat: 14.5547, lng: 121.0244 },
    serviceHours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    contact: "+63 2 3456 7890",
    email: "location3@lukepharma.com"
  },
  {
    id: 4,
    name: "Luke Pharma - Location 4",
    address: "321 EDSA, Mandaluyong",
    coordinates: { lat: 14.5794, lng: 121.0359 },
    serviceHours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    contact: "+63 2 4567 8901",
    email: "location4@lukepharma.com"
  },
  {
    id: 5,
    name: "Luke Pharma - Location 5",
    address: "654 Shaw Boulevard, Pasig",
    coordinates: { lat: 14.5764, lng: 121.0851 },
    serviceHours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    contact: "+63 2 5678 9012",
    email: "location5@lukepharma.com"
  }
];

// Categories for filtering
export const productCategories = [
  {
    id: 'Medicine',
    name: 'Medicine',
    count: mockProducts.filter(p => p.category === 'Medicine').length
  },
  {
    id: 'Medical Equipment',
    name: 'Medical Equipment',
    count: mockProducts.filter(p => p.category === 'Medical Equipment').length
  }
];