<template>
    <v-data-table-server
        v-on="datatableStore.on"
        v-bind="options"
        :loading="loading"
        :headers="headers"
        :items="items"
    >
        <template v-slot:item="{ item, index }">
            <tr>
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

import {onMounted, ref} from "vue";
import {useDatatableStore} from "@stores/datatable";
import {storeToRefs} from "pinia";
import {datetimeDatabaseToHuman} from "@util/helpers";
const datatableStore = useDatatableStore();
const { api, items, loading, options, headers } = storeToRefs(datatableStore);

api.value = { index: `${import.meta.env.VITE_API_URL}/listings` }
headers.value = [
    {title: 'Title', value: 'title', sortable: false},
    {title: 'Type', value: 'type.name', sortable: false},
    {title: 'Size', value: 'size', sortable: true},
    {title: 'Address', value: 'address', sortable: false},
    {title: 'Description', value: 'description', sortable: false},
    {title: 'Created', value: 'created_at', sortable: true},
    {title: 'Updated', value: 'updated_at', sortable: false},
]

onMounted(() => datatableStore.fetchData())
</script>