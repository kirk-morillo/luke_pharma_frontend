import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './main.css'
import 'primeicons/primeicons.css';
import Swal from 'sweetalert2'; // This ensures the library is initialized and Swal is ready.

import { setGlobalSwalDefaults } from '@/utils/sweetAlertConfig.js';

// The setGlobalSwalDefaults() call is now placed *after* the library import.
setGlobalSwalDefaults();

const app = createApp(App).use(router).mount('#app')