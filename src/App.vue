<template>
  <div>
  <header>

    <div class="wrapper">      
      <BarraNavegacion></BarraNavegacion>
      <nav>
        <RouterLink to="/">Juego</RouterLink>
        <RouterLink to="/about">Sobre el juego</RouterLink>
      </nav>
    </div>
    <select-username
      v-if="!usernameAlreadySelected"
      @input="onUsernameSelection"
    />
    <chat v-else />
  </header>

  <RouterView />
  
  </div>
</template>


<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BarraNavegacion from './components/BarraNavegacion.vue'

import SelectUsername from './components/SelectUsername.vue'
import Chat from "./components/Chat.vue";
import socket from "./socket";

export default {
  name: "App",
  components: {
   Chat,
    SelectUsername,
  },
  data() {
    return {
      usernameAlreadySelected: false,
    };
  },
  methods: {
    onUsernameSelection(username: string) {
      this.usernameAlreadySelected = true;
      socket.auth = { username };
      socket.connect();
    },
  },
  unmounted() {
    socket.on("connect_error", (err: any) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
  },
  destroyed() {
    socket.off("connect_error");
  },
};
</script>

<style>
body {
  margin: 0;
}

@font-face {
  font-family: Lato;
  src: "~/public/fonts/Lato-Regular.ttf";
}

#app {
  font-family: Lato, Arial, sans-serif;
  font-size: 14px;
}
</style>