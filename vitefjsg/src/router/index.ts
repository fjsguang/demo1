import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "DongHua",
        component: () => import("@/views/Home/index.vue"),
        meta: { title: "Loading..." },
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home/Home.vue"),
        meta: { title: "风就是光" },
    },
    {
        path: "/games",
        name: "Game",
        component: () => import("@/views/Games/index.vue"),
        meta: { title: "小游戏" },
        children: [
            {
                path: "shiershengxiao",
                name: "ShiErShengXiao",
                component: () => import("@/views/Games/shiErShengXiao/index.vue"),
                meta: { title: "十二生肖总动员" },
            },
        ],
    },
    {
        path: "/canvas",
        name: "Canvas",
        component: () => import("@/views/Canvas/index.vue"),
        meta: { title: "canvas" },
    },
    {
        path: "/leanRoad",
        name: "LEANROAD",
        component: () => import("@/views/LeanRoad/index.vue"),
        meta: { title: "学习历程" },
    },
    {
        path: "/rectangle",
        name: "rectangle",
        component: () => import("@/views/rectangle/index.vue"),
        meta: { title: "学习历程" },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async to => {
    if (to.meta.title) {
        // 判断是否有标题
        document.title = to.meta.title as string;
    }
});

export default router;
