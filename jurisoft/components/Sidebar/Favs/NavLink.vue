<template>
    <NuxtLink :to="to" class="link" active-class="active">
        <li class="item">
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
        </li>
    </NuxtLink>
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
    & .link {
        width: 40px;
        & .item {
            justify-content: center;
            & .contents {
                & .title {
                    display: none;
                }
            }
            & .command {
                display: none;
            }
        }
    }
}
.link {
    display: flex;
    width: 100%;
    padding: 8px 12px;
    align-items: center;
    text-decoration: none;
    border-radius: 8px;
    & .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .contents {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            & .ball {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin: 12px;
            }
            & .title {
                color: $text-default;
                font-family: Inter;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 20px;
                letter-spacing: -0.084px;
            }
        }
        & .command {
            padding: 0px 6px;
            border-radius: 4px;
            border: 1px solid #E2E4E9;
            display: flex;
            align-items: center;
            color: $text-light;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: -0.084px;
            height: 20px;
        }
    }
    &:hover {
        background-color: $highlight-bg;
    }
}
</style>