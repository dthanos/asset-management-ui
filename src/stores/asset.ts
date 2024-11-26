import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Asset} from "@util/types";
import {indexAmenities, indexTypes, showAsset, updateAsset, storeAsset} from "@services/assets";
import {unsavedChanges} from "@composables/unsavedChanges";
import {useRouter} from "vue-router";

export const useAssetStore = defineStore('asset', () => {
    const {push} = useRouter()
    const asset: Ref<Asset> = ref({})
    const form: Ref<any> = ref(null)
    const filters = ref({type_id: null, amenities: []})
    const types = ref([])
    const amenities = ref([])
    const loading = ref(false)
    const { isDirty, restart } = unsavedChanges(asset, false);

    fetchData();

    async function fetchData(){
        loading.value = true;
        amenities.value = await indexAmenities()
        types.value = await indexTypes()
        loading.value = false;
    }
    async function fetchAsset(id: string){
        loading.value = true;
        await showAsset(id)
            .then(r => asset.value = r)
            .finally(() => {
                restart();
                loading.value = false;
            })
    }
    async function editAsset(){
        loading.value = true;
        await updateAsset(asset.value)
            .then(r => asset.value = r)
            .finally(() => {
                restart();
                loading.value = false;
            })
    }
    async function createAsset(){
        loading.value = true;
        await storeAsset(asset.value)
            .then(r => {
                if(r) {
                    asset.value = r;
                    push('/')
                }
            })
            .finally(() => loading.value = false)
    }
    return {
        asset,
        types,
        amenities,
        loading,
        filters,
        isDirty,
        form,

        fetchAsset,
        editAsset,
        createAsset,
    }
})
