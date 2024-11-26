import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import axios from "axios";
import { watchDebounced } from '@vueuse/core'
import {DatatableApi} from "@util/types";

export const useDatatableStore = defineStore('datatable', () => {
    const api: Ref<DatatableApi> = ref({})
    const items = ref([])
    const itemsLength = ref(null)
    const headers = ref([])
    const meta = ref({page: 1, itemsPerPage: 15})
    const sort = ref({order: '', key: ''})
    const loading = ref(false)
    const options = computed(() => {
        return {
            itemsLength: itemsLength.value,
            itemsPerPage: meta.value.itemsPerPage,
            page: meta.value.page,
            itemsPerPageOptions: [
                {value: 5, title: '5'},
                {value: 15, title: '15'},
                {value: 45, title: '45'},
            ],
            height: 'calc(100vh - 250px)'
        }
    })

    async function fetchData() {
        loading.value = true
        const result = await axios.get(api.value.index, {
            params: {
                page: meta.value.page,
                limit: meta.value.itemsPerPage,
                sort: sort.value?.key,
                sortDesc: sort.value?.order === 'desc',
            },
        })
        itemsLength.value = result.data.meta.total
        items.value = result.data?.data
        loading.value = false
        return result.data.data;
    }

    watchDebounced(
        [sort,meta],
        fetchData,
        { debounce: 500, maxWait: 1000, deep: true }
    )
    return {
        api,
        items,
        itemsLength,
        meta,
        loading,
        options,
        headers,

        fetchData,

        //Events
        on: {
            'update:page': (v: any) => (meta.value.page = v),
            'update:itemsPerPage': (v: any) => (meta.value.itemsPerPage = v),
            'update:sortBy': (v: any) => (sort.value = v[0]),
        },
    }
})
