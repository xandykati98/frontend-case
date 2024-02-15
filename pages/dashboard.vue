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
<style lang="scss" scoped>
main {
    padding: 4px 32px 32px 32px;
    background: $bg;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(6, 1fr);
    @media (max-width: $mobileWide) {
        padding-right: 16px;
        padding-left: 16px;
    }
    & > * {
        grid-column: span 2;
        @media (max-width: $desktopMedium) {
            grid-column: span 3;
        }
        @media (max-width: $tablet) {
            grid-column: span 6;
        }
    }
    & .retrofit {
        @media (max-width: $desktopMedium) {
            grid-row: 2;
        }
    }
    & .subdivider {
        grid-column: span 2;
        @media (max-width: $desktopMedium) {
            grid-column: span 3;
        }
        @media (max-width: $tablet) {
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
        @media (max-width: $desktopMedium) {
            grid-column: span 6;
        }
    }
}
</style>