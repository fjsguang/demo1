import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            dts: true,
            imports: ["vue", "vue-router", "pinia"],
        }),
    ],
    resolve: {
        // 配置路径别名
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
