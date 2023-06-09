<template>
  <div class="user" @click="onClick" :class="{ selected: selected }">
    <div class="description">
      <div class="name">
        {{ user.username }} {{ user.self ? " (yourself)" : "" }}
      </div>
      <div class="status">
        <status-icon :connected="user.connected" />{{ status }}
      </div>
    </div>
    <div v-if="user.hasNewMessages" class="new-messages">!</div>
  </div>
</template>


<script lang="ts">

import  { defineComponent } from "vue";
import StatusIcon from "./StatusIcon.vue";
import type { PropType } from 'vue'

interface Mensaje{
    fromSelf: boolean,
    content: string
}

declare interface Usuario{
  userID: string,
  hasNewMessages: boolean,
  connected: boolean,
  username: string,
  messages: Mensaje[],
  self: boolean
}


export default defineComponent( {
  name: "UserChat",
  components: { StatusIcon },
  props: {
    user: {type: Object as PropType<Usuario>, required: true},
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("select");
    },
  },
  computed: {
    status() {
      return this.user.connected ? "online" : "offline";
    },
  },
  mounted() {
    this.user
    this.selected 
  }
});
</script>

<style scoped>
.selected {
  background-color: #1164a3;
}

.user {
  padding: 10px;
}

.description {
  display: inline-block;
}

.status {
  color: #92959e;
}

.new-messages {
  color: white;
  background-color: red;
  width: 20px;
  border-radius: 5px;
  text-align: center;
  float: right;
  margin-top: 10px;
}
</style>
