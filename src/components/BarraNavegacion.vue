<template>
    <v-card>
      <v-tabs
        v-model="state.tab"
        bg-color="primary"
      >
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="state.tab">
          <v-window-item value="one">
            One
          </v-window-item>
  
          <v-window-item value="two">
            Two
          </v-window-item>
  
          <v-window-item value="three">
            Three
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

<script setup lang="ts">

import { reactive } from 'vue'

const state = reactive({ tab: 0 })
</script>

<style scoped>

</style>