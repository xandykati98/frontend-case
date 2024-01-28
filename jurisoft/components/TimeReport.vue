<template>
    <Card :containerClass="loading ? 'loading' : ''" title="Horas diárias de trabalho" icon="relogio">
        <template #title-inner>
            <Button mini @click="details = !details">{{details ? 'Ocultar' : 'Detalhes'}}</Button>
        </template>
        <template #card-inner>
            <div class="divider"></div>
            <div class="to-text">
                <h2><b>{{ totalHours }}</b> horas <b>{{ totalMinutes }}</b> minutos no total <span class="time-emoji" v-html="unifiedToHTML('⏳')"></span></h2>
            </div>
            <div :class="{ 'bars-container': true, detailed: details }">

                <div class="bar" v-for="(value, key) in report.tags" :key="key" :style="{ width: (value / report.total * 100) + '%', background: colors[key] }">
                    <div class="bar-text">
                        <h2>{{ Math.floor(value / 1000 / 60 / 60) }}h {{ Math.floor(value / 1000 / 60) % 60 }}m</h2>
                    </div>
                </div>
            </div>
            <div class="tags-container">
                <div class="tag" v-for="(value, key) in report.tags" :key="key">
                    <div class="tag-color" :style="{ background: colors[key] }"></div>
                    <div class="tag-text">
                        <h2>{{ key }}</h2>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue"
import { useEmoji } from "../composables/emoji";
import { type APIResponse, type TimeReport } from "../server/crosstypes";
const { unifiedToHTML } = useEmoji()

const details = ref(false);

const colors = {
    Descanso: '#F2AE40',
    Ativo: '#35B9E9',
    'Hora extra': '#6E3FF3'
}

const report = ref<TimeReport>({
    total: 0,
    tags: {
        Descanso: 0,
        Ativo: 0,
        'Hora extra': 0
    },
})
const loading = ref(true);

const totalHours = computed(() => {
    return Math.floor(report.value.total / 1000 / 60 / 60)
})

const totalMinutes = computed(() => {
    return Math.floor(report.value.total / 1000 / 60) % 60
})

$fetch('/api/time_report')
    .then(async (res:APIResponse<TimeReport>) => {
        report.value = res.data
        loading.value = false;
    })
    .catch((err) => {
        console.error(err)
    })
</script>
<style lang="scss">
.to-text {
    & .time-emoji {
        & .emoji {
            animation: $emoji-fade-in;
            opacity: 0;
        }
    }
}
</style>
<style lang="scss" scoped>
.divider {
    width: 100%;
    position: relative;
    height: 0px;
    &::before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: $border;
    }
}
.loading {
    & .to-text {
        & h2 {
            & b {
                color: $text-highlight-off;
            }
            color: $text-default-off;
        }
    }
    & .bars-container {
        & .bar {
            background-color: $disabled!important;
            width: 100%;
        }
    }
    & .tags-container {
        & .tag {
            & .tag-color {
                background-color: $disabled!important;
                color: $disabled!important;
            }
        }
    }
}
.tags-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    & .tag {
        display: flex;
        align-items: center;
        gap: 4px;
        & .tag-color {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin: 4px;
            transition: all 0.2s ease-in-out;
            border: 2px solid $bg;
            box-shadow: 0px 2px 4px 0px rgba(27, 28, 29, 0.039);
            box-sizing: content-box;
        }
        & .tag-text {
            & h2 {
                @include h2($size: 12px, $spacing: 0px);
                color: $text-default;
            }
        }
    }
}
.bars-container {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: stretch;
    gap: 6px;
    &.detailed {
        & .bar {
            height: 30px;
            & .bar-text {
                & h2 {
                    opacity: 1;
                }
            }
        }
    }
    & .bar {
        height: 10px;
        background-color: $text-default;
        position: relative;
        border-radius: 2px;
        transition: all 0.2s ease-in-out, width 1s ease-in-out;
        width: 0px;
        & .bar-text {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
            & h2 {
                font-size: 14px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 12px;
                letter-spacing: 0.22px;
                margin: unset;
                transition: all 0.1s ease-in-out;
                opacity: 0;
            }
        }
    }
}
.to-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 24px;
    & .time-emoji {
        & > span {
            animation: $emoji-fade-in;
            opacity: 0;
        }
    }
    & h2 {
        display: flex;
        align-items: center;
        @include h2($size: 16px, $line-height: inherit, $spacing: 0px);
        gap: 4px;
        & b {
            font-weight: 500;
            color: $text-highlight;
        }
        color: $text-default;
        display: flex;
        align-items: center;
        & img {
            width: 16px;
            height: 16px;
            margin: 0px 4px;
        }
    }
}
</style>
