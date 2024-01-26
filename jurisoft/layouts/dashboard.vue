<template>
    <div>
        <Sidebar />
        <div :class="`main ${layout.isMinimized ? 'minimized' : ''}`">
            <Header />
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '../stores/layout'

const layout = useLayoutStore();
</script>

<style lang="scss">
    .main {
        margin-left: $sidebar-width;
        width: calc(100% - #{$sidebar-width});
        min-height: 100vh;
        transition: $sidebar-width-transition;
        &.minimized {
            width: calc(100% - #{$mini-sidebar-width});
            margin-left: $mini-sidebar-width;
            transition: 0;
        }
    }
</style>