import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'
import {useGlobalStore} from "@stores/global";
import {storeToRefs} from "pinia";

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeResolve((to, from, next) => {
    const globalStore = useGlobalStore();
    const { breadcrumbs, breadcrumbsLoading} = storeToRefs(globalStore);
    breadcrumbs.value = true;
    breadcrumbsLoading.value = true;
    next();
})

export default router
