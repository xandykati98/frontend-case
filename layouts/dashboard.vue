<template>
    <div>
        <Sidebar :mobileActive="mobileActive" :toggleMobileActive="toggleMobileActive"/>
        <div :class="{
            main:true, 
            minimized: layout.isMinimized,
            mobile: $viewport.isLessThan('tablet')
        }">
            <Header />
            <slot/>
        </div>
        <div v-if="$viewport.isLessThan('tablet')" :class="{ 'toggle-mobile-active': true, mobileActive }" @click="toggleMobileActive">
            <nuxt-icon :name="mobileActive ? 'caret-right' : 'menu'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $viewport } = useNuxtApp();
const mobileActive = ref(false);

function toggleMobileActive() {
    mobileActive.value = !mobileActive.value;
}
const layout = useLayoutStore();
</script>
<style lang="scss" scoped>
.toggle-mobile-active {
    display: none;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 6;
    width: 48px;
    height: 48px;
    background: $bg;
    border-radius: 8px;
    box-shadow: $mini-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    animation: scaleUp 0.2s ease-in-out forwards;
    animation-delay: 1s;
    background: $primary;
    transform: scale(0);
    & .nuxt-icon {
        width: 24px;
        height: 24px;
        color: $bg;
    }
    &.mobileActive {
        background: $primary-hover;
    }
    @keyframes scaleUp {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    &:hover {
        background: $primary-hover;
    }
    @media screen and (max-width: $mobileWide) {
        display: flex;
    }
}
.main {
    margin-left: $sidebar-width;
    width: calc(100% - #{$sidebar-width});
    min-height: 100vh;
    transition: $sidebar-width-transition;
    &.minimized {
        width: calc(100% - #{$mini-sidebar-width});
        margin-left: $mini-sidebar-width;
        transition: 0s;
    }
    &.mobile {
        width: 100%!important;
        margin-left: 0px!important;
    }
    @media screen and (max-width: 1024px) {
        transition: 0s;
    }
}
</style>