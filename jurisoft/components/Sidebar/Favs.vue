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
<script lang="ts">
export default {
    data() {
        return {
            purple: '#6E3FF3',
            red: '#DF1C41',
            pink: '#E255F2'
        }
    }
}
</script>