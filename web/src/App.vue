<script setup>
import { onMounted } from "vue";
import store from "./utils/store";
onMounted(() => {
  store.dispatch({ type: "init" });
});
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  overflow: auto;
}
</style>
