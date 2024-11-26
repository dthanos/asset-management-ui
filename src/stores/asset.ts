import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {Asset} from "@util/types";
import {indexAmenities, indexTypes} from "../services/assets";

export const useAssetStore = defineStore('asset', () => {
    const asset: Ref<Asset> = ref({})
    const filters = ref({type_id: null, amenities: []})
    const types = ref([])
    const amenities = ref([])
    const loading = ref(false)

    fetchData();

    async function fetchData(){
        loading.value = true;
        amenities.value = (await indexAmenities()).data.data
        types.value = (await indexTypes()).data.data.map((i: any, index: number) => {return {value: index + 1, title: i.name, id: i.uuid}})
        loading.value = false;
    }
    return {
        asset,
        types,
        amenities,
        loading,
        filters,
    }
})
