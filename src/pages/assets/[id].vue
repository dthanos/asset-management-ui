<template>
    <AssetForm />
</template>

<script setup lang="ts">
import {useGlobalStore} from "@stores/global";
import {storeToRefs} from "pinia";
import {showAsset} from "@services/assets";
import {onMounted, ref, Ref} from "vue";
import {useRoute} from "vue-router";
import AssetForm from "@components/AssetForm.vue";
import {useAssetStore} from "@stores/asset";

const globalStore = useGlobalStore();
const { breadcrumbs, breadcrumbsLoading } = storeToRefs(globalStore);
const assetStore = useAssetStore();
const { asset, loading } = storeToRefs(assetStore);
const {params} = useRoute()

onMounted(() => {
    loading.value = true;
    showAsset(params.id)
        .then(r => {
            asset.value = r.data.data;
            breadcrumbs.value = [
                { title: 'Assets', disabled: false, to: '/' },
                { title: `${asset.value.title}`, disabled: true },
            ]
        })
        .finally(() => {
            loading.value = false;
            breadcrumbsLoading.value = false;
        })
})
</script>

<style scoped>

</style>