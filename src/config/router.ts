import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'
import {useGlobalStore} from "@stores/global";

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeResolve((to, from, next) => {
    const globalStore = useGlobalStore();
    globalStore.breadcrumbsReset();
    next();
})

export default router
