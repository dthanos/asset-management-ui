<template>
    <v-data-table
        :headers="[
            {title: 'Title', sortable: true},
            {title: 'Type', sortable: true},
            {title: 'Size', sortable: true},
            {title: 'Address', sortable: true},
            {title: 'Description', sortable: true},
            {title: 'Created', sortable: true},
            {title: 'Updated', sortable: true},
        ]"
        :items="items"
    />
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {listAssets} from "@services/assets";
const items = ref([])

onMounted(() => listAssets().then(r => items.value = r?.data))
</script>