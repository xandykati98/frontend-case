<template>
    <section>
        <div class="list-title">Main</div>
        <ul class="nav-group">
            <li class="active-tracker" :style="`top: ${trackerTop}; left: ${activeLink === -1 ? -24 : layout.isMinimized ? -8 : -20}px`"></li>
            <SidebarMainNavLink v-for="(item, index) in navLinks" :key="item.title" :title="item.title" :icon="item.icon" :to="item.to" @click="setActiveLink(index)" />
        </ul>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

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
/**
 * @description Define o link ativo
 * @param index index do link
 */
const setActiveLink = (index: number) => {
    activeLink.value = index
}
/**
 * @description Registra um link na lista de links
 * @param link 
 */
const registerLink = (link: NavLink) => {
    links.value.push(link)
}

// posição do tracker
const trackerTop = computed(() => {
    if (activeLink.value === -1) {
        return `${(lastActiveLink.value * (36 + 4)) + 8}px`
    }
    return `${(activeLink.value * (36 + 4)) + 8}px`
})

const route = useRoute()

// observa a mudança de rota
watch(() => route.path, (to) => {
    lastActiveLink.value = activeLink.value
    // if "to" not in links
    if (!links.value.find(link => link.to === to)) {
        setActiveLink(-1)
    }
})

onMounted(() => {
    // registra os links
    for (const link of navLinks.value) {
        registerLink(link)
    }
    const path = window.location.pathname
    // define o link ativo
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
.minimized {
    & .list-title {
        text-align: center;
    }
}
</style>