import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';

// --- CHANGES BELOW ---

// 1. IMPORT THE LANDING PAGE COMPONENT
import LandingPage from '@/pages/user side/LandingPage.vue'; // Assuming location: src/pages/user side/LandingPage.vue
// NOTE: ProductCatalog (MedecineSection) is now likely a component within LandingPage.vue
import ProductCatalogComponent from '@/components/MedecineSection.vue';

// NEW USER-FACING PAGES
import ProductsPage from '@/pages/user side/ProductsPage.vue';
import BranchPage from '@/pages/user side/BranchPage.vue';
import BagPage from '@/pages/user side/BagPage.vue';

// --- END CHANGES ---

import AdminPanel from '@/pages/admin side/AdminPanel.vue'; 
import AdminDashboard from '@/pages/admin side/AdminDashboard.vue'; 

const routes = [
  // --- LANDING PAGE (ROOT) ---
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },

  {
    path: '/catalog-only',
    name: 'ProductCatalogOnly',
    component: ProductCatalogComponent // Keep this if you need a pure catalog view
  },

  // --- NEW USER-FACING PAGES ---
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage
  },
  {
    path: '/branch',
    name: 'Branch',
    component: BranchPage
  },
  {
    path: '/bag',
    name: 'BagPage',
    component: BagPage
  },
  
  // --- LOGIN PAGE ---
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  // --- ADMIN PANEL (MOTHER PAGE) ---
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel, 
    meta: { requiresAuth: true, roles: ['admin'] }, 
    
    // CHILD ROUTES (render inside AdminPanel's <router-view>)
    children: [
      {
        path: '', // The default path for /admin
        name: 'AdminDashboard',
        component: AdminDashboard, // The "Main Page"
        // ADDED META TAGS for Sidebar generation
        meta: { 
            requiresAuth: true, 
            roles: ['admin'],
            isSidebarLink: true,
            sidebarTitle: 'Dashboard', // Text to display
            sidebarIcon: 'pi pi-home'    // PrimeIcon class
        }
      },
      {
        path: 'inventory',
        name: 'InventoryManagement',
        // Using a consistent dynamic import style
        component: () => import('@/pages/admin side/InventoryManagement.vue'), 
        meta: { 
            requiresAuth: true, 
            roles: ['admin'],
            isSidebarLink: true,
            sidebarTitle: 'Inventory',
            sidebarIcon: 'pi pi-box'
        } 
      },
      // SALES MANAGEMENT ROUTE (Definition is correct)
      {
        path: 'sales',
        name: 'SalesManagement',
        // Using a consistent dynamic import style
        component: () => import('@/pages/admin side/SalesManagement.vue'),
        meta: {
            requiresAuth: true,
            roles: ['admin', 'cashier'], // Correctly allows both roles
            isSidebarLink: true,
            sidebarTitle: 'Sales',
            sidebarIcon: 'pi pi-chart-bar'
        }
      },
      // POS TERMINAL ROUTE (NEW)
      {
        path: 'pos',
        name: 'POS',
        // Using dynamic import to follow existing pattern
        component: () => import('@/pages/admin side/POS.vue'),
        meta: {
            requiresAuth: true,
            roles: ['admin', 'cashier'], // Allow both admin and cashier roles
            isSidebarLink: true,
            sidebarTitle: 'POS Terminal',
            sidebarIcon: 'pi pi-calculator'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// The beforeEach guard remains correct and robust for handling authentication and roles
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  const mostSpecificRoute = to.matched[to.matched.length - 1];
  
  const requiredRoles = (mostSpecificRoute.meta.roles || []).map(role => role.toLowerCase());
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // 3. Standardize the user's role to lowercase when reading from storage.
  const userRole = localStorage.getItem('userRole') ? localStorage.getItem('userRole').toLowerCase() : null;

  if (requiresAuth && !isLoggedIn) {
    // Not authenticated, redirect to login
    next('/login');
  } else if (requiresAuth && isLoggedIn) {
    
    let isAuthorized = true; 
    
    if (requiredRoles.length > 0) {
      // Case-safe check if the user's lowercase role is included in the lowercase required roles list.
      isAuthorized = requiredRoles.includes(userRole);
    }

    if (!isAuthorized) {
      // User is logged in but lacks the required privilege
      console.warn(`Access denied for role: ${userRole} on route: ${to.path}`);
      next('/'); // Redirect to public page (now LandingPage)
    } else {
      // Authenticated and Authorized
      next();
    }
  } else {
    // Public route, allow access
    next();
  }
});

export default router;