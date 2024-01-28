<template>
    <Card :containerClass="progress === 0 ? 'loading' : ''" title="Cursos - Progresso" icon="livro">
        <template #title-inner>
            <Button mini @click="toggleProgress">Ver todos</Button>
        </template>
        <template #card-inner>
            <div class="divider"></div>
            <div class="progress-container">
                <div class="progress-circular" :style="{ background: `
                    radial-gradient(closest-side, white 83%, transparent 80% 100%),
                    conic-gradient(${progress === 100 ? '#14AB86' : '#FF4A00'} ${progress}%, #E2E4E9 0)
                `}">
                    {{ progress.toFixed(0) }}%
                </div>
                <div :class="{ 'progress-text': true, complete: progress === 100 }">
                    <h1>{{ progress > 0 ? 'Diversidade da equipe' : 'Nenhum curso em andamento'}}</h1>
                    <p>{{ progress > 0 ? 'Projetado para promover a inclusividade e perspectivas diversas.' : 'Não há progresso em nenhum curso ainda. Considere se inscrever em um.'}}</p>
                    <nuxt-link to="#" @click="fullfillProgress">{{ progress === 100 ? 'Curso completo!' : progress > 0 ? 'Retomar curso' : 'Inscrever-se'}}</nuxt-link>
                </div>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type APIResponse } from "../server/crosstypes";
import gsap from 'gsap';

const progress = ref(0);

function toggleProgress() {
    gsap.to(progress, { duration: 0.5, value: progress.value === 25 ? 0 : 25 })
}
function fullfillProgress() {
    gsap.to(progress, { duration: 0.5, value: 100 })
}
onMounted(() => {
    $fetch('/api/course_progress')
    .then((res: APIResponse<number>) => {
        gsap.to(progress, { duration: 0.5, value: Number(res.data) || 0 })
    })
    .catch((err) => {
        console.error(err);
    })
})

</script>
<style lang="scss" scoped>
.loading {
    & .progress-container {
        & .progress-text {
            & h1 {
                color: $text-default;
            }
        }
    }
}
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
.progress-container {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 2px;
    .progress-circular {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.084px;
        transition: all 0.2s ease-in-out;
    }    
    .progress-text {
        width: calc(100% - 80px - 20px);
        &.complete {
            a {
                color: $text-default;
            }
        }
        h1 {
            @include h1($line-height: 16px, $spacing: 0px);
            margin-bottom: 4px;
        }
        p {
            @include h2($size: 12px, $spacing: 0px);
            color: $text-default;
            margin-bottom: 8px;
        }
        a {
            margin: unset;
            font-size: 12px;
            font-weight: 400;
            color: $primary;
            line-height: 16px;
            text-decoration: underline;
        }
    }
}
</style>