<template>
    <div class="container-profile" @click="store.loadUser">
        <nuxt-link to="user" active-class="active">
            <section>
                <div class="container-avatar-intro">
                    <div class="avatar">
                        <nuxt-img :src="store.user?.avatar" alt="avatar"/>
                        <nuxt-icon class="verified-2" v-if="layout.isMinimized" filled name="verified2"/>
                    </div>
                    <div class="intro">
                        <h1>
                            {{ store.user?.name }} <nuxt-icon class="verified" filled name="verified"/>
                        </h1>
                        <h2>{{ store.user?.email }}</h2>
                    </div>
                </div>
                <div class="caret">
                    <nuxt-icon name="caret-right" filled/>
                </div>
            </section>
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user'
import { useLayoutStore } from '../../stores/layout';
const layout = useLayoutStore();
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
                        position: relative;
                        & .verified-2 {
                            width: 28px;
                            height: 28px;
                            filter: drop-shadow($mini-shadow);
                            position: absolute;
                            top: 0px;
                            left: calc(100% - 12px - 5px);
                        }
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
        &.active {
            & section {
                & .container-avatar-intro {
                    & .avatar {
                        background-color: $bg;
                        & img {
                            box-shadow: 0 0 0 2px white, 0 0 0 4px $primary;
                            border-radius: 50%;
                        }
                    }
                }
            }
        
        }
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
            @include h1;
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            & .verified {
                width: 20px;
                height: 20px;
            }
        }
        & .intro h2 {
            @include h2($spacing: 0px);
        }
        & .caret {
            width: 20px;
            height: 20px;
            padding: 2px;
            @include flexCenter;
            align-self: center;
            cursor: pointer;
            box-sizing: content-box;
        }
    }
}
</style>