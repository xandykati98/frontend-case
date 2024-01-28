<template>
    <main>
        <TimeTracker/>
        <div class="subdivider">
            <TimeReport/>
            <CoursesProgress/>
        </div>
        <Highlights/>
        <div class="maximize-courses">
            <Courses/>
        </div>
        <div class="retrofit">
            <Feedback/>
        </div>
    </main>
</template>
<script setup>
    definePageMeta({
        layout: 'dashboard'
    })
</script>
<style lang="scss" scoped>
main {
    padding: 4px 32px 32px 32px;
    background: $bg;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(6, 1fr);
    & > * {
        grid-column: span 2;
        @media (max-width: 1200px) {
            grid-column: span 3;
        }
        @media (max-width: 800px) {
            grid-column: span 6;
        }
    }
    & .retrofit {
        @media (max-width: 1200px) {
            grid-row: 2;
        }
    }
    & .subdivider {
        grid-column: span 2;
        @media (max-width: 1200px) {
            grid-column: span 3;
        }
        @media (max-width: 800px) {
            grid-column: span 6;
        }
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
    .maximize-courses {
        grid-column: span 4;
        @media (max-width: 1200px) {
            grid-column: span 6;
        }
    }
}
</style>