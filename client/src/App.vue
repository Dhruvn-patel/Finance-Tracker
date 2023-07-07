<template>
  <div>
    <Header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {
  width: 200px;
  object-fit: cover;
}
a {
  text-decoration: none;
}
.swal-wide {
  width: 400px !important;
}
.swal2-popup {
  font-size: 0.7rem;
}
</style>
