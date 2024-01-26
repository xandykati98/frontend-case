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
<style lang="scss" scoped>
    .sidebar-lists {
        gap: 0;
        align-self: flex-end;
    }
</style>