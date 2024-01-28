<template>
    <div class="input-container">
        <nuxt-icon v-if="icon" :name="icon"/>
        <input type="text" :placeholder="placeholder" :value="value" @input="emitInput">
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits()

defineProps({
    icon: String,
    placeholder: String,
    value: String,
})

function emitInput(event : Event) {
    emit('input', (event.target as HTMLInputElement)?.value)
}
</script>

<style lang="scss" scoped>

.input-container {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    border-radius: 8px;
    background: $bg;
    border: 1px solid $border;
    box-shadow: $default-shadow;
    padding: 6px 6px 6px 8px;
    & input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: $text-default;
        letter-spacing: -0.084px;
    }
    & .nuxt-icon {
        width: 20px;
        height: 20px;
        display: flex;
        color: $text-default;
    }
}
</style>