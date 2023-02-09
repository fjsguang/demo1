import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "DongHua",
        component: () => import("@/views/Home/index.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home/Home.vue"),
    },
    {
        path: "/games",
        name: "Game",
        component: () => import("@/views/games/index.vue"),
        children: [
            {
                path: "shiershengxiao",
                name: "ShiErShengXiao",
                component: () => import("@/views/games/shiErShengXiao/index.vue"),
                meta: { title: "十二生肖总动员" },
            },
        ],
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
