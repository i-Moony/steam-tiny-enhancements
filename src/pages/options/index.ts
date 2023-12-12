import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Settings from "./routes/Settings.vue";
import General from "./routes/Settings/General.vue";
import Developer from "./routes/Settings/Developer.vue";
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
            path: "/",
            redirect: "/settings",
        },
        {
            path: "/settings",
            component: Settings,
            redirect: "/settings/general",
            children:
            [
                {
                    path: "general",
                    component: General,
                },
                {
                    path: "developer",
                    component: Developer,
                },
            ],
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