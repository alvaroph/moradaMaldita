<template>
  <div>
    <div class="header">
      <status-icon :connected="user.connected" />{{ user.username }}
    </div>

    <ul class="messages">
      <li
        v-for="(message, index) in user.messages"
        :key="index"
        class="message"
      >
        <div v-if="displaySender(message, index)" class="sender">
          {{ message.fromSelf ? "(yourself)" : user.username }}
        </div>
        {{ message.content }}
      </li>
    </ul>

    <div class="form">
      <textarea v-model="mensaje" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" @click="onSubmit" class="send-button">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import StatusIcon from "./StatusIcon.vue";


interface Mensaje{
    fromSelf: boolean,
    content: string
}

interface Usuario{
  userID: string,
  hasNewMessages: boolean,
  connected: boolean,
  username: string,
  messages: Mensaje[],
  self: boolean
}

import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent( {
  name: "MessagePanel",
  components: {
    StatusIcon,
  }
  , props: {
    user: {type: Object as PropType<Usuario>, required: true},
  },
  data() {
    return {
      mensaje: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("envioMensaje", this.mensaje);
      this.mensaje = "";
    },
    displaySender(message: Mensaje, index: number) {
      return (
        index === 0 ||
        this.user.messages[index - 1].fromSelf !==
          this.user.messages[index].fromSelf
      );
    },
  },
  computed: {
    isValid() {
      return this.mensaje.length > 0;
    },
  },
});
</script>

<style scoped>
.header {
  line-height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #dddddd;
}

.messages {
  margin: 0;
  padding: 20px;
}

.message {
  list-style: none;
}

.sender {
  font-weight: bold;
  margin-top: 5px;
}

.form {
  padding: 10px;
}

.input {
  width: 80%;
  resize: none;
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #000;
}

.send-button {
  vertical-align: top;
}
</style>
