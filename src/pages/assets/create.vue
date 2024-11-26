<template>
    <AssetForm :create="true" />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import AssetForm from "@components/AssetForm.vue";
import {useGlobalStore} from "@stores/global";
import {storeToRefs} from "pinia";
const globalStore = useGlobalStore();
const { breadcrumbsTree, breadcrumbs, breadcrumbsLoading } = storeToRefs(globalStore);

onMounted(() => {
    breadcrumbs.value = true;
    breadcrumbsTree.value = [
        {title: 'Assets', disabled: false, to: '/'},
        {title: `Create Asset`, disabled: true},
    ]
    breadcrumbsLoading.value = false;
})
</script>

<style scoped></style>