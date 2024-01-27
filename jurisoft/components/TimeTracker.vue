<template>
    <Card title="Rastreador de tempo" icon="rastreador">
        <template #title-inner>
            <Button mini icon="historico">Histórico</Button>
        </template>
        <template #card-inner>
            <div class="timer">
                <div class="timer-title">
                    <section>
                        <nuxt-icon :name="tracks[activeTrack].icon" filled/>
                        Track App
                    </section>
                    <div class="timer-expand">
                        <nuxt-icon name="caret-down"/>
                    </div>
                </div>
                <div class="timer-inner">
                    <section>
                        <div>
                            AGUARDANDO
                        </div>
                        <h1>{{ toTimeString(tracks[activeTrack].timeMs, true) }}<span>:{{ toTimeStringObject(tracks[activeTrack].timeMs).seconds }}</span></h1>
                    </section>
                    <button :class="running ? 'running' : ''" @click="toggleRunning">
                        <nuxt-icon :name="running ? 'pause' : 'play'"/>{{running ? 'Pausar' : 'Iniciar'}}
                    </Button>
                </div>
            </div>
            <div class="bottom-tracker">
                <span>Tarefas Anteriores</span>
                <ul class="select-track-list">
                    <li :key="track.title" class="select-track" v-for="track in tracks.filter((_, i) => activeTrack !== i)">
                        <section @click="activateTrack(track)">
                            <div class="select-icon">
                                <nuxt-icon :name="track.icon" filled/>
                            </div>
                            <div>
                                <h1>{{ track.title }}</h1>
                                <h3>{{ toTimeString(track.timeMs) }}</h3>
                            </div>
                        </section>
                        <div class="config">
                            <nuxt-icon name="config"/>
                        </div>
                    </li>
                </ul>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
const running = ref(false);
const interval = ref<NodeJS.Timeout | null>(null);
const activeTrack = ref(0);

function toggleRunning() {
    running.value = !running.value;
    if (interval.value && running.value) {
        // fazer uma request para o servidor adicionando o tempo no banco de dados
        return clearInterval(interval.value);
    }
    const cancel = setInterval(() => {
        if (running.value) {
            tracks.value[activeTrack.value].timeMs += 1000;
        }
    }, 1000);
    interval.value = cancel;
}
type Track = {
    icon: string;
    title: string;
    timeMs: number;
}
const tracks = ref<Track[]>([
    {
        icon: 'monday',
        title: 'Monday.com Onboarding',
        //0:00:00
        timeMs: 0,
    },
    {
        icon: 'loom',
        title: 'Loom Rebranding',
        //1:23:05
        timeMs: 4985000,
    },
    {
        icon: 'evernote',
        title: 'Evernote App Redesign',
        //3:14:26
        timeMs: 11666000,
    }
])
function toTimeStringObject(timeMs: number) {
    const hours = Math.floor(timeMs / 3600000);
    const minutes = Math.floor((timeMs - hours * 3600000) / 60000);
    const seconds = Math.floor((timeMs - hours * 3600000 - minutes * 60000) / 1000);
    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
    };
}
function toTimeString(timeMs: number, justHoursAndMinutes = false) {
    const { hours, minutes, seconds } = toTimeStringObject(timeMs);
    if (justHoursAndMinutes) {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}
function activateTrack(track: Track) {
    if (running.value) {
        toggleRunning();
    }
    activeTrack.value = tracks.value.indexOf(track);
}
</script>

<style lang="scss" scoped>
.timer {
    width: 100%;
    height: 158px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    background: $bg;
    border: 1px solid $border;
    border-radius: 10px;
    border: 1px solid $border;
    background: $bg;
    box-shadow: 0px 1px 2px 0px rgba(228, 229, 231, 0.24);
    overflow: hidden;
    & .timer-inner {
        width: 100%;
        display: flex;
        padding: 16px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1 0 0;
        align-self: stretch;
        & section {
            display: grid;
            gap: 4px;
            & div {
                color: $text-default;
                font-size: 11px;
                font-style: normal;
                font-weight: 500;
                line-height: 12px;
                height: 12px;
                letter-spacing: 0.22px;
                text-transform: uppercase;
                text-align: center;
            }
            & h1 {
                font-size: 40px;
                font-style: normal;
                font-weight: 500;
                line-height: 48px;
                height: 48px;
                letter-spacing: -0.4px;
                margin: unset;
                & span {
                    color: $text-default;
                }
            }
        }
        & button {
            color: $primary;
            background: unset;
            border: unset;
            outline: unset;
            cursor: pointer;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: -0.084px;
            display: flex;
            align-items: center;
            gap: 4px;
            padding-top: 0px;
            padding-bottom: 0px;
            &.running {
                color: $text-default;
                &:hover {
                    color: $text-default;
                }
            }
            & .nuxt-icon {
                width: 20px;
                height: 20px;
                display: flex;
            }
            &:hover {
                color: $primary-hover;
            }
        
        }
    }
    & .timer-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: $highlight-bg;
        border-bottom: 1px solid $border;
        height: 32px;
        padding: 6px 10px 6px 12px;
        & section {
            display: flex;
            gap: 8px;
            align-items: center;
            & > .nuxt-icon {
                width: 20px;
                height: 20px;
            }
            & > span {
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 20px;
                letter-spacing: -0.084px;
                color: $text-default;
            }
        }
        & .timer-expand {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            & > .nuxt-icon {
                width: 20px;
                height: 20px;
            }
        }
    }

}
.bottom-tracker {
    width: 100%;
    margin-bottom: 4px;
    & > span {
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
        height: 12px;
        display: block;
        letter-spacing: 0.22px;
        text-transform: uppercase;
        color: $text-default;
    }
    & .select-track-list {
        list-style: none;
        padding: unset;
        width: 100%;
        gap: 16px;
        margin: 14px 0 0 0;
        display: flex;
        flex-direction: column;
        & .select-track {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .config {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                &:hover {
                    background: $highlight-bg;
                }
                & .nuxt-icon {
                    color: $text-default;
                    width: 20px;
                    height: 20px;
                }
            }
            & section {
                cursor: pointer;
                display: flex;
                gap: 10px;
                h1, h3 {
                    margin: unset;
                }
                h1 {
                    font-family: Inter;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 20px;
                    letter-spacing: -0.084px;
                    color: $text-highlight;
                    margin-bottom: 4px;
                }
                h3 {
                    font-family: Inter;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    color: $text-default;
                }
            }
            & .select-icon {
                padding: 8px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid $border;
                display: grid;
                justify-content: center;
                align-content: center;
                & > .nuxt-icon {
                    display: flex;
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
}
</style>