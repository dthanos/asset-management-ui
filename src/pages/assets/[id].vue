<template>
    <AssetForm :create="false" />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import AssetForm from "@components/AssetForm.vue";
import {useAssetStore} from "@stores/asset";
import {useGlobalStore} from "@stores/global";
import {storeToRefs} from "pinia";
const {params} = useRoute()
const globalStore = useGlobalStore();
const { breadcrumbsTree, breadcrumbs, breadcrumbsLoading } = storeToRefs(globalStore);
const assetStore = useAssetStore();

onMounted(() => {
    breadcrumbs.value = true;
    assetStore.fetchAsset(params.id)
        .then(() => {
            breadcrumbsTree.value = [
                {title: 'Assets', disabled: false, to: '/'},
                {title: `${assetStore.asset.title}`, disabled: true},
            ]
        })
        .finally(() => breadcrumbsLoading.value = false)
})
</script>

<style scoped></style>