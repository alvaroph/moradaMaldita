<script setup lang="ts">
import { reactive } from 'vue'
/*import { onMounted } from 'vue'

onMounted(() => {
  state.cartaActiva=-1;
  state.cartas=[Carta{id:0, activa: false, img:"una.png", nVertices:[3] },
            {id:1, activa: false, img:"dos.png", nVertices:[3] },
            {id:2, activa: false , img:"tres.png", nVertices:[3] },
            {id:3, activa: false , img:"cuatro.png", nVertices:[3] },
            {id:4, activa: false , img:"cinco.png", nVertices:[3] }]
    });*/


 interface Carta {
    id: number,
    activa: boolean,
    img: string,
    nVertices: number[]
  }

   interface Mazo{
    cartaActiva: number,
    cartas: Carta[]
  }

const state : Mazo = reactive({ 
    cartaActiva:     -1,
    cartas: [{id:0, activa: false, img:"una.png", nVertices:[3] },
            {id:1, activa: false, img:"dos.png", nVertices:[3] },
            {id:2, activa: false , img:"tres.png", nVertices:[3] },
            {id:3, activa: false , img:"cuatro.png", nVertices:[3] },
            {id:4, activa: false , img:"cinco.png", nVertices:[3] }]
});
  
  function volteaCarta(id : number){
      if (state.cartaActiva===(id-1)) {
          state.cartas[id].activa=true
          state.cartaActiva++
      }
  }


</script>

<template>
  <div class="greetings">
 
    <h3>
      Bienvenido a la Morada Maldita
    </h3>
    <v-btn>
  Button
</v-btn>
    <span v-bind:key="carta.id" v-for="carta in state.cartas">
        <img @click="volteaCarta(carta.id)" class="carta" :src="carta.activa ? carta.img : 'back.png'" alt="">
    </span>
  </div>
</template>
<style>
.carta{
  width: 100px;
}
</style>