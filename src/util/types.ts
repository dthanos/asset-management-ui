export interface Asset {
    uuid: string;
    amenities: [];
    bathrooms: number;
    bedrooms: number;
    description: string;
    floor: number;
    latitude: string;
    longitude: string;
    postal_code: string;
    price: string;
    size: number;
    street: string;
    street_number: string;
    title: string;
    type: {};
    available_from: string;
    created_at: string;
    updated_at: string;
}

export interface DatatableApi {
    index: string;
    create: string;
    update: string;
    delete: string;
}