import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Contriner",
        component: () => import("@c/pages/contriner/index.vue")
    },
    {
        path: "/category_info/:id",
        name: "CategoryInfo",
        component: () => import("@c/pages/category/index.vue")
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export {
    router
}