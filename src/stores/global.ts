import {defineStore} from "pinia";
import {ref} from "vue";

export const useGlobalStore = defineStore('global', () => {

    const navMenu = ref(false)
    const title = ref('Dashboard')
    const loading = ref(false)


    return {
        navMenu,
        title,
        loading,
    }
})
