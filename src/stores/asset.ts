import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Asset} from "@util/types";
import {indexAmenities, indexTypes, showAsset, updateAsset, storeAsset} from "@services/assets";
import {unsavedChanges} from "@composables/unsavedChanges";
import {useRoute, useRouter} from "vue-router";
import {useDatatableStore} from "./datatable";

export const useAssetStore = defineStore('asset', () => {
    const {push, back} = useRouter()
    const asset: Ref<Asset> = ref({})
    const form: Ref<any> = ref(null)
    const filters = ref({type: null, amenities: []})
    const types = ref([])
    const amenities = ref([])
    const loading = ref(false)
    const { isDirty, restart } = unsavedChanges(asset, false);
    const route = useRoute()
    const datatableStore = useDatatableStore();

    fetchData();

    async function fetchData(){
        loading.value = true;
        amenities.value = await indexAmenities()
        types.value = await indexTypes()
        filters.value.amenities = route.query['filter[amenities]']?.split(',');
        filters.value.type = types?.value?.map((i: any, index: number) => {return {value: index + 1, title: i.name}}).find(i => i.value == route.query['filter[type_id]']);
        datatableStore.api.index = `${import.meta.env.VITE_API_URL}/listings?filter[type_id]=${filters.value?.type?.value ?? filters.value?.type}&filter[amenities]=${filters.value?.amenities?.join(',') ?? ''}`;
        datatableStore.meta = { page: Number(route.query.page) || 1, itemsPerPage: Number(route.query.itemsPerPage) || 15 };
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
                    back();
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
