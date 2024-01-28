<template>
    <header>
        <section>
            <div class="container-avatar-intro">
                <div class="avatar">
                    <nuxt-img :src="store.user?.avatar" alt="avatar"/>
                </div>
                <div class="intro" v-if="!layout.isMinimized ? $viewport.isGreaterOrEquals('desktop') : $viewport.isGreaterOrEquals('tablet')">
                    <h1>
                        {{ store.user?.name }}
                    </h1>
                    <h2 v-html="unifiedToHTML(
                        store.user?.pronouns === 'neutro' ? 'Bem-vinde de volta 👋🏻' : 
                        store.user?.pronouns === 'ela/dela' ? 'Bem-vinda de volta 👋🏻' :
                        // default to ele/dele
                        `Bem-vindo de volta 👋🏻`)"></h2>
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
            <Button aria-label="Calendário" :only-icon="$viewport.isLessThan('tablet')" icon="calendario-alt">{{ $viewport.isGreaterOrEquals('tablet') ? 'Calendário' : '' }}</Button>
            <Button aria-label="Nova solicitação" :only-icon="$viewport.isLessThan('tablet')" icon="plus" primary>{{ $viewport.isGreaterOrEquals('tablet') ? 'Nova solicitação' : '' }}</Button>
        </section>
    </header>
</template>

<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app'
import { useUserStore } from '../../stores/user'
import { useLayoutStore } from '../../stores/layout'
import { useEmoji } from '../../composables/emoji';
const { unifiedToHTML } = useEmoji()

const layout = useLayoutStore();
const store = useUserStore()
const { $viewport } = useNuxtApp()

</script>
<style lang="scss">
header {
    & .container-avatar-intro {
        & .intro {
            & .emoji {
                animation: $emoji-fade-in;
                opacity: 0;
            }
        }
    }
}
</style>
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
            @include h1($size: 18px, $line-height: 24px, $spacing: -0.27px);
            color: $text-highlight;
            margin-bottom: 4px;
            margin-top: 0px;
        }
        & h2 {
            display: flex;
            @include h2($size: 14px, $line-height: 20px);
            margin-bottom: 0px;
            margin-top: 0px;
            display: block;
        }
    }
}
</style>