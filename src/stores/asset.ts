import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Asset} from "@util/types";
import {indexAmenities, indexTypes, showAsset, updateAsset} from "@services/assets";
import {unsavedChanges} from "@composables/unsavedChanges";

export const useAssetStore = defineStore('asset', () => {
    const asset: Ref<Asset> = ref({})
    const filters = ref({type_id: null, amenities: []})
    const types = ref([])
    const amenities = ref([])
    const loading = ref(false)
    const { isDirty, restart } = unsavedChanges(asset, false);

    fetchData();

    async function fetchData(){
        loading.value = true;
        amenities.value = (await indexAmenities()).data.data
        types.value = (await indexTypes()).data.data
        loading.value = false;
    }
    async function fetchAsset(id: string){
        loading.value = true;
        await showAsset(id)
            .then(r => asset.value = r.data.data)
            .finally(() => {
                restart();
                loading.value = false;
            })
    }
    async function editAsset(){
        loading.value = true;
        await updateAsset(asset.value)
            .then(r => asset.value = r.data.data)
            .finally(() => {
                restart();
                loading.value = false;
            })
    }
    return {
        asset,
        types,
        amenities,
        loading,
        filters,
        isDirty,

        fetchAsset,
        editAsset,
    }
})
