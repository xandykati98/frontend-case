<template>
</template>
<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
        return navigateTo('/dashboard')
    }
  ]
})
</script>