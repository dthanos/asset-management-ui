<template>
    <v-form
        class="p-10 d-flex justify-space-around"
        style="height: 120px;"
    >
        <v-select
            clearable
            rounded="0"
            class="h-100"
            color="primary"
            variant="outlined"
            density="comfortable"
            label="Types"
            append-inner-icon="mdi-layers-triple-outline"
            v-model="filters.type_id"
            :items="types.map((i: any, index: number) => {return {value: index + 1, title: i.name}})"
            :loading="loading"
            :width="'280px'"
        />
        <v-autocomplete
            clearable
            multiple
            rounded="0"
            class="h-100"
            color="primary"
            variant="outlined"
            density="comfortable"
            label="Amenities"
            append-inner-icon="mdi-format-list-checks"
            v-model="filters.amenities"
            :items="amenities"
            :loading="loading"
            :width="'600px'"
        />
    </v-form>
    <v-data-table-server
        class="px-5"
        v-on="datatableStore.on"
        v-bind="options"
        :loading="datatableStore.loading"
        :headers="headers"
        :items="items"
    >
        <template v-slot:header.create>
            <th>
                <v-icon
                    size="large"
                    icon="mdi-plus-circle-outline"
                    color="success"
                    @click="push('/assets/create')"
                />
            </th>
        </template>
        <template v-slot:item="{ item, index }">
            <tr class="cursor-pointer hover:bg-gray-100" @click="push(`/assets/${item.uuid}`)">
                <td>{{ item.title }}</td>
                <td>{{ item.type.name }}</td>
                <td>{{ item.size }}</td>
                <td>{{ `${item.street} ${item.street_number} ${item.postal_code}` }}</td>
                <td>{{ item.description }}</td>
                <td>{{ datetimeDatabaseToHuman(item.created_at) }}</td>
                <td>{{ datetimeDatabaseToHuman(item.updated_at) }}</td>
            </tr>
        </template>
        <template v-slot:loading>
            <v-skeleton-loader type="table-tbody" />
        </template>
    </v-data-table-server>
</template>


<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useDatatableStore} from "@stores/datatable";
import {storeToRefs} from "pinia";
import {datetimeDatabaseToHuman} from "@util/helpers";
import {useRouter} from "vue-router";
import {useAssetStore} from "@stores/asset";
const datatableStore = useDatatableStore();
const { api, items, options, headers } = storeToRefs(datatableStore);
const assetStore = useAssetStore();
const { asset, loading, amenities, types, filters } = storeToRefs(assetStore);
const {push} = useRouter()

api.value = { index: `${import.meta.env.VITE_API_URL}/listings` }
headers.value = [
    {title: 'Title', value: 'title', sortable: false},
    {title: 'Type', value: 'type.name', sortable: false},
    {title: 'Size', value: 'size', sortable: true},
    {title: 'Address', value: 'address', sortable: false},
    {title: 'Description', value: 'description', sortable: false},
    {title: 'Created', value: 'created_at', sortable: true},
    {title: 'Updated', value: 'updated_at', sortable: false},
    {title: 'Create', value: 'create', sortable: false},
]

onMounted(async () => {
    datatableStore.fetchData()
})
watch(filters,
    () => {
        api.value.index = `${import.meta.env.VITE_API_URL}/listings?filter[type_id]=${filters.value.type_id ?? ''}&filter[amenities]=${filters.value.amenities.join(',')}`;
        datatableStore.fetchData()
    },
{deep: true})
</script>