<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { ref } from 'vue'
import { useLayoutStore } from './stores/layout';
import { useUserStore } from './stores/user'
const { $viewport } = useNuxtApp();
const layout = useLayoutStore();
const loading = ref<boolean>(true);
const userStore = useUserStore();

// @ts-ignore
if ($viewport.isLessThan('tablet')) {
  layout.maximize();
}

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