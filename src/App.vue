<template>
    <v-layout>
        <Topbar />
        <NavMenu />

        <v-main style="min-height: 100vh">
            <v-sheet elevation="3" class="m-5" v-if="breadcrumbs">
                <v-breadcrumbs :items="breadcrumbsTree" v-if="!breadcrumbsLoading">
                    <template v-slot:prepend>
                        <v-icon @click="push(`/`)" link size="small" icon="mdi-home"></v-icon>
                        <v-breadcrumbs-divider></v-breadcrumbs-divider>
                    </template>
                </v-breadcrumbs>
                <v-skeleton-loader v-else type="text" />
            </v-sheet>
            <RouterView v-slot="{ Component }">
                <Suspense timeout="0">
                    <div class="h-100">
                        <component :key="$router.path" :is="Component"/>
                    </div>
                </Suspense>
            </RouterView>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import Topbar from "./components/core/Topbar.vue";
import NavMenu from "./components/core/NavMenu.vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useGlobalStore} from "@stores/global";

const globalStore = useGlobalStore();
const { breadcrumbsTree, breadcrumbs, breadcrumbsLoading } = storeToRefs(globalStore);
const {push} = useRouter()
</script>

<style scoped>

</style>
