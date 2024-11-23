import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const useDatatableStore = defineStore('datatable', () => {
    const api = ref({})
    const items = ref([])
    const meta = ref({})
    const loading = ref(false)
    const options = computed(() => {
        return {
            page: meta.value?.current_page,
            itemsPerPage: meta.value?.per_page,
            itemsLength: meta.value?.total,
        }
    })

    async function fetchData() {
        loading.value = true
        const result = await axios.get(api.value.index, {
            params: {
            },
        })
        meta.value = result.data.meta
        items.value = result.data?.data
        loading.value = false
        return result.data.data;
    }

    return {
        api,
        items,
        meta,
        loading,
        options,

        fetchData,
    }
})
