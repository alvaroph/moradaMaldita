<script setup lang="ts">
import socket  from "../socket";
import { reactive } from 'vue'
import { onMounted } from 'vue'

onMounted(() => {
  socket.on("envioCartas", (data) => {
      console.log(data)
      state.cartas=data.content.cartas;
      state.gemas=data.content.gemas;
    });

    socket.on("gemaRobada", (idGema) => {
      console.log(idGema);
      state.gemas[idGema].libre=false;
    });
  });


 interface Carta {
    id: number,
    num: number,
    activa: boolean,
    img: string,
    nVertices: number[]
    gemasCarta: Gema[]
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



 function escogerGema(idCarta: number , idGema: number){
    state.gemas[idGema].libre=false;
    state.cartas[idCarta].gemasCarta.push(state.gemas[idGema]);
    console.log(`Escojo la gema ${idGema} y la carta activa es la ${idCarta}`)
    socket.emit("roboGema", {
          gema: idGema
        });
 }


</script>

<template>
  <div class="greetings">
 
    <h3>
      Bienvenido a la Morada Maldita 
    </h3>

    <span v-bind:key="gema.id" v-for="gema in state.gemas">
        <img @click="escogerGema(state.cartaActiva,gema.id)" class="gema" :src="gema.libre ? gema.img : '' " alt="">    
    </span>
    <br>
    <v-btn @click="recibirCartas">
      Button
    </v-btn>
    <span v-bind:key="carta.id" v-for="carta in state.cartas">
        <img @click="volteaCarta(carta.num)" class="carta" :src="carta.activa ? carta.img : 'reverso.png' " alt="">
        <span v-bind:key="miniGema.id" v-for="miniGema in carta.gemasCarta">
          <img @click="volteaCarta(carta.num)" class="miniGema" :src="miniGema.img" alt="">
        </span>
      </span>
  </div>
</template>
<style>
.carta{
  width: 100px;
}

.gema{
  width: 50px;
}
.miniGema{
  width: 25px;
}
</style>