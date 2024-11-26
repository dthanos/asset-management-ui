import axios from 'axios';
import {Asset} from "@util/types";
import {useSnackbarStore} from "@stores/snackbar";
import {apiErrorHandler} from "@util/helpers";

export async function showAsset(id: string) {
    return axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`).then(r => r.data.data)
}

export async function updateAsset(asset: Asset) {
    const snackbarStore = useSnackbarStore()
    return axios
        .put(`${import.meta.env.VITE_API_URL}/listings/${asset.uuid}`, {
            ...asset,
            type_id: asset?.type
        })
        .then(r => {
            snackbarStore.addSnackbar({text: 'Asset updated successfully.'})
            return r.data.data;
        })
        .catch(r => apiErrorHandler(r.response.data.errors))
}

export async function storeAsset(asset: Asset) {
    const snackbarStore = useSnackbarStore()
    return axios
        .post(`${import.meta.env.VITE_API_URL}/listings`, {
            ...asset,
            type_id: asset?.type
        })
        .then(r => {
            snackbarStore.addSnackbar({text: 'Asset created successfully.'})
            return r.data.data;
        })
        .catch(r => apiErrorHandler(r.response.data.errors))
}

export async function indexAmenities() {
    return axios.get(`${import.meta.env.VITE_API_URL}/amenities`).then(r => r.data.data)
}

export async function indexTypes() {
    return axios.get(`${import.meta.env.VITE_API_URL}/types`).then(r => r.data.data)
}