<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <Navbar />
  <RouterView />
  <footer class="text-center bg-light py-4 text-muted container-fluid position-absolute bottom-0">
      &copy; Copyright 2023
  </footer>
</template>

<style scoped>

</style>
