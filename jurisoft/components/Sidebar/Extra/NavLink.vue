<template>
    <li class="item">
        <nuxt-link :to="to" class="link" active-class="active">
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
        </nuxt-link>
    </li>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    icon: String,
    to: String,
})
</script>