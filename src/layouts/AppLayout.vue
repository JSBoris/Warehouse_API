<script setup>
import Header from '../components/layout/Header.vue';

</script>



<template>

  <div class="wrapper">

    <Header />

    <div>
      <router-view />
    </div>
  </div>

</template>



<style scoped>
.wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
