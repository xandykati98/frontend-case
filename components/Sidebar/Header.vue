<template>
    <div class="container-header">
        <section>
            <div class="container-logo-intro">
                <div class="logo" @click="logoClick">
                    <nuxt-icon name="logo" filled/>
                </div>
                <div class="intro">
                    <h1>Jurisoft</h1>
                    <h2>Marketing Jurídico</h2>
                </div>
            </div>
            <div v-if="!mobileActive" class="caret" @click="caretClick">
                <nuxt-icon name="caret-down" filled/>
            </div>
        </section>
        <div class="divider"></div>
    </div>
</template>
<script setup lang="ts">
import { useLayoutStore } from '../../stores/layout'

const layout = useLayoutStore();
const logoClick = () => {
    layout.maximize();
}

function caretClick() {
    layout.minimize();
}

defineProps({
    mobileActive: Boolean
})
</script>
<style lang="scss" scoped>
.minimized {
    .container-header {
        padding: 0px;
        padding-top: 12px;
        justify-content: center;
        & section {
            justify-content: center;
            & .container-logo-intro {
                & .logo {
                    margin-right: 0px;
                }
            }
            & .intro {
                display: none;
            }
            & .caret {
                display: none;
            }
        }
        & .divider {
            width: 40px;
        }
    }
}
.container-header {
    width: 100%;
    height: 88px;
    padding: 12px;
    padding-bottom: 0px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    transition: $sidebar-transition;
    align-content: space-between;
    & section {
        width: 100%;
        margin: 12px;
        display: flex;
        justify-content: space-between;
        & .container-logo-intro {
            display: flex;
            justify-content: flex-start;
            & .logo {
                margin-right: 12px;
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
        }
        & .intro {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            height: 100%;
            flex-direction: column;
            transition: $sidebar-transition;
        }
        & .intro h1 {
            @include h1;
            margin-bottom: 4px;
        }
        & .intro h2 {
            @include h2($spacing: 0px);
        }
        & .caret {
            width: 24px;
            height: 24px;
            @include flexCenter;
            align-self: center;
            cursor: pointer;
            transition: $sidebar-transition;
        }
    }
}
.divider {
    width: 232px;
    display: flex;
    height: 1px;
    background: $border;
}
</style>