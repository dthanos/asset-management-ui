<template>
    <v-card class="p-10 m-5" :loading="loading">
        <v-card-text>
            <v-label>Basic Info</v-label>
            <v-divider class="mt-1" />
            <v-row>
                <v-col md="12">
                    <v-text-field
                        v-model="asset.title"
                        label="Title"
                        append-inner-icon="mdi-format-title"
                    />
                </v-col>
                <v-col md="12">
                    <v-textarea
                        v-model="asset.description"
                        label="Description"
                        rows="2"
                        append-inner-icon="mdi-text-long"
                    />
                </v-col>
            </v-row>
            <v-row>
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
                        item-value="uuid"
                        item-title="name"
                        append-inner-icon="mdi-layers-triple-outline"
                        :items="types"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.size"
                        label="Size"
                        type="number"
                        append-inner-icon="mdi-ruler-square"
                    />
                </v-col>
                <v-col md="3" lg="3">
                    <v-text-field
                        v-model="asset.price"
                        label="Price"
                        append-inner-icon="mdi-currency-eur"
                    />
                </v-col>
            </v-row>
            <v-divider class="my-3" />
            <v-label>Location</v-label>
            <v-divider class="mt-1" />
            <v-row>
                <v-col md="12" lg="8">
                    <v-text-field
                        v-model="asset.street"
                        label="Street"
                        append-inner-icon="mdi-road"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.street_number"
                        label="Number"
                        append-inner-icon="mdi-numeric"
                    />
                </v-col>
                <v-col md="3" lg="2">
                    <v-text-field
                        v-model="asset.postal_code"
                        label="Postal Code"
                        append-inner-icon="mdi-email-fast-outline"
                    />
                </v-col>
                <v-col md="3" lg="6">
                    <v-text-field
                        v-model="asset.latitude"
                        label="Latitude"
                        append-inner-icon="mdi-latitude"
                    />
                </v-col>
                <v-col md="3" lg="6">
                    <v-text-field
                        v-model="asset.longitude"
                        label="Longitude"
                        append-inner-icon="mdi-longitude"
                    />
                </v-col>
            </v-row>
            <v-divider class="my-3" />
            <v-label>Specifications</v-label>
            <v-divider class="mt-1" />
            <v-row>
                <v-col sm="12" md="4">
                    <v-text-field
                        v-model="asset.bathrooms"
                        label="Bathrooms"
                        type="number"
                        append-inner-icon="mdi-toilet"
                    />
                </v-col>
                <v-col sm="12" md="4">
                    <v-text-field
                        v-model="asset.bedrooms"
                        label="Bedrooms"
                        type="number"
                        append-inner-icon="mdi-bed-single-outline"
                    />
                </v-col>
                <v-col sm="12" md="4">
                    <v-text-field
                        v-model="asset.floor"
                        label="Floor"
                        type="number"
                        append-inner-icon="mdi-home-floor-3"
                    />
                </v-col>
                <v-col sm="12" md="12">
                    <v-autocomplete
                        clearable
                        multiple
                        v-model="asset.amenities"
                        label="Amenities"
                        append-inner-icon="mdi-format-list-checks"
                        :items="amenities"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
            <v-btn
                prepend-icon="mdi-content-save-outline"
                color="primary"
                base-color="primary"
                text="Save"
                variant="tonal"
                :disabled="!isDirty"
                @click="assetStore.editAsset"
            />
        </v-card-actions>
    </v-card>
</template>


<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useAssetStore} from "@stores/asset";
const assetStore = useAssetStore();
const { asset, loading, types, amenities, isDirty } = storeToRefs(assetStore);
</script>