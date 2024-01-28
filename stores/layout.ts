import { defineStore } from "pinia"

export const useLayoutStore = defineStore('layout', {
    state: () => <{
        minimized: boolean
    }>({ 
        minimized: false,
    }),
    getters: {
        isMinimized: (state) => state.minimized,
    },
    actions: {
        toggleMinimized() {
            this.minimized = !this.minimized;
        },
        minimize() {
            this.minimized = true;
        },
        maximize() {
            this.minimized = false;
        },
    },
})