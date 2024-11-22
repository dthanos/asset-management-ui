<template>
    <v-navigation-drawer v-model="navMenu">
        <v-list density="compact" nav color="primary" v-model="title">
            <v-list-item
                prepend-icon="mdi-home-outline"
                value="Dashboard"
                class="d-flex align-center"
                title="Dashboard"
                :to="`/`"
            />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useGlobalStore} from "@stores/global.ts";

const globalStore = useGlobalStore()
const { navMenu, title } = storeToRefs(globalStore)


</script>
