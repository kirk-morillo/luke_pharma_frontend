<template>
    <div class="admin-panel" :style="adminPanelStyle">

        <aside class="admin-sidebar" :style="adminSidebarStyle">

            <div class="sidebar-header" :style="sidebarHeaderStyle">
                <img src="/logo.png" alt="Luked Pharma Co. Logo" :style="sidebarLogoStyle">
            </div>

            <nav :style="navStyle">

                <router-link v-for="link in adminSidebarLinks" :key="link.path" :to="link.path" class="nav-link"
                    :active-class="getActiveClass(link.path)" :exact="link.path === '/admin'"
                    :style="getNavLinkStyle(link.path)">
                    <i :class="[link.icon, 'nav-icon']"></i> {{ link.title }}
                </router-link>

            </nav>

            <a @click.prevent="logout" class="logout-link" :style="logoutLinkStyle">
                Log Out
            </a>

        </aside>

        <main class="admin-content" :style="adminContentStyle">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const router = useRouter();
const route = useRoute();

const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    console.log("Logging out...");
    router.push('/login');
};

// Function to safely retrieve and lowercase the user role from localStorage
const getUserRole = () => {
    const role = localStorage.getItem('userRole');
    return role ? role.toLowerCase() : null;
};

// --- DYNAMIC NAVIGATION LOGIC (FIXED TO FILTER BY ROLE) ---
const adminSidebarLinks = computed(() => {
    const adminRoute = router.getRoutes().find(r => r.name === 'Admin');
    if (!adminRoute || !adminRoute.children) return [];

    const currentUserRole = getUserRole(); // Get the current user's role

    return adminRoute.children
        .filter(child => child.meta && child.meta.isSidebarLink)
        .filter(child => {
            // Get required roles from the route meta and standardize to lowercase
            const requiredRoles = (child.meta.roles || []).map(role => role.toLowerCase());

            if (requiredRoles.length === 0) return true; // Link has no roles defined, allow it.

            // Allow the link ONLY if the user's role is included in the required roles.
            return requiredRoles.includes(currentUserRole);
        })
        .map(child => ({
            // Construct the full path (e.g., /admin/sales)
            path: adminRoute.path + (child.path ? '/' + child.path : ''),
            title: child.meta.sidebarTitle,
            icon: child.meta.sidebarIcon,
            roles: child.meta.roles
        }));
});

const getActiveClass = (path) => {
    const isDashboard = path === '/admin';
    const isOnChildRoute = route.path.startsWith('/admin') && route.path !== '/admin';

    if (isDashboard && isOnChildRoute) {
        return '';
    }

    if (isDashboard) {
        return 'exact-active';
    }

    return '';
};


// --- Style Objects ---
const primaryColor = '#FF6347';
const darkTextColor = '#2c3e50';
const inactiveColor = darkTextColor;
const whiteColor = '#FFFFFF';
const activeBgColor = '#fff5f4';
const hoverBgColor = '#f0f3f6';

const adminPanelStyle = {
    display: 'flex',
    height: '100vh',
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
    overflow: 'hidden',
};

const sidebarWidth = '240px';

const adminSidebarStyle = {
    width: sidebarWidth,
    backgroundColor: whiteColor,
    color: inactiveColor,
    boxShadow: '2px 0 20px rgba(0, 0, 0, 0.05)',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Poppins, sans-serif'
};

const sidebarHeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px 20px',
    borderBottom: '1px solid #dcdcdc',
    marginBottom: '10px',
};

const sidebarLogoStyle = {
    width: '120px',
    height: 'auto',
};

const navStyle = {
    flexGrow: 1,
    padding: '10px 15px',
};

const getNavLinkStyle = (path) => {
    const isDashboard = path === '/admin';
    const isActive = isDashboard ? route.path === path : route.path.startsWith(path);

    const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 15px',
        margin: '5px 0',
        color: inactiveColor,
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        transition: 'background-color 0.2s, color 0.2s, font-weight 0.2s',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
    };

    if (isActive) {
        return {
            ...baseStyle,
            color: primaryColor,
            fontWeight: '600',
        };
    }

    return baseStyle;
};

const logoutLinkStyle = {
    display: 'block',
    padding: '15px',
    margin: '20px 15px',
    backgroundColor: primaryColor,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.2s, background-color 0.2s',
    boxShadow: '0 4px 6px rgba(255, 99, 71, 0.3)',
};

const adminContentStyle = {
    flexGrow: 1,
    fontFamily: 'Poppins, sans-serif',
    padding: '30px 40px',
    backgroundColor: '#ecf0f1',
    overflowY: 'auto'
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* PRIMEICONS STYLES */
.nav-icon {
    font-size: 1.15em;
    margin-right: 12px;
    color: inherit;
    transition: color 0.2s, transform 0.2s;
}

/* --- NAVIGATION LINKS --- */
.nav-link {
    color: #2c3e50;
    position: relative;
    overflow: hidden;
    padding: 14px 15px !important;
    border-radius: 6px;
    font-weight: 500;
}

/* Hover effect */
.nav-link:hover {
    background-color: #f0f3f6;
    color: #2c3e50 !important;
    font-weight: 600;
}


/* --- ACTIVE STATE STYLING (Relies ONLY on exact match) --- */
.nav-link.exact-active,
.nav-link.router-link-exact-active {
    background-color: #fff5f4;
    transform: scale(1.03);
    transform-origin: left center;
}

/* 2. Set Active Text/Icon color to Red */
.nav-link.router-link-active {
    color: #FF6347 !important;
    font-weight: 700;
}


/* 3. ACTIVE INDICATOR DOT/PILL (MUST be exact) */
.nav-link::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 80%;
    background-color: #FF6347;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.2s ease-in-out;
}

/* Show pill ONLY when the link is truly exact active */
.nav-link.exact-active::after,
.nav-link.router-link-exact-active::after {
    width: 4px;
    opacity: 1;
}


/* Log Out Button Hover */
.logout-link:hover {
    background-color: #e8533b;
    opacity: 1;
    box-shadow: 0 6px 8px rgba(255, 99, 71, 0.4);
}
</style>