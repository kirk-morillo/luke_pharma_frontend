<template>
    <div class="login-container" :style="containerStyle">

        <div class="background-graphic" :style="backgroundGraphicStyle"></div>

        <div class="login-box" :style="loginBoxStyle">

            <router-link to="/" class="back-link" :style="backLinkStyle">
                <i class="pi pi-arrow-left" :style="{ color: primaryCoral }"></i>
            </router-link>
            <img src="/logo.png" alt="Login Logo" :style="logoStyle" />

            <form @submit.prevent="handleLogin" class="login-form">

                <div class="input-group" :style="{ marginBottom: '30px' }">
                    <input type="text" id="username" v-model="credentials.username" required placeholder="username"
                        :style="inputFieldStyle('user')">
                </div>

                <div class="input-group" :style="{ marginBottom: '40px', position: 'relative' }">
                    <input :type="passwordInputType" id="password" v-model="credentials.password" required
                        placeholder="password" :style="inputFieldStyle('lock')">

                    <i @click="togglePasswordVisibility" :class="showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'"
                        class="password-toggle-icon" :style="{ color: primaryCoral }"></i>
                </div>

                <p v-if="error" class="error-message" :style="{
                    color: '#e74c3c',
                    textAlign: 'center',
                    marginBottom: '15px'
                }">
                    {{ error }}
                </p>

                <button type="submit" :disabled="isLoading" class="login-button" :style="loginButtonStyle">
                    {{ isLoading ? 'Logging in...' : 'LOGIN' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessAlert, showErrorAlert, showLoginAlert } from '@/utils/sweetAlertConfig.js';

const router = useRouter();

const credentials = reactive({
    username: '',
    password: ''
});

const isLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// --- Style Objects for Design ---

const primaryRed = '#E74C3C';
const whiteColor = '#FFFFFF';
const boxShadowColor = 'rgba(0, 0, 0, 0.1)';

const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    margin: '0',
    overflow: 'hidden',
    fontFamily: 'Poppins, sans-serif',
    background: `linear-gradient(to bottom right, #ff9580, ${whiteColor})`,
    boxSizing: 'border-box',
    padding: '0 10vw 0 0',
    position: 'relative',
};

const loginBoxStyle = {
    background: 'white',
    padding: '50px 60px',
    borderRadius: '15px',
    boxShadow: `0 10px 25px ${boxShadowColor}`,
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '10',
    position: 'relative', // IMPORTANT: For positioning the absolute back button
};

const logoStyle = {
    width: '150px',
    height: 'auto',
    marginBottom: '60px',
};

// NEW: Style for the back link wrapper
const backLinkStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    textDecoration: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
};


const userIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF6347' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E")`;
const lockIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF6347' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E")`;


const inputFieldStyle = (iconType) => ({
    width: '100%',
    padding: iconType === 'lock' ? '12px 45px 12px 40px' : '12px 15px 12px 40px',
    border: `1px solid ${primaryCoral}`,
    borderRadius: '5px',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: '1em',
    outline: 'none',
    fontFamily: 'Poppins, sans-serif',
    backgroundImage: iconType === 'user' ? userIcon : lockIcon,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '12px center',
    backgroundSize: '20px',
});

const loginButtonStyle = computed(() => ({
    width: '100%',
    padding: '15px',
    backgroundColor: primaryCoral,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    cursor: isLoading.value ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s, opacity 0.3s, box-shadow 0.3s',
    opacity: isLoading.value ? '0.7' : '1',
    marginTop: '0',
    boxShadow: `0 4px 10px rgba(255, 99, 71, 0.3)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const backgroundGraphicStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    transform: 'none',
    zIndex: '1',
    opacity: '0.4',
    backgroundImage: `url('/login_bg.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const setAuthState = (role) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
};

const handleLogin = async () => {
    isLoading.value = true;
    error.value = '';

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { username, password } = credentials;
    let redirectPath = null;
    let role = null;

    if (username === 'admin' && password === '123') {
        setAuthState('admin');
        redirectPath = '/admin';
        role = 'Administrator';
    } else if (username === 'user' && password === '123') {
        setAuthState('user');
        redirectPath = '/products';
        role = 'User';
    } else {
        isLoading.value = false;
        showErrorAlert('Login Failed', 'Invalid username or password. Please try again.');
        return;
    }

    isLoading.value = false;

    // Show success message before redirect
    await showSuccessAlert(
        'Login Successful!',
        `Welcome back, ${role}! You are being redirected...`,
        false
    );

    if (redirectPath) {
        router.replace(redirectPath);
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

input::placeholder {
    color: #FF6347;
    opacity: 0.6;
    font-family: 'Poppins', sans-serif;
}

input::-webkit-input-placeholder {
    color: #FF6347;
    opacity: 0.6;
}

input::-moz-placeholder {
    color: #FF6347;
    opacity: 0.6;
}

input:-ms-input-placeholder {
    color: #FF6347;
}

input:-moz-placeholder {
    color: #FF6347;
    opacity: 0.6;
}


input {
    font-family: 'Poppins', sans-serif;
}

input:focus {
    border-color: #FF6347;
    box-shadow: 0 0 0 2px rgba(255, 99, 71, 0.2);
}

.password-toggle-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1.2em;
    /* Adjust size of the icon */
    z-index: 50;
}

.login-button:not(:disabled):hover {
    background-color: #e74c3c;
    box-shadow: 0 6px 15px rgba(255, 99, 71, 0.5);
}

.login-button:not(:disabled):active {
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(255, 99, 71, 0.4);
}

/* NEW: Hover effect for the back link */
.back-link:hover {
    opacity: 0.8;
}

@media (max-width: 768px) {
    .login-container {
        justify-content: center !important;
        padding: 0 5vw !important;
    }

    .login-box {
        padding: 40px 30px !important;
        max-width: 90% !important;
    }

    .background-graphic {
        opacity: 0.1 !important;
    }
}
</style>