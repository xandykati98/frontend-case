<template>
    <main>
        <TimeTracker/>
        <div class="subdivider">
            <TimeReport/>
            <CoursesProgress/>
        </div>
        <Highlights/>
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
    grid-template-columns: repeat(3, 1fr);
    & > * {
        grid-column: span 1;
    }
    & .subdivider {
        grid-column: 2;
        gap: 24px;
        grid-template-columns: auto auto;
        & > * {
            grid-column: span 2;
        }
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
        flex-direction: column;
    }
}
</style>
<style lang="scss">
main {
    .card {
        
    }
}
</style>