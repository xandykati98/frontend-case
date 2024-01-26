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
.then((res) => {
  console.log(res)
  loading.value = false
})
</script>
<style lang="scss">
* {
    font-family: Inter;
    box-sizing: border-box;
}
</style>