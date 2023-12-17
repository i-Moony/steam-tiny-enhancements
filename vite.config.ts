import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import webExtension from "vite-plugin-web-extension";
import { fileURLToPath, URL } from "node:url";

export default defineConfig
({
    resolve:
    {
        alias:
        [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
    plugins:
    [
        webExtension
        ({
            browser: "firefox",
            disableAutoLaunch: true,
            watchFilePaths:
            [
                "src/"
            ]
        }),
        vuePlugin(),
    ],
    build:
    {
        outDir: "dist/firefox",
    },
});