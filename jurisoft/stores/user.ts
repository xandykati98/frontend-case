import { useAsyncData } from "nuxt/app"
import { defineStore } from "pinia"

interface User {
    name?: string
    email?: string
    avatar?: string
}
export const useUserStore = defineStore('user', {
    state: () => <{
        user: User | null
        loading: boolean
    }>({ 
        user: null,
        loading: false
    }),
    getters: {
        activeUser: (state) => state.user,
        isLoading: (state) => state.loading,
    },
    actions: {
        setUser(newUser: User) {
            this.user = newUser;
        },
        async loadUser() {
            this.loading = true;
            
            const userUrl = '/api/user'
            const { data, pending, error, refresh } = await useAsyncData(
                'getUser',
                () => $fetch(userUrl)
            )
            this.user = data.value?.data || null;
            this.loading = false;

            return this.user
        }
    },
})