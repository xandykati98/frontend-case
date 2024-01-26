<template>
    <nuxt-link :to="to" class="link" active-class="active">
        <li class="item">
            <div class="contents">
                <div class="icon">
                    <nuxt-icon :name="icon || ''" />
                </div>
                <span class="title">
                    {{ title }}
                </span>
            </div>
            <div class="caret">
                <nuxt-icon name="caret-right" filled/>
            </div>
        </li>
    </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    icon: String,
    to: String,
})
</script>

<style lang="scss" scoped>
.minimized {
    & .link {
        width: fit-content;
        & .item {
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
.link {
    padding: 8px 12px 8px 12px;
    text-decoration: none!important;
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    position: relative;
    height: 36px;
    align-self: center;
    & .item {
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
            width: 20px;
            height: 20px;
        }
    }
    &:hover {
        background: $highlight-bg;
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
.link:hover {
    & .caret {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>