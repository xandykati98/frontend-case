<template>
    <Card title="Rastreador de tempo" icon="rastreador">
        <template #title-inner>
            <Button mini icon="historico" @click="toggleTracks">Histórico</Button>
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
                        <span class="title">{{ toTimeString(tracks[activeTrack].timeMs, true) }}<span>:{{ toTimeStringObject(tracks[activeTrack].timeMs).seconds }}</span></span>
                    </section>
                    <button @click="toggleRunning" v-if="!running">
                        <nuxt-icon name="play"/>Iniciar
                    </Button>
                    <div class="running" v-else>
                        <button @click="toggleRunning" class="pause">
                            <nuxt-icon name="pause"/>Pausar
                        </button>
                        <div class="divider"></div>
                        <button @click="resetRunning" class="stop">
                            <nuxt-icon name="stop"/>Parar
                        </button>
                    </div>
                </div>
            </div>
            <div class="bottom-tracker">
                <div v-if="tracks.filter((_, i) => activeTrack !== i).length">
                    <span class="title">Tarefas Anteriores</span>
                    <ul class="select-track-list">
                        <li :key="track.title" class="select-track" v-for="track in tracks.filter((_, i) => activeTrack !== i)">
                            <section @click="activateTrack(track)">
                                <div class="select-icon">
                                    <nuxt-icon :name="track.icon" filled/>
                                </div>
                                <div>
                                    <span class="title">{{ track.title }}</span>
                                    <h2 class="subtitle">{{ toTimeString(track.timeMs) }}</h2>
                                </div>
                            </section>
                            <div class="config">
                                <nuxt-icon name="config"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else class="empty">
                    <nuxt-icon name="atividades-vazio" filled/>
                    <h2 class="subtitle">Sem registro de atividades</h2>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
const running = ref(false);
const interval = ref<NodeJS.Timeout | null>(null);
const activeTrack = ref(0);

/**
 * @description Inicia ou pausa o rastreador de tempo
 */
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
/**
 * @description Alterna entre as tarefas
 */
function toggleTracks() {
    if (tracks.value.length === 1) {
        tracks.value = defaultTracks;
    } else {
        tracks.value = [defaultTracks[0]];
    }
}
/**
 * @description Reseta o rastreador de tempo
 */
function resetRunning() {
    tracks.value[activeTrack.value].timeMs = 0;
    if (running.value) {
        toggleRunning();
    }
}

type Track = {
    icon: string;
    title: string;
    timeMs: number;
}
const defaultTracks = [
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
]

const tracks = ref<Track[]>(defaultTracks)

/**
 * @description Converte milissegundos para um objeto de tempo
 * @param timeMs Tempo em milissegundos
 */
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
/**
 * @description Converte milissegundos para uma string de tempo
 * @param timeMs Tempo em milissegundos
 * @param justHoursAndMinutes Se verdadeiro, retorna apenas horas e minutos
 */
function toTimeString(timeMs: number, justHoursAndMinutes = false) {
    const { hours, minutes, seconds } = toTimeStringObject(timeMs);
    if (justHoursAndMinutes) {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}
/**
 * @description Ativa uma tarefa
 * @param track Tarefa a ser ativada
 */
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
    box-shadow: $default-shadow;
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
            & .title {
                @include title($size: 40px, $line-height: 48px, $spacing: -0.4px);
                height: 48px;
                & span {
                    color: $text-default;
                }
            }
        }
        
        & .running {
            display: flex;
            gap: 16px;
            position: relative;
            align-items: center;
            & .divider {
                width: 1px;
                height: 12px;
                background: $border;
            }
            & .pause {
                padding: 0px;
                color: $text-highlight;
                &:hover {
                    color: $text-highlight-off;
                }
            }
            & .stop {
                padding: 0px;
                color: $error;
                &:hover {
                    color: $error-off;
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
            gap: 7px;
            padding-top: 0px;
            padding-bottom: 0px;
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
            @include flexCenter;
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
    & .empty {
        display: flex;
        gap: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 11px 0px;
        & > .nuxt-icon {
            display: flex;
            width: 72px;
            height: 72px;
        }
        & .subtitle {
            @include subtitle($line-height: 20px);
        }
    }
    & > .title {
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
                .title, .subtitle {
                    margin: unset;
                }
                .title {
                    @include title($weight: 400);
                    color: $text-highlight;
                    margin-bottom: 4px;
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