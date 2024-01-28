<template>
    <Card title="Cursos" icon="livro">
        <template #title-inner>
            <div class="course-title">
                <TextInput icon="busca" @input="changeInputValue" :value="inputValue" :placeholder="$viewport.isLessThan('desktop') ? $viewport.isLessThan('tablet') ? 'Busca' : 'Pesquisar' : 'Pesquisar cursos...'"/>
                <Button mini @click="inputValue = ''">Ver todos</Button>
            </div>
        </template>
        <template #card-inner>
            <div class="table-container">
                <table>
                    <thead>
                        <tr :class="{ empty: isEmpty }">
                            <th>Professor</th>
                            <th>Nome do curso</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="course in courses.filter(course => !inputValue ? true : course.professor.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))" :key="course.id">
                            <th scope="row" class="professor">
                                <nuxt-img :src="course.professor.avatar" :alt="course.professor.name"/>
                                <section>
                                    <h1>{{ course.professor.name }}</h1>
                                    <p>{{ course.professor.job }}</p>
                                </section>
                            </th>
                            <td>
                                <section class="name-section">
                                    <h1>{{ course.name }}</h1>
                                    <p>{{ getCourseDate(course.dateStart, course.dateEnd) }}</p>
                                </section>
                            </td>
                            <td>
                                <section class="progress-section">
                                    <div class="progress-container">
                                        <div class="progress" :style="{ width: course.progress + '%'}"></div>
                                    </div>
                                    <p>
                                        {{ course.progress }}%
                                    </p>
                                </section>    
                            </td>
                            <td>
                                <div class="status-container">
                                    <div :class="{
                                        'status': true,
                                        'concluido': course.status === 'Concluído',
                                        'em-andamento': course.status === 'Em andamento'
                                    }">
                                        <nuxt-icon :name="course.status === 'Concluído' ? 'concluido' : 'em-andamento' "/>
                                        {{ course.status }}
                                    </div>    
                                </div>
                            </td>
                            <td>
                                <div class="action">
                                    <nuxt-icon name="caret-right"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="empty" v-if="isEmpty">
                    <nuxt-icon name="courses-empty" filled/>
                    <h2>Não há registros de cursos ainda. <br/>Por favor, verifique mais tarde.</h2>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { type APIResponse, type Course } from "../server/crosstypes";
import type { SerializeObject } from 'nitropack';
import { useNuxtApp } from "nuxt/app";
const inputValue = ref('');
const courses = ref<SerializeObject<Course>[]>([]);
const { $viewport } = useNuxtApp()
const isEmpty = computed(() => {
    return courses.value.filter(course => !inputValue ? true : course.professor.name.toLocaleLowerCase().includes(inputValue.value.toLocaleLowerCase())).length === 0
})

function changeInputValue(e: Event) {
    const target = e.target as HTMLInputElement;
    inputValue.value = target.value;
}
function getCourseDate(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const startMonth = months[startDate.getMonth()];
    const endMonth = months[endDate.getMonth()];

    const formattedStartDate = `${startMonth} ${startDate.getDate() + 1}`;
    const formattedEndDate = `${endMonth} ${endDate.getDate() + 1}`;

    return `${formattedStartDate} - ${formattedEndDate}`;
}

onMounted(() => {
    $fetch('/api/courses')
    .then((res: APIResponse<SerializeObject<Course>[]>) => {
        courses.value = res.data;
    })
    .catch((err) => {
        console.error(err);
    })
})
</script>
<style lang="scss">
.table-container {
    overflow-x: auto;
    width: 100%;
    
    /* custom scrollbar */
    &::-webkit-scrollbar {
        height: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        margin: 1px;
        width: 3px;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
}
table {
    tbody {
        & td {
            & .action {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                & .nuxt-icon {
                    color: $text-default;
                }
                &:hover {
                    background: $highlight-bg;
                }
            }
            & .status {
                & .nuxt-icon {
                    width: 12px;
                    height: 12px;
                    display: flex;
                }
                &.em-andamento .nuxt-icon {
                    color: $primary;
                }
                &.concluido .nuxt-icon {
                    color: $success;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.course-title {
    display: flex;
    gap: 12px;
    flex-direction: row;
    & .input-container {
        @media (max-width: $desktop ) {
            width: 115px;
        }
    }
    @media (max-width: $mobile) {
        gap: 0px;
        & .input-container {
            border-right: unset;
            border-top-right-radius: unset;
            border-bottom-right-radius: unset;
        }
        & button {
            border-top-left-radius: unset;
            border-bottom-left-radius: unset;
        }
        & .input-container {
            width: 80px;
        }
    }
}

.table-container {
    display: flex;
    gap: 16px;
    flex-direction: column;
    & > .empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(248px - 4px);
        padding: 16px;
        gap: 20px;
        & h2 {
            @include h2($size: 14px, $line-height: 20px);
            text-align: center;
            margin: unset;
            color: $text-default;
        }
    
    }
}
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    thead {
        border-bottom: 4px solid transparent;
        & tr {
            &.empty {
                & th {
                    color: $disabled;
                }
            }
            gap: 10px;
            flex: 1 0 0;
            width: 100%;
            height: 36px;
            margin-bottom: 4px;
            background: $highlight-bg;
            & th {
                &:first-child {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                }
                &:last-child {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: -0.084px;
                padding: 8px 12px;
                color: $text-default;
                text-align: left;
            }
        }
    }
    tbody {
        border-bottom: 4px solid transparent;
        & td, & th {
            padding: 0px;
            & .status-container {
                @media (max-width: $tablet) {
                    width: 130px;
                }
                & .status {
                    display: flex;
                    padding: 4px 8px 4px 4px;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;
                    border-radius: 6px;
                    border: 1px solid $border;
                    height: 24px;
                    width: fit-content;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 16px; 
                    color: $text-default;
                    & .em-andamento {
                        color: $primary;
                    }
                    & .concluido {
                        color: $success;
                    }
                }
            }
            & .name-section {
                padding: 12px;
            }
            & .progress-section {
                display: flex;
                flex-direction: row;
                gap: 12px;
                align-items: center;
                padding: 12px;
                & .progress-container {
                    width: 100%;
                    height: 8px;
                    background: $highlight-bg;
                    border-radius: 8px;
                    & .progress {
                        height: 100%;
                        border-radius: 8px;
                        background: $primary;
                    }
                }
                & p {
                    width: 80px;
                }
            }
            & section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 4px;
                & h1 {
                    text-align: left;
                    @include h1($weight: 400, $spacing: 0px);
                }
                & p {
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    letter-spacing: 0em;
                    text-align: left;
                    margin: unset;
                    color: $text-default;
                    // https://pt.stackoverflow.com/questions/193132/como-usar-ellipsis-css3
                    white-space: nowrap;                  
                    overflow: hidden; /* "overflow" value must be different from "visible" */
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .professor {
        display: flex;
        flex-direction: row;
        gap: 12px;
        padding: 12px 20px 12px 12px;
        & img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>