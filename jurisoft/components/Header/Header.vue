<template>
    <header>
        <section>
            <div class="container-avatar-intro">
                <div class="avatar">
                    <nuxt-img :src="store.user?.avatar" alt="avatar"/>
                </div>
                <div class="intro" v-if="!layout.isMinimized ? $viewport.isGreaterOrEquals('desktop') : true">
                    <h1>
                        {{ store.user?.name }}
                    </h1>
                    <h3>Bem-vinda de volta <nuxt-img src="waving-hand_light-skin-tone.png"/></h3>
                </div>
            </div>
        </section>
        <section class="right">
            <div class="icon-item">
                <nuxt-icon name="busca"/>
            </div>
            <div class="icon-item">
                <nuxt-icon name="notificacao"/>
                <div class="notification-error"></div>
            </div>
            <Button icon="calendario-alt">Calendário</Button>
            <Button icon="plus" primary>Nova solicitação</Button>
        </section>
    </header>
</template>

<script lang="ts" setup>
// @ts-ignore
import { useNuxtApp } from '#app'
import { useUserStore } from '../../stores/user'
import { useLayoutStore } from '../../stores/layout'

const layout = useLayoutStore();
const store = useUserStore()
const { $viewport } = useNuxtApp()

</script>
<style lang="scss" scoped>
header {
    background: $bg;
    padding: 20px 32px;
    width: 100%;
    height: 88px;
    display: flex;
    justify-content: space-between;
    & section {
        display: flex;
        align-items: center;
        &.right {
            gap: 12px;
            & .icon-item {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: $button-radius;
                &:hover {
                    background: $highlight-bg;
                }
                & .notification-error {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 4px;
                    height: 4px;
                    background: $error;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px white;
                }
            }
        }
    }
}
.container-avatar-intro {
    display: flex;
    justify-content: flex-start;
    & .avatar {
        transition: $sidebar-transition;
        margin-right: 12px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        & img {
            width: 100%;
            height: 100%;
        }
    }
    & .intro {
        & h1 {
            font-size: 18px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: -0.27px;
            color: $text-highlight;
            margin-bottom: 4px;
            margin-top: 0px;
        }
        & h3 {
            display: flex;
            font-family: Inter;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.084px;
            color: $text-default;
            margin-bottom: 0px;
            margin-top: 0px;
            & img {
                width: 20px;
                height: 20px;
                margin: 0px 4px;
            }
        }
    }
}
</style>