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
/* CRITICAL FIX: Ensure HTML and BODY only manage margin/padding */
html,
body {
  margin: 0;
  padding: 0;
  /* Remove min-height: 100vh from html and body */
}

#app-wrapper {
  margin: 0;
  padding: 0;
  /* Ensure the app container itself fills the viewport if content is short */
  min-height: 100vh;
}

/* FIX: Ensure scrolling is enabled on the main document flow */
body {
  /* overflow-y: scroll is usually unnecessary, but it's safe to keep or remove */
  overflow-y: scroll;
  /* overflow-x: hidden is good practice to prevent horizontal scrollbars */
  overflow-x: hidden;
}

/* ---------------------------------------------------------------------- */
/* --- BASE STYLES --- */
/* ---------------------------------------------------------------------- */
* {
  /* Use border-box for easier layout calculation */
  box-sizing: border-box;
}

/* Global Font */
body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f6f9;
}
</style>