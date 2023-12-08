import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import webExtension from "vite-plugin-web-extension";

export default defineConfig
({
    plugins:
    [
        webExtension
        ({
            browser: "firefox",
            webExtConfig:
            {
                firefox: "firefoxdeveloperedition",
            },
        }),
        vuePlugin(),
    ],
    build:
    {
        outDir: "dist/firefox",
    },
});