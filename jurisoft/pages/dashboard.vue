<template>
    <main>
        <TimeTracker/>
        <TimeTracker/>
        <TimeTracker/>
        <TimeTracker/>
    </main>
</template>
<script setup>
    definePageMeta({
        layout: 'dashboard'
    })
</script>
<style lang="scss" scoped>
main {
    padding: 4px 32px 0px 32px;
    background: $bg;
    display: grid;
    gap: 24px;
    grid-template-columns: auto auto auto;
    & > * {
        grid-column: span 1;
    }
}
</style>
<style lang="scss">
main {
    .card {
        
    }
}
</style>