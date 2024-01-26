<template>
    <div class="container-profile" @click="store.loadUser">
        <div class="divider"></div>
        <NuxtLink to="#">
            <section>
                <div class="container-avatar-intro">
                    <div class="avatar">
                        <NuxtImg :src="store.user?.avatar" alt="avatar"/>
                    </div>
                    <div class="intro">
                        <h1>
                            {{ store.user?.name }} <svg-icon name="verified" width="20" height="20"/>
                        </h1>
                        <h3>{{ store.user?.email }}</h3>
                    </div>
                </div>
                <div class="caret">
                    <svg-icon name="caret-right" width="20" height="20"/>
                </div>
            </section>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user'
const store = useUserStore()
</script>

<style lang="scss" scoped>
.minimized {
    & .container-profile {
        padding: 0px;
        padding-top: 12px;
        justify-content: center;
        & .divider {
            width: 40px;
        }
        & a {
            display: flex;
            & section {
                justify-content: center;
                & .container-avatar-intro {
                    & .avatar {
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
        }
    }

}
.container-profile {
    width: 100%;
    height: 88px;
    padding: 12px;
    padding-bottom: 0px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    transition: $sidebar-transition;
    & a {
        text-decoration: none;
    }
    & section {
        width: 100%;
        margin: 12px;
        display: flex;
        justify-content: space-between;
        
        & .container-avatar-intro {
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
        }
        & .intro {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            height: 100%;
            flex-direction: column;
        }
        & .intro h1 {
            color: $text-highlight;
            font-weight: 500;
            font-size: 14px;
            margin: unset;
            margin-bottom: 4px;
            line-height: 20px; /* 142.857% */
            letter-spacing: -0.084px;
            display: flex;
            align-items: center;
        }
        & .intro h3 {
            color: $text-default;
            font-weight: 400;
            font-size: 12px;
            margin: unset;
            line-height: 16px;
        }
        & .caret {
            width: 20px;
            height: 20px;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            cursor: pointer;
            box-sizing: content-box;
        }
    }
}
.divider {
    border-top: 1px solid #E2E4E9;
    height: 0px;
    width: 232px;
    display: flex;
}
</style>