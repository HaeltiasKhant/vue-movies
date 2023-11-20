<script setup>
import Navbar from '../components/Navbar.vue'
import { RouterView, useRoute } from 'vue-router'
import Footer from '../components/Footer.vue'
import { useMovieStore } from '../stores/counter';

const route = useRoute()
const movieStore = useMovieStore()
</script>

<template>
  <Navbar v-if="route.name != 'welcome'"/>
  <main>
    <RouterView  />
  </main>
  <Footer v-if="!movieStore.isLoading && route.name != 'welcome'" />
</template>