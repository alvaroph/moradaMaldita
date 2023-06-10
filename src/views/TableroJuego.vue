<script setup lang="ts">
import socket  from "../socket";
import { reactive } from 'vue'
import { onMounted } from 'vue'

onMounted(() => {
  socket.on("envioCartas", (data) => {
      console.log(data)
      state.cartas=data.content;
    });
  });


 interface Carta {
    id: number,
    num: number,
    activa: boolean,
    img: string,
    nVertices: number[]
  }

  interface Gema{
    id: number,
    img:string,
    libre: boolean
  }

   interface Partida{
    cartaActiva: number,
    cartas: Carta[],
    gemas: Gema[]
  }

const state : Partida = reactive({ 
    cartaActiva:     -1,
    cartas: [],
    gemas:[]
});
  
  function volteaCarta(id : number){
      if (state.cartaActiva===(id-1)) {
          state.cartas[id].activa=true
          state.cartaActiva++
      }
  }

 function recibirCartas(){
  console.log("dame cartas");
  console.log(socket.id)
  socket.emit("recibirCartas", {
          userAsking: socket.id
        });
 
 }

 

 function escogerGema(id: number){
console.log(id)
 }


</script>

<template>
  <div class="greetings">
 
    <h3>
      Bienvenido a la Morada Maldita
    </h3>

    <span v-bind:key="gema.id" v-for="gema in state.gemas">
        <img @click="escogerGema(gema.id)" class="carta" :src="gema.libre ? gema.img : '' " alt="">
    </span>

    <v-btn @click="recibirCartas">
      Button
    </v-btn>
    <span v-bind:key="carta.id" v-for="carta in state.cartas">
        <img @click="volteaCarta(carta.num)" class="carta" :src="carta.activa ? carta.img : 'reverso.png' " alt="">
    </span>
  </div>
</template>
<style>
.carta{
  width: 100px;
}
</style>