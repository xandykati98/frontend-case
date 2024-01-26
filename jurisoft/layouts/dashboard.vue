<template>
    <div>
        <div class="sidebar-container" :style="`width: ${layout.minimized ? '80': '272'}px`">
            <Sidebar />
        </div>
        <div :class="`main ${layout.minimized ? 'minimized' : ''}`">
            header
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '../stores/layout'

const layout = useLayoutStore();
</script>

<style lang="scss">
    $sidebar-width: 272px;
    $mini-sidebar-width: 80px;
    .sidebar-container {
        width: $sidebar-width;
        height: 100vh;
        background-color: #FFFFFF;
        position: fixed;
        top: 0;
        left: 0;
    }
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