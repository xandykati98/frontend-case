<template>
    <div :class="`sidebar ${layout.isMinimized ? 'minimized' : ''}`">
        <div class="container-sidebar">
            <div class="top">
                <SidebarHeader/>
                <section class="sidebar-lists">
                    <SidebarMain/>
                    <SidebarFavs/>
                </section>
            </div>
            <div class="bottom">
                <SidebarExtra/>
                <div class="divider"></div>
                <SidebarProfile/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLayoutStore } from '../../stores/layout'

const layout = useLayoutStore();
</script>
<style lang="scss">
.minimized {
	& .nav-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
}
.list-title {
    text-transform: uppercase;
    padding: 4px;
    width: 100%;
    color: #868C98;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.48px;
    text-transform: uppercase;
}
.nav-group {
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    position: relative;
}
</style>
<style lang="scss" scoped>
.sidebar {
    width: $sidebar-width;
    height: 100vh;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    left: 0;
}
.sidebar-lists {
    display: flex;
    padding: 20px 20px 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    & > section {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        align-self: stretch;
  }
}
.minimized {
    .container-sidebar {
		width: $mini-sidebar-width;
		transition: $sidebar-width-transition;
	}
    &.sidebar {
        width: $mini-sidebar-width;
    }
	& .sidebar-lists {
		padding: 20px 8px 16px 8px;
	}
}
.container-sidebar {
    box-shadow: 1px 0px 0px 0px $border;
    background: $bg;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
	transition: 0s;
	width: 100%;
    justify-content: flex-start;
}
.top {
    height: calc(100% - 200px);
    overflow: auto;
    
    /* custom scrollbar */
    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
}
.bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    align-content: flex-end;
    
    position: absolute;
    bottom: 0;
    background: $bg;
}
.divider {
    height: 1px;
    background: $border;
    width: 232px;
    display: flex;
}
</style>