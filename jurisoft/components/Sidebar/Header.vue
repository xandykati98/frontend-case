<template>
    <div class="container-header">
        <section>
            <div class="container-logo-intro">
                <div class="logo" @click="logoClick">
                    <SvgIcon name="logo" height="40" width="40"/>
                </div>
                <div class="intro">
                    <h1>Jurisoft</h1>
                    <h3>Marketing Jurídico</h3>
                </div>
            </div>
            <div class="caret" @click="layout.minimize">
                <svg-icon name="caret-down" width="24" height="24"/>
            </div>
        </section>
        <div class="divider"></div>
    </div>
</template>
<script setup lang="ts">
import { useLayoutStore } from '../../stores/layout'

const layout = useLayoutStore();
const logoClick = () => {
    layout.maximize();
}
</script>
<style lang="scss" scoped>
.minimized {
    .container-header {
        padding: 0px;
        padding-top: 12px;
        justify-content: center;
        & section {
            justify-content: center;
            & .container-logo-intro {
                & .logo {
                    margin-right: 0px;
                }
            }
            & .intro {
                display: none;
            }
            & .caret {
                display: none;
            }
        }
        & .divider {
            width: 40px;
        }
    }
}
.container-header {
    width: 100%;
    height: 88px;
    padding: 12px;
    padding-bottom: 0px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    transition: $sidebar-transition;
    & section {
        width: 100%;
        margin: 12px;
        display: flex;
        justify-content: space-between;
        & .container-logo-intro {
            display: flex;
            justify-content: flex-start;
            & .logo {
                margin-right: 12px;
                cursor: pointer;
            }
        }
        & .intro {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            height: 100%;
            flex-direction: column;
            transition: $sidebar-transition;
        }
        & .intro h1 {
            color: $text-highlight;
            font-weight: 500;
            font-size: 14px;
            margin: unset;
            margin-bottom: 4px;
            line-height: 20px; /* 142.857% */
            letter-spacing: -0.084px;
        }
        & .intro h3 {
            color: $text-default;
            font-weight: 400;
            font-size: 12px;
            margin: unset;
            line-height: 16px;
        }
        & .caret {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            cursor: pointer;
            transition: $sidebar-transition;
        }
    }
}
.divider {
    border-top: 1px solid #E2E4E9;
    height: 0px;
    width: 232px;
    display: flex;
    
}
</style>