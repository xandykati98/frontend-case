<template>
</template>
<script setup>
// redireciona para a página de dashboard
definePageMeta({
  middleware: [
    function (to, from) {
        return navigateTo('/dashboard')
    }
  ]
})
</script>