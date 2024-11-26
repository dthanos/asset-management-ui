import {defineStore} from "pinia";
import {ref} from "vue";

const defaultParams = {
    timeout: 3000,
    variant: 'success',
    text: '',
    title: '',
}

export const useSnackbarStore = defineStore('snackbar', () => {

    const notifications = ref([])

    function addSnackbar(params){

        notifications.value.push({
            ...defaultParams,
            ...params,
        })
    }

    return {
        notifications,

        addSnackbar
    }
})
