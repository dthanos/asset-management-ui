<template>
    <v-card class="p-10 m-5" :loading="loading">
        <v-card-text>
            <v-row>
                <v-col md="12">
                    <v-text-field
                        v-model="asset.title"
                        label="Title"
                    />
                </v-col>
                <v-col md="3" lg="4">
                    <v-text-field
                        v-model="asset.available_from"
                        label="Available from"
                        type="date"
                    />
                </v-col>
                <v-col md="3" lg="3">
                    <v-select
                        clearable
                        v-model="asset.type"
                        label="Type"
                        item-value="id"
                        item-title="name"
                        :items="types"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.size"
                        label="Size"
                        type="number"
                    />
                </v-col>
                <v-col md="3" lg="3">
                    <v-text-field
                        v-model="asset.price"
                        label="Price"
                        type="number"
                    />
                </v-col>
                <v-col md="12" lg="8">
                    <v-text-field
                        v-model="asset.street"
                        label="Street"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.street_number"
                        label="Number"
                        type="number"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.postal_code"
                        label="Postal Code"
                        type="number"
                    />
                </v-col>
                <v-col md="3" lg="6">
                    <v-text-field
                        v-model="asset.latitude"
                        label="Latitude"
                    />
                </v-col>
                <v-col md="3" lg="6">
                    <v-text-field
                        v-model="asset.longitude"
                        label="Longitude"
                    />
                </v-col>
                <v-col md="12" lg="12">
                    <v-textarea
                        v-model="asset.description"
                        label="Description"
                        rows="2"
                    />
                </v-col>
                <v-col md="12">
                    <v-autocomplete
                        clearable
                        multiple
                        v-model="asset.amenities"
                        label="Amenities"
                        :items="amenities"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col md="2" lg="4">
                    <v-text-field
                        v-model="asset.bathrooms"
                        label="Bathrooms"
                        type="number"
                    />
                </v-col>
                <v-col md="2" lg="4">
                    <v-text-field
                        v-model="asset.bedrooms"
                        label="Bedrooms"
                        type="number"
                    />
                </v-col>
                <v-col md="2" lg="4">
                    <v-text-field
                        v-model="asset.floor"
                        label="Floor"
                        type="number"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                prepend-icon="mdi-content-save-outline"
                location="center"
                position="relative"
                color="primary"
                base-color="primary"
                text="Save"
                variant="tonal"
                @click="assetStore.editAsset"
            />
        </v-card-actions>
    </v-card>
</template>


<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useAssetStore} from "@stores/asset";
const assetStore = useAssetStore();
const { asset, loading, types, amenities } = storeToRefs(assetStore);

onMounted(async () => {
})
</script>