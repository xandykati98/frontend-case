<template>
    <div :class="{ sidebar: true, minimized: layout.isMinimized, mobileActive }">
        <div class="container-sidebar">
            <div class="top">
                <SidebarHeader :mobileActive="mobileActive"/>
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

defineProps({
    mobileActive: Boolean,
    toggleMobileActive: Function
})
</script>
<style lang="scss">
.sidebar-lists {
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
	& .nav-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
    & .item {
        width: fit-content;
        & .link {
            & .contents {
                & .title {
                    display: none;
                }
            }
            & .caret {
                display: none;
            }
        }
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
    display: grid;
    gap: 4px;
    & li.item {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        & .contents {
            display: flex;
            align-items: center;
            & .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                color: $text-default;
                & svg {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            & .title {
                margin: 0px 8px;
                color: $text-default;
                font-weight: 500;
                line-height: 20px;
                font-size: 14px;
                letter-spacing: -0.084px;
            }
        }
        & .caret {
            width: 20px;
            height: 20px;
            justify-self: end;
            transform: translateX(-10px);
            opacity: 0;
            transition: all 0.2s ease-in-out;
        }
        & .link {
            padding: 8px 12px 8px 12px;
            text-decoration: none!important;
            display: flex;
            flex-wrap: wrap;
            border-radius: 8px;
            position: relative;
            height: 36px;
            width: 100%;
            justify-content: space-between;
            &:hover {
                background: $highlight-bg;
                & .caret {
                    transform: translateX(0px);
                    opacity: 1;
                }
            }
            &.active {
                background: $highlight-bg;
                & .item {
                    & .title {
                        color: $text-highlight;
                    }
                    & .contents .icon {
                        color: $primary;
                    }
                    & .caret {
                        transform: translateX(0px);
                        opacity: 1;
                    }
                }
            }
        }
    }
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
    z-index: +5;
    @media (max-width: $mobileWide) {
        position: fixed;
        transform: translateX(calc(-100% - 2px));
        transition: $sidebar-transition;
        &.mobileActive {
            transform: translateX(0%);
        }
    }
}
.sidebar-lists {
    display: flex;
    padding: 20px 20px 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
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
    & .divider {
        width: 40px;
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
    overflow: overlay;
    margin-right: -2px;
    /* custom scrollbar */
    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        margin: 1px;
        width: 3px;
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

    width: 100%;
    justify-content: center;
}
.divider {
    height: 1px;
    background: $border;
    width: 232px;
    display: flex;
}
</style>