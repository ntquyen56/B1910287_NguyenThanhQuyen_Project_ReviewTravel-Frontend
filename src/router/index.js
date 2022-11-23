import { createWebHistory, createRouter } from "vue-router";
import ReviewTravel from "@/views/ReviewTravel.vue";
const routes = [
    {
        path: "/",
        name: "reviewtravel",
        component: ReviewTravel,
    },
    {
        path: "/reviews/create",
        name: "review.add",
        component: () => import("@/views/ReviewAdd.vue"),
        // props: true,
    },
    {
        path: "/reviews/:id",
        name: "review.edit",
        component: () => import("@/views/ReviewEdit.vue"),
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/source/create",
        name: "sour.add",
        component: () => import("@/views/SourceAdd.vue"),
        // props: true,
    },
    {
        path: "/source/list",
        name: "sour.list",
        component: () => import("@/views/SourceList.vue"),
        // props: true,
    },
    {
        path: "/source/:id",
        name: "sour.edit",
        component: () => import("@/views/SourceEdit.vue"),
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;