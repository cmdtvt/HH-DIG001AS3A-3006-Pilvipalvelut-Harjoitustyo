import ViewAdmin from "@/views/ViewAdmin.vue";
import ViewLanding from "@/views/ViewLanding.vue";
import ViewLogin from "@/views/ViewLogin.vue";
import ViewProfile from "@/views/ViewProfile.vue";
import ViewShows from "@/views/ViewShows.vue";
import ViewRegister from "@/views/ViewRegister.vue";
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
            path: "/register",
            name: "register",
            component: ViewRegister,
        },
        {
            path: "/login",
            name: "login",
            component: ViewLogin,
        },
        {
            path: "/browse",
            name: "browse",
            component: ViewShows,
        },
        {
            path: "/list",
            name: "List",
            component: ViewShows,
        },
        {
            path: "/profile/:uid",
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
