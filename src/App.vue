<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BarraNavegacion from './components/BarraNavegacion.vue'
</script>

<template>
  <header>
   
    <div class="wrapper">
      
  <BarraNavegacion></BarraNavegacion>
      <nav>
        <RouterLink to="/">Juego</RouterLink>
        <RouterLink to="/about">Sobre el juego</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

