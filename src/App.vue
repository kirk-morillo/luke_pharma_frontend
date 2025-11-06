<template>
  <div id="app-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style>

html,
body,
#app-wrapper {
  margin: 0;
  padding: 0;

  min-height: 100vh;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
}

/* ---------------------------------------------------------------------- */
/* --- BASE STYLES (Optional, but good for a new project) --- */
/* ---------------------------------------------------------------------- */
* {
  /* Use border-box for easier layout calculation */
  box-sizing: border-box;
}

/* Global Font (Example: Use a clean sans-serif font) */
body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f6f9;
  /* Match background used in Catalog.vue */
}
</style>