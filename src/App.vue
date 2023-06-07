<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
   
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Juego</RouterLink>
        <RouterLink to="/about">Sobre el juego</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

