import axios from 'axios';
import {useGlobalStore} from "@stores/global";

export async function getAsset(id: string){
    const globalStore = useGlobalStore()
    globalStore.loading = true;
    return axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`)
        .finally(() => globalStore.loading = false)
}