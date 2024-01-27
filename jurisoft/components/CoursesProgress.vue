<template>
    <Card title="Cursos - Progresso" icon="livro">
        <template #title-inner>
            <Button mini>Ver todos</Button>
        </template>
        <template #card-inner>
            <div class="divider"></div>
            <div class="progress-container">
                <div class="progress-circular">
                    25%
                </div>
                <div class="progress-text">
                    <h3>Diversidade da equipe</h3>
                    <p>Projetado para promover a inclusividade e perspectivas diversas.</p>
                    <nuxt-link to="#">Retomar curso</nuxt-link>
                </div>
            </div>
        </template>
    </Card>
</template>

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
        background: 
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient($primary 25%, $border 0);    
    }    
    .progress-text {
        h3 {
            margin: unset;
            font-size: 14px;
            font-weight: 500;
            color: $text-highlight;
            line-height: 16px;
            margin-bottom: 4px;
        }
        p {
            margin: unset;
            font-size: 12px;
            font-weight: 400;
            color: $text-default;
            line-height: 16px;
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