<template>
    <div class="sidebar-lists">
        <section>
            <ul class="nav-group">
                <SidebarExtraNavLink title="Configurações" to="configuracoes" icon="configuracoes"/>
                <SidebarExtraNavLink title="Suporte" to="suporte" icon="suporte"/>
            </ul>
        </section>
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
        }
    }
}
</script>
<style lang="scss" scoped>
    .sidebar-lists {
        gap: 0;
        align-self: flex-end;
    }
</style>