<template>
    <Card title="Destaque colaboradores" icon="destaque">
        <template #title-inner>
            <Button mini icon="enviar" @click="toggleGeralUser">Enviar</Button>
        </template>
        <template #card-inner>
            <div class="container">
                <div class="tabs-container">
                    <div class="tab-tracker" :style="{ left: tabTrackerLeft, width: tabTrackerWidth}"></div>
                    <div @click="activateTab(tabName)" :ref="(el) => setTabRef(el, tabName)" :class="`tab ${activeTab === tabName ? 'active' : ''}`" :key="tabName" v-for="(_, tabName) in tabsRefs">
                        {{ tabName }}
                    </div>
                </div>
                <template v-if="activeTab === null">
                    <div class="sem-destaque">
                        <nuxt-icon filled name="sem-destaque"/>
                        <h2>Sem registros do destaque do funcionário ainda. Por favor, verifique mais tarde.</h2>
                    </div>
                </template>
                <template v-if="activeTab === 'Geral'">
                    <div :class="{'destaque-top':true, active: !!tabsInfo[activeTab].user }">
                        <h1>
                            {{ tabsInfo[activeTab].user?.name }}
                        </h1>
                        <h2>
                            {{ tabsInfo[activeTab].user?.job }}
                        </h2>
                    </div>
                    <div class="content">
                        <div class="inner">
                            <nuxt-icon class="destaque-content" name="destaque-content" filled/>
                            <nuxt-icon class="destaque-content-inner-star" name="destaque-content-inner-star" filled/>
                            <nuxt-icon class="destaque-content-outer-star" name="destaque-content-outer-star" filled/>
                            <nuxt-img v-if="tabsInfo[activeTab].user" class="avatar" alt="Avatar Matthew Johnson" :src="tabsInfo[activeTab].user?.avatar"/>
                            <div class="flags">
                                <nuxt-icon class="left-flag" name="left-flag" filled/>
                                <nuxt-icon class="right-flag" name="right-flag" filled/>
                            </div>
                        </div>
                    </div>
                    <h2 class="destaque-description">
                        {{ tabsInfo[activeTab].description }}
                    </h2>
                </template>
                <template v-if="activeTab === 'Comentários'">
                    <div class="comments">
                        <div class="comment" :key="comment.id" v-for="(comment, index) in tabsInfo[activeTab].comments">
                            <div class="comment-container">
                                <section>
                                    <div class="avatar">
                                        <nuxt-img :src="comment.user.avatar" alt="avatar"/>
                                    </div>
                                    <div class="text">
                                        <h2>{{ comment.user.name }}</h2>
                                        <h1 class="message" v-html="`<span>${unifiedToHTML(comment.message)}</span>`"></h1>
                                    </div>
                                </section>
                                <div class="heart" @click="comment.liked = !comment.liked">
                                    <nuxt-icon :name="comment.liked ? 'heart-filled' : 'heart'" filled/>
                                </div>
                            </div>
                            <div v-if="index !== (tabsInfo[activeTab].comments?.length || 1) -1" class="divider">

                            </div>
                        </div>
                        <div class="comment-button">
                            <Button icon="comment">Comment</Button>
                        </div>
                    </div>
                </template>
                <template v-if="activeTab === 'Prêmios'">
                    <div class="destaque-top">
                        <h1>
                            Cartão presente de R$ 50,00
                        </h1>
                        <h2>
                            Aproveite o prêmio, {{ tabsInfo[activeTab].user?.name }}!
                        </h2>
                    </div>
                    <div class="content">
                        <div class="inner">
                            <nuxt-icon class="destaque-content" name="destaque-content" filled/>
                            <nuxt-icon class="destaque-content-inner-star" name="destaque-content-inner-star" filled/>
                            <nuxt-icon class="destaque-content-outer-star" name="destaque-content-outer-star" filled/>
                            <nuxt-img class="avatar gift" alt="gift" src="gift.png"/>
                            <div class="flags">
                                <nuxt-icon class="left-flag" name="left-flag" filled/>
                                <nuxt-icon class="right-flag" name="right-flag" filled/>
                            </div>
                        </div>
                    </div>
                    <h2 class="destaque-description">
                        Os funcionários do mês recebem recompensas
                    </h2>
                </template>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, computed, ref, watch, onMounted } from "vue";
import { type APIResponse, type Tab, type TabsInfo, type User } from "../server/crosstypes";
import { useEmoji } from '../composables/emoji';

const { unifiedToHTML } = useEmoji()
const activeTab = ref<string | null>('Geral');
type Ref = Element | ComponentPublicInstance | null;
type Refs = {
    [tabName: string]: Ref
};
const tabsRefs = ref<Refs>({
    'Geral': null,
    'Comentários': null,
    'Prêmios': null
});
const defaultUser = {
    name: 'Matthew Johnson',
    email: 'matthew@jurisoft.com',
    avatar: 'profile2.png',
    verified: true,
    job: 'Engenheiro de Software',
}
function toggleGeralUser() {
    activeTab.value = null
}

const tabsInfo = ref<TabsInfo>({
    'Geral': {
        description: 'Funcionário de melhor desempenho de dezembro!',
        user: defaultUser
    },
    'Comentários': {
        description: 'Funcionário mais comentado!',
        comments: [

        ]
    },
    'Prêmios': {
        description: 'Funcionário mais premiado!',
        user: null
    }
})
// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

function setTabRef(el: Ref, tabName: keyof Refs) {
    tabsRefs.value[tabName] = el;
}

// compute the 'width' of the tab-tracker, based on the width of the active tab
const tabTrackerWidth = computed(() => {
    if (activeTab.value === null) return '0%';
    const tab = tabsRefs.value[activeTab.value];
    const defaultWidth = `calc((100% / ${Object.keys(tabsRefs.value).length}) - 4px)`;
    if (!tab) return defaultWidth
    const foundWidth = (tab as HTMLElement).offsetWidth;
    return foundWidth > 0 ? foundWidth + 'px' : defaultWidth;
})

// compute the 'left' of the tab-tracker, based on the position of the active tab
const tabTrackerLeft = computed(() => {
    if (activeTab.value === null) return '0px';
    const tab = tabsRefs.value[activeTab.value];
    if (!tab) return '4px';
    return (tab as HTMLElement).offsetLeft + 'px';
})

function activateTab(tabName: string | number) {
    activeTab.value = tabName as string;
}

onMounted(() => {
    activateTab('Geral');

    $fetch('/api/highlights')
    .then((res: APIResponse<TabsInfo<Tab>>) => {
        const copyTabsInfo = { ...tabsInfo.value };
        tabsInfo.value = mergeDeep(copyTabsInfo, res.data);
    })
})
</script>
<style lang="scss">
.container {
    & .comment-container {
        & .message {
            & .emoji {
                animation: unset;
                opacity: 1;
            }
        }
    }
    & .comment-button {
        & button {
            width: 100%;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            align-self: self-end;
            & .icon {
                width: 13.478px;
                height: 13.478px;
                margin-right: 10px;
                display: flex;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    justify-content: space-between;

    & .comments {
        display: grid;
        gap: 16px;
    }
    & .sem-destaque {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        & .nuxt-icon {
            width: 108px;
            height: 108px;
        }
        & h2 {
            margin: unset;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.084px;
            color: $text-default;
            width: 100%;
            text-align: center;
            padding: 0 32px;
        }
    }
    & .destaque-description {
        height: 16px;
    }
    & .destaque-top.active, & .destaque-description, & .inner .avatar {
        animation: fadeIn 0.2s ease-in-out forwards;
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
    & h2 {
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
    height: 36px;
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
        animation: surge 0.6s ease-in-out forwards;
        @keyframes surge {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0px);
            }
        }
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
            &.gift {
                background: white;
                box-shadow: 0px -2px 0px 12px white, 0px -2px 0px 15px #e4a890;
            }
            z-index: 3;
        }
        & .flags {
            animation: surgeOnlyTranslateY 0.6s ease-in-out forwards;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 100%;
            transform: translate(0%, 10px);
            @keyframes surgeOnlyTranslateY {
                0% {
                    transform: translate(0%, -50px);
                }
                100% {
                    transform: translate(0%, -50%);
                }
            }
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

.comment {
    padding-bottom: 2px;
    &:last-child {
        padding-bottom: 4px;
    }
    & .comment-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        & .heart {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            & .icon {
                width: 24px;
                height: 24px;
            }
        }
        & .text {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 4px;
            & h2 {
                margin: unset;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px;
                height: 16px;
                color: $text-default;
                width: fit-content;
            }
            & .message {
                margin: unset;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: -0.084px;
                color: $text-highlight;
                width: 100%;
                text-align: left;
                height: fit-content;
                & span {
                    display: inline-block;
                    word-break: break-word;
                }
            }
        }
        & section {
            display: flex;
            align-items: center;
            gap: 12px;
            & .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                & img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    & .divider {
        width: 100%;
        height: 0px;
        background: $border;
        margin-top: calc(16px + 2px);
        position: relative;
        &::before {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            top: 0;
            left: 0;
            background: $border;
        }
    }
}
</style>