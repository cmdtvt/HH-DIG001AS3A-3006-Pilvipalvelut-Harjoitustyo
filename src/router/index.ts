import ViewAdmin from "@/views/ViewAdmin.vue";
import ViewLanding from "@/views/ViewLanding.vue";
import ViewLogin from "@/views/ViewLogin.vue";
import ViewProfile from "@/views/ViewProfile.vue";
import ViewShows from "@/views/ViewShows.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "landing",
            component: ViewLanding,
        },
        {
            path: "/login",
            name: "login",
            component: ViewLogin,
        },
        {
            path: "/shows",
            name: "shows",
            component: ViewShows,
        },
        {
            path: "/profile",
            name: "profile",
            component: ViewProfile,
        },
        {
            path: "/admin",
            name: "admin",
            component: ViewAdmin,
        },
    ],
});

export default router;
