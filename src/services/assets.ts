import axios from 'axios';
import {useGlobalStore} from "@stores/global";

export async function listAssets(){
    const globalStore = useGlobalStore()
    globalStore.loading = true;
    return axios.get('http://localhost:8080/listings')
        .finally(() => globalStore.loading = false)
}