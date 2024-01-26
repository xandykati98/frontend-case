<template>
    <div>
        <div class="sidebar-container">
            <Sidebar />
        </div>
        <div class="main">
            header
            <slot/>
        </div>
    </div>
</template>


<script>
import Sidebar from '@/components/Sidebar/Sidebar.vue';

export default {
    components: {
        Sidebar
    }
}
</script>

<style lang="scss">
    $sidebar-width: 272px;
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
    }
</style>