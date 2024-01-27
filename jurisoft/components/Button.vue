<template>
    <button :style="style || ''" :class="(primary ? 'primary' : 'default') + ' ' + (mini ? 'mini' : '')">
        <nuxt-icon :name="icon" v-if="icon" class="icon" />
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps({
    icon: String,
    style: String,
    primary: Boolean,
    mini: Boolean
})
</script>
<style lang="scss" scoped>
button {
    border-radius: $button-radius;
    padding: 10px;
    &.mini {
        height: 32px;
    }
    &.primary {
        background: $primary;
        color: $bg;
        box-shadow: 0px 1px 2px 0px rgba(55, 93, 251, 0.08);
        &:hover {
            background: $primary-hover;
        }
    }
    &.default {
        box-shadow: 0px 1px 2px 0px rgba(82, 88, 102, 0.06);
        color: $text-default;
        background: $bg;
        border: 1px solid $border;
        &:hover {
            background: $highlight-bg;
        }
    }
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0px;
    width: fit-content;
    height: fit-content;
    font-weight: 500;
    & .icon {
        margin-right: 4px;
        width: 20px;
        height: 20px;
    }
}
</style>