<template>
    <v-layout>
        <Topbar />
        <NavMenu />

        <v-main style="min-height: 100vh">
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
</script>

<style scoped>

</style>
