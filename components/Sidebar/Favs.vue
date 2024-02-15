<template>
    <section>
        <div class="list-title">Favs</div>
        <ul class="nav-group">
            <SidebarFavsNavLink title="Loom Mobile App" :color="purple" to="#" command="⌘ 1"/>
            <SidebarFavsNavLink title="Monday Redesign" :color="red" to="#" command="⌘ 2"/>
            <SidebarFavsNavLink title="Udemy Courses" :color="pink" to="#" command="⌘ 3"/>
        </ul>
    </section>
</template>
<script setup lang="ts">
const purple = '#6E3FF3';
const red = '#DF1C41';
const pink = '#E255F2';
</script>
<style lang="scss" scoped>
.nav-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    align-items: center;
    flex-direction: column;
}
.minimized {
    & .list-title {
        text-align: center;
    }
}
</style>