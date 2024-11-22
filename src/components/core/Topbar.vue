<template>
    <v-app-bar prominent density="compact" color="primary">
        <v-app-bar-nav-icon @click="navMenu = !navMenu" />

        <v-toolbar-title :text="title" />

        <v-spacer></v-spacer>

        <v-btn icon="mdi-dots-vertical" />
    </v-app-bar>
</template>

<script setup lang="ts">
import {useGlobalStore} from "@stores/global";
import {storeToRefs} from "pinia";

const globalStore = useGlobalStore()
const { navMenu, title } = storeToRefs(globalStore)
</script>
