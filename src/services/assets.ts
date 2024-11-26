import axios from 'axios';
import {Asset} from "@util/types";

export async function showAsset(id: string) {
    return axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`)
}

export async function updateAsset(asset: Asset) {
    return axios.put(`${import.meta.env.VITE_API_URL}/listings/${asset.uuid}`, { ...asset, type_id: asset.type.uuid })
}

export async function indexAmenities() {
    return axios.get(`${import.meta.env.VITE_API_URL}/amenities`)
}

export async function indexTypes() {
    return axios.get(`${import.meta.env.VITE_API_URL}/types`)
}