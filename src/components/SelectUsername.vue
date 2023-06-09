<template>
  <div class="select-username">
    <div >
      <input v-model="username" placeholder="Your username..." />
      <button :disabled="!isValid" @click="onSubmit">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SelectUsername",
  data() {
    return {
      username: "",
    };
  },
  computed: {
    isValid() {
      return this.username.length > 2;
    },
  },
  methods: {
    onSubmit() {
      console.log("vamos qe nos vamos")
      this.$emit("envioUsuario", this.username);
    },
  },
};
</script>

<style scoped>
.select-username {
  width: 300px;
  margin: 200px auto 0;
}
</style>
