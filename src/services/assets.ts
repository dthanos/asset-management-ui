import axios from 'axios';

export async function showAsset(id: string) {
    return axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`)
}

export async function indexAmenities() {
    return axios.get(`${import.meta.env.VITE_API_URL}/amenities`)
}

export async function indexTypes() {
    return axios.get(`${import.meta.env.VITE_API_URL}/types`)
}