<template>
    <header>
        <section>
            <div class="container-avatar-intro">
                <div class="avatar">
                    <NuxtImg :src="store.user?.avatar" alt="avatar"/>
                </div>
                <div class="intro">
                    <h1>
                        {{ store.user?.name }}
                    </h1>
                    <h3>Bem-vinda de volta 👋🏻</h3>
                </div>
            </div>
        </section>
    </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user'
const store = useUserStore()
</script>

<style lang="scss" scoped>
header {
    background: $bg;
    padding: 20px 32px;
    width: 100%;
    height: 88px;
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
            font-family: Inter;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.084px;
            color: $text-default;
            margin-bottom: 0px;
            margin-top: 0px;
        }
    }
}
</style>