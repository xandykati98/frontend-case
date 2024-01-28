<template>
    <Card title="Feedback diário" icon="feedback">
        <template #card-inner>
            <div class="divider"></div>
            <div class="feedback-top">
                <div class="smile">
                    <nuxt-icon name="smile"/>
                </div>
                <section>
                    <h1>
                        Como você classificaria seu humor hoje?
                    </h1>
                    <h2>
                        Compartilhe seu humor para nos ajudar a entender.
                    </h2>
                </section>
            </div>
            <div class="mood-selector">
                <div class="moods">
                    <div :class="{
                        mood: true, active: mood === '😔'
                    }" @click="mood = '😔'" v-html="unifiedToHTML('😔')"></div>
                    <div :class="{
                        mood: true, active: mood === '😕'
                    }" @click="mood = '😕'" v-html="unifiedToHTML('😕')"></div>
                    <div :class="{
                        mood: true, active: mood === '😐'
                    }" @click="mood = '😐'" v-html="unifiedToHTML('😐')"></div>
                    <div :class="{
                        mood: true, active: mood === '🙂'
                    }" @click="mood = '🙂'" v-html="unifiedToHTML('🙂')"></div>
                    <div :class="{
                        mood: true, active: mood === '😀'
                    }" @click="mood = '😀'" v-html="unifiedToHTML('😀')"></div>
                </div>
                <textarea v-model="textareaValue" placeholder="Adicionar comentário..."></textarea>
            </div>
            <div class="send-container">
                <Button :disabled="loading" mini @click="sendFeedback">{{loading ? 'Enviando...' : 'Enviar'}}</Button>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useEmoji } from "../composables/emoji";
const { unifiedToHTML } = useEmoji()

const textareaValue = ref('')
const mood = ref<string | null>(null);
const loading = ref(false)

function sendFeedback() {
    if (!mood.value) return alert('Selecione um humor')
    if (!textareaValue.value) return alert('Escreva uma mensagem')

    loading.value = true;
    $fetch('/api/mood', {
        method: 'POST',
        body: JSON.stringify({
            mood: mood.value,
            message: textareaValue.value
        })
    })
    .then(() => {
        loading.value = false;
        mood.value = null;
        textareaValue.value = '';
        alert('Feedback enviado com sucesso!')
    })
    .catch(() => {
        console.error('Erro ao enviar feedback')
        loading.value = false;
    })
}
</script>
<style lang="scss">
.feedback-top {
    & .smile {
        & .nuxt-icon {
            width: 24px;
            height: 24px;
            color: $primary;
        }
    }
}

.emoji {
    animation: $emoji-fade-in;
    opacity: 0;
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
.send-container {
    width: 100%;
    & button {
        width: 100%;
        height: 36px;
    }
}
.mood-selector {
    background: $bg;
    border-radius: 12px;
    height: 120px;
    border: 1px solid $border;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .moods {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 36px;
        border-bottom: 1px solid $border;
        .mood {
            display: flex;
            align-items: center;
            width: 100%;
            height: 36px;
            padding: 8px 4px;
            justify-content: center;
            cursor: pointer;
            &:not(:last-child) {
                border-right: 1px solid $border;
            }
            &.active {
                background: $highlight-bg;
                border-bottom: 1px solid $border;
            }
        }
    }
    & textarea {
        padding: 12px;
        box-shadow: 0px 1px 2px 0px rgba(228, 229, 231, 0.24);
        border: unset;
        color: $text-highlight;
        outline: 0;
        height: 100%;
        resize: none;
        &::placeholder {
            color: $text-default;
        }
    }
}
.feedback-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 12px;
    & section {
        display: flex;
        flex-direction: column;
        gap: 4px
    }
    & .smile {
        width: 40px;
        height: 40px;
        padding: 8px;
        display: flex;
        background: $primary-lighter;
        border-radius: 50%;
    }
    & h1 {
        margin: unset;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.176px;
    }
    & h2 {
        margin: unset;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        color: $text-default;
    }
}
</style>