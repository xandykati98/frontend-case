<template>
    <div :class="'card ' + ($props.containerClass || '')">
        <div class="title">
            <section>
                <nuxt-icon :name="icon || ''" />
                <h1>{{ title }}</h1>
            </section>
            <slot name="title-inner"/>
        </div>
        <slot name="card-inner"/>
    </div>
</template>
<script setup lang="ts">
defineProps({
    title: String,
    icon: String,
    containerClass: String,
})
</script>
<style lang="scss" >
.card {
    & .title {
        & button {
            padding: 6px 8px!important;
        }
    }
}
</style>
<style lang="scss" scoped>
.card {
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex-shrink: 0;
    border-radius: 16px;
    background: $bg;
    /** não utilizei "border" pois uma "height" precisa ser determinada para o "box-sizing: border-box" fazer efeito */
    box-shadow: $default-shadow, 0px 0px 0px 1px $border;
    & .title {
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        & section {
            display: flex;
            align-items: center;
            gap: 8px;
            & h1 {
                text-align: left;
                padding-right: 10px;
                @include h1($size: 16px, $line-height: 24px, $spacing: 0px);
            }
            & .nuxt-icon {
                width: 24px;
                height: 24px;
                color: $text-default;
            }
        }
    }
}
</style>