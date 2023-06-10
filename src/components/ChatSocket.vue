<template>
  <div>
    <div class="left-panel">
      <user
        v-for="user in users"
        :key="user.userID"
        :user="user"
        :selected="selectedUser === user"
        @select="onSelectUser(user)"
      />
    </div>
    <message-panel
      v-if="selectedUser"
      :user="selectedUser"
      @envioMensaje="onMessage"
      class="right-panel"
    />
  </div>
</template>

<script lang="ts">
import socket from "../socket";
import User from "./UserChat.vue";
import MessagePanel from "./MessagePanel.vue";
import  { defineComponent } from "vue";

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

export default defineComponent({
  name: "ChatSocket",
  components: { User, MessagePanel },
  data() {
    return {
      selectedUser: {} as Usuario,
      users:  [] as Usuario[],
    };
  },
  methods: {
    onMessage(content: string) {
      if (this.selectedUser) {
        socket.emit("private message", {
          content,
          to: this.selectedUser.userID,
        });
        this.selectedUser.messages.push({
          content,
          fromSelf: true,
        });
      }
    },
    onSelectUser(user: Usuario) {
      this.selectedUser = user;
      user.hasNewMessages = false;
    },
  },
  created() {
    socket.on("connect", () => {
      this.users.forEach((user: Usuario) => {
        if (user.self) {
          user.connected = true;
        }
      });
    });

    socket.on("disconnect", () => {
      this.users.forEach((user: Usuario) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });

    const initReactiveProperties = (user: Usuario) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("users", (users: { forEach: (arg0: (user: Usuario) => void) => void; sort: (arg0: (a: any, b: any) => 1 | 0 | -1) => never[]; }) => {
      users.forEach((user: Usuario) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      // put the current user first, and sort by username
      this.users = users.sort((a: { self: any; username: number; }, b: { self: any; username: number; }) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });

    socket.on("user connected", (user: Usuario) => {
      initReactiveProperties(user);
      this.users.push(user);
    });

    socket.on("user disconnected", (id: string) => {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
    });

    socket.on("private message", ({ content, from }) => {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
    });
  },
  unmounted() {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("users");
    socket.off("user connected");
    socket.off("user disconnected");
    socket.off("private message");
  },
  mounted() {
    this.selectedUser // type: string | undefined
    this.users// type: number | string | undefined
  }
});
</script>

<style scoped>
.left-panel {
  /*position: fixed;*/
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-color: #3f0e40;
  color: white;
}

.right-panel {
  margin-left: 260px;
}
</style>
