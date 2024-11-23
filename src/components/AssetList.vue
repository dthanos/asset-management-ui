<template>
    <v-data-table-server
        v-bind="options"
        :loading="loading"
        :headers="[
            {title: 'Title', value: 'title', sortable: true},
            {title: 'Type', value: 'type.name', sortable: true},
            {title: 'Size', value: 'size', sortable: true},
            {title: 'Address', value: 'address', sortable: true},
            {title: 'Description', value: 'description', sortable: true},
            {title: 'Created', value: 'created_at', sortable: true},
            {title: 'Updated', value: 'updated_at', sortable: true},
        ]"
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
    </v-data-table-server>
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useDatatableStore} from "@stores/datatable";
import {storeToRefs} from "pinia";
import {datetimeDatabaseToHuman} from "@util/helpers";
const datatableStore = useDatatableStore();
const { api, items, loading, options } = storeToRefs(datatableStore);

api.value = { index: `${import.meta.env.VITE_API_URL}/listings` }

onMounted(() => datatableStore.fetchData())
</script>