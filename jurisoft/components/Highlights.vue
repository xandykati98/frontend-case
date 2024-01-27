<template>
    <Card title="Destaque colaboradores" icon="destaque">
        <template #title-inner>
            <Button mini icon="enviar">Enviar</Button>
        </template>
        <template #card-inner>
            <div class="container">
                <div class="tabs-container">
                    <div class="tab-tracker" :style="{ left: tabTrackerLeft, width: tabTrackerWidth}"></div>
                    <div @click="activateTab(tabName)" :ref="(el) => setTabRef(el, tabName)" :class="`tab ${activeTab === tabName ? 'active' : ''}`" :key="tabName" v-for="(_, tabName) in tabsRefs">
                        {{ tabName }}
                    </div>
                </div>
                <div>
                    <h1>
                        Matthew Johnson
                    </h1>
                    <h3>
                        Engenheiro de Software
                    </h3>
                </div>
                <div class="content">
                    <div class="inner">
                        <nuxt-icon class="destaque-content" name="destaque-content" filled/>
                        <nuxt-icon class="destaque-content-inner-star" name="destaque-content-inner-star" filled/>
                        <nuxt-icon class="destaque-content-outer-star" name="destaque-content-outer-star" filled/>
                        <nuxt-img class="avatar" alt="Avatar Matthew Johnson" src="profile2.png"/>
                        <nuxt-icon class="left-flag" name="left-flag" filled/>
                        <nuxt-icon class="right-flag" name="right-flag" filled/>
                    </div>
                </div>
                <h3 class="destaque-description">
                    Funcionário de melhor desempenho de dezembro!
                </h3>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, computed, ref } from "vue";

const activeTab = ref<string>('Geral');
type Ref = Element | ComponentPublicInstance | null;
type Refs = {
    [tabName: string]: Ref
}
const tabsRefs = ref<Refs>({
    'Geral': null,
    'Comentários': null,
    'Prêmios': null
});	

function setTabRef(el: Ref, tabName: keyof Refs) {
    tabsRefs.value[tabName] = el;
}

// compute the 'width' of the tab-tracker, based on the width of the active tab
const tabTrackerWidth = computed(() => {
    const tab = tabsRefs.value[activeTab.value];
    if (!tab) return `calc((100% / ${Object.keys(tabsRefs.value).length}) - 4px)`;
    return (tab as Element).clientWidth + 'px';
})

// compute the 'left' of the tab-tracker, based on the position of the active tab
const tabTrackerLeft = computed(() => {
    const tab = tabsRefs.value[activeTab.value];
    if (!tab) return '4px';
    return (tab as HTMLElement).offsetLeft + 'px';
})

function activateTab(tabName: string | number) {
    activeTab.value = tabName as string;
}
</script>

<style lang="scss" scoped>
.container {
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    & .destaque-description {
        height: 16px;
    }
    & h1 {
        margin: unset;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        height: 24px;
        letter-spacing: -0.27px;
        margin-bottom: 6px;
        width: 100%;
        text-align: center;
    }
    & h3 {
        margin: unset;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        height: 20px;
        letter-spacing: -0.084px;
        color: $text-default;
        width: 100%;
        text-align: center;
    }
}
.tabs-container {
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    border-radius: 6px;
    background: $highlight-bg;
    position: relative;
    & .tab-tracker {
        transition: all 0.2s ease-in-out;
        position: absolute;
        top: 4px;
        left: 0;
        width: 0;
        height: 28px;
        border-radius: 6px;
        background: $bg;
        box-shadow: 0px 2px 4px 0px rgba(27, 28, 29, 0.02), 0px 6px 10px 0px rgba(27, 28, 29, 0.06);
        z-index: 2;
    }
    & .tab {
        cursor: pointer;
        display: flex;
        padding: 4px 2px;
        justify-content: center;
        align-items: center;
        gap: 6px;
        flex: 1 0 0;
        border-radius: 6px;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; 
        letter-spacing: -0.084px;
        color: $text-default;
        transition: color 0.2s ease-in-out;
        z-index: 3;
        user-select: none;
        &.active {
            color: $text-highlight;
        }
    }
}
.content {
    width: 100%;
    & .inner {
        position: relative;
        width: 100%;
        height: 148px;
        & .destaque-content-inner-star {
            z-index: 2;
        }
        & .destaque-content-inner-star, & .destaque-content-outer-star, & .avatar, & .left-flag, & .right-flag {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        & .avatar {
            width: 72px;
            height: 72px;
            box-shadow: 0px 0px 0px 12px white, 0px 0px 0px 15px #e4a890;
            border-radius: 50%;
            z-index: 3;
        }
        & .left-flag {
            z-index: 1;
            right: calc(50% + 15px);
            transform: translate(0%, -50%);
            left: unset;
            height: 32px;
            width: fit-content;
        }
        & .right-flag {
            z-index: 1;
            left: calc(50% + 15px);
            transform: translate(0%, -50%);
            right: unset;
            height: 32px;
            width: fit-content;
        }
    }
}
</style>