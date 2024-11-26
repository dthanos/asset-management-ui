<template>
    <div>
        <v-snackbar
            :key="index" v-for="(notification, index) in snackbarStore.notifications"
            :variant="'elevated'"
            :timeout="notification.timeout"
            location="right top"
            :color="notification.variant"
            :model-value="true"
        >
            <div class="d-flex align-center">
                <v-icon
                    class="pr-1"
                    v-if="notification.variant === 'success'"
                    :icon="'mdi-check-circle-outline'"
                />
                <v-icon
                    class="pr-1"
                    v-else-if="notification.variant === 'error'"
                    :icon="'mdi-alpha-x-circle-outline'"
                />
                <v-icon
                    class="pr-1"
                    v-else-if="notification.variant === 'warning'"
                    :icon="'mdi-alert-circle-outline'"
                />
                {{notification.text}}
            </div>
        </v-snackbar>
    </div>
</template>

<script setup lang="ts">
import {useSnackbarStore} from "@stores/snackbar";
const snackbarStore = useSnackbarStore()
</script>
