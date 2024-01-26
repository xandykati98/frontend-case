<template>
    <section>
        <div class="list-title">Main</div>
        <ul class="nav-group">
            <div class="active-tracker" :style="`top: ${trackerTop}`"></div>
            <SidebarMainNavLink v-for="(item, index) in navLinks" :key="item.title" :title="item.title" :icon="item.icon" :to="item.to" @click="setActiveLink(index)" />
        </ul>
    </section>
</template>
<script>
import { onMounted } from 'vue'
const activeLink = ref(0)
const links = ref([])
const navLinks = ref([
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
const setActiveLink = (index) => {
    activeLink.value = index
}
const registerLink = (link) => {
    links.value.push(link)
}


export default {
    methods: {
        setActiveLink,
        registerLink
    },
    computed: {
        trackerTop: function () {
            return `${(activeLink.value * (36 + 4)) + (activeLink.value * 4) + 8}px`
        }
    },
    setup() {
        onMounted(() => {
            // register all links
            for (const link of navLinks.value) {
                registerLink(link)
            }
            // get path 
            const path = window.location.pathname
            console.log(path)
            // get index of path in links
            const index = links.value.findIndex(link => link.to === path)
            // set active link
            setActiveLink(index)
        })
        return {
            navLinks,
            activeLink,
            setActiveLink,
            registerLink,
            links
        }
    }
}
</script>
<style lang="scss" scoped>
    .active-tracker {
        position: absolute;
        width: 4px;
        height: 20px;
        border-radius: 0px 4px 4px 0px;
        background: $primary;
        left: -20px;
        transition: 0.2s ease-in-out;
    }
</style>