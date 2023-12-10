import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Settings from "./routes/Settings.vue";
import Inventory from "./routes/Inventory.vue";
import Onboarding from "./routes/Onboarding.vue";
import About from "./routes/About.vue";
import Changelog from "./routes/Changelog.vue";

import "../index.css";

const router = createRouter
({
    history: createWebHashHistory(),
    routes:
    [
        {
            path: "/settings",
            component: Settings,
            alias: "/",
        },
        {
            path: "/inventory",
            component: Inventory,
        },
        {
            path: "/onboarding",
            component: Onboarding,
        },
        {
            path: "/about",
            component: About,
        },
        {
            path: "/changelog",
            component: Changelog,
        },
    ],
});

createApp(App).use(router).mount("#app");