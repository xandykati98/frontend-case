<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from './stores/user'
const loading = ref<boolean>(true)
const userStore = useUserStore();
userStore
.loadUser()
.then(() => {
  loading.value = false
})
</script>
<style lang="scss">
* {
    font-family: Inter;
    box-sizing: border-box;
}
body {
  margin: 0;
}
.nuxt-icon svg {
  margin-bottom: 0!important;
  width: 100%!important;
  height: 100%!important;
}
</style>