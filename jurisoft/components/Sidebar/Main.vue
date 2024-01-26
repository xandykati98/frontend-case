<template>
    <section>
        <div class="list-title">Main</div>
        <ul class="nav-group">
            <div class="active-tracker" :style="`top: ${trackerTop}; left: ${activeLink === -1 ? -24 : layout.isMinimized ? -8 : -20}px`"></div>
            <SidebarMainNavLink v-for="(item, index) in navLinks" :key="item.title" :title="item.title" :icon="item.icon" :to="item.to" @click="setActiveLink(index)" />
        </ul>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useLayoutStore } from '../../stores/layout'

const layout = useLayoutStore();

type NavLink = {
    title: string,
    icon: string,
    to: string,
}

const navLinks = ref<NavLink[]>([
    {
        title: 'Dashboard',
        icon: 'dashboard',
        to: '/dashboard',
    },
    {
        title: 'Calendário',
        icon: 'calendario',
        to: '/calendario',
    },
    {
        title: 'Descanso',
        icon: 'descanso',
        to: '/descanso',
    },
    {
        title: 'Projetos',
        icon: 'projetos',
        to: '/projetos',
    },
    {
        title: 'Times',
        icon: 'times',
        to: '/times',
    },
    {
        title: 'Integrações',
        icon: 'integracoes',
        to: '/integracoes',
    },
    {
        title: 'Benefícios',
        icon: 'beneficios',
        to: '/beneficios',
    },
    {
        title: 'Documentos',
        icon: 'documentos',
        to: '/documentos',
    },
])
const activeLink = ref(0)
const links = ref<NavLink[]>([])
const lastActiveLink = ref(0)
const setActiveLink = (index: number) => {
    activeLink.value = index
}

const registerLink = (link: NavLink) => {
    links.value.push(link)
}

const trackerTop = computed(() => {
    if (activeLink.value === -1) {
        return `${(lastActiveLink.value * (36 + 4)) + 8}px`
    }
    return `${(activeLink.value * (36 + 4)) + 8}px`
})

const route = useRoute()

watch(() => route.path, (to) => {
    lastActiveLink.value = activeLink.value
    // if "to" not in links
    if (!links.value.find(link => link.to === to)) {
        setActiveLink(-1)
    }
})

onMounted(() => {
    // register all links
    for (const link of navLinks.value) {
        registerLink(link)
    }
    const path = window.location.pathname
    // find active link
    const index = links.value.findIndex(link => link.to === path)
    setActiveLink(index)
})
</script>

<style lang="scss" scoped>
.active-tracker {
    position: absolute;
    width: 4px;
    height: 20px;
    border-radius: 0px 4px 4px 0px;
    background: $primary;
    left: -20px;
    transition: top 0.2s ease-in-out;
}
.nav-group {
    display: grid;
    gap: 4px;
}
.minimized {
    & .list-title {
        text-align: center;
    }
}
</style>