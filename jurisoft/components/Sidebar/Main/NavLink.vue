<template>
    <NuxtLink :to="to" class="link" active-class="active">
        <li class="item">
            <div class="contents">
                <div class="icon">
                    <SvgIcon :name="icon"  height="20" width="20"/>
                </div>
                <span class="title">
                    {{ title }}
                </span>
            </div>
            <div class="caret">
                <SvgIcon name="caret-right" height="20" width="20"/>
            </div>
        </li>
    </NuxtLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps(['title', 'icon', 'to', 'height', 'width']);
</script>

<style lang="scss" scoped>
$highligh-bg: #F6F8FA;
.link {
    padding: 8px 12px 8px 12px;
    text-decoration: none!important;
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    position: relative;
    margin-bottom: 4px;
    & .item {
        display: flex;
        width: 100%;
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
            justify-self: end;
            transform: translateX(-10px);
            opacity: 0;
            transition: all 0.2s ease-in-out;
        }
    }
    &:hover {
        background: $highligh-bg;
    }
    &.active {
        background: $highligh-bg;
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
.link:hover {
    & .caret {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>