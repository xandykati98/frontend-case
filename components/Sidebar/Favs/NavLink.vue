<template>
    <li class="item">
        <nuxt-link :to="to" class="link" active-class="active">
            <div class="contents">
                <div class="ball" :style="`background-color: ${color}`">
                    
                </div>
                <span class="title">
                    {{ title }}
                </span>
            </div>
            <div class="command">
                {{ command }}
            </div>
        </nuxt-link>
    </li>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    to: String,
    color: String,
    command: String,
})
</script>

<style lang="scss" scoped>
.minimized {
    & .item {
        & .command {
            display: none;
        }
    }
}
.item {
    & .link.active:not(:hover) {
        background: $bg!important;
    }
    & .contents {
        & .ball {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin: 6px;
        }
    }
    & .command {
        padding: 0px 6px;
        border-radius: 4px;
        border: 1px solid $border;
        display: flex;
        align-items: center;
        color: $text-light;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.084px;
        height: 20px;
        width: 38px;
        white-space: nowrap;
    }
}
</style>