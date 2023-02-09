<template>
    <div class="cardlist" v-if="route.path == '/games'">
        <div class="card animate__animated" @click="goGames(item.path)" v-for="(item, i) of gamelist" :key="item.path">
            <img :src="item.imgSrc" alt="十二生肖图片" />
            <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.introduction }}</p>
            </div>
        </div>
    </div>
    <RouterView v-else />
</template>

<script setup lang="ts">
import shiershengxiaoSrc from "./images/shiershengxiao.jpeg";
const router = useRouter();
const route = useRoute();
const gamelist = reactive([
    {
        name: "十二生肖",
        introduction: "游戏规则：三个相同的消除",
        path: "/games/shiershengxiao",
        imgSrc: shiershengxiaoSrc,
    },
]);

function goGames(path: string) {
    const { href } = router.resolve({ path });
    window.open(href, "_blank");
}
</script>

<style scoped lang="less">
.cardlist {
    display: flex;
    flex-wrap: wrap;

    .card {
        display: flex;
        flex-flow: column;
        width: 200px;
        margin: 10px;
        cursor: pointer;
        background-color: #f1f3f4;
        border-radius: 2px 2px 6px 6px;
        position: relative;
        padding-bottom: 30px;
        img {
            width: 100%;
        }
        div {
            height: 20px;
            line-height: 20px;
            box-shadow: 0 0px -2px 2px rgb(158 172 182 / 25%);
            height: 30px;
            overflow: hidden;
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            padding: 5px 10px;
            box-sizing: border-box;
            transition: all 0.5s;
            background-color: #f1f3f4;
            border-radius: 6px;

            h3 {
                font-family: "行楷-简";
            }

            p {
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }

    .card:hover {
        transform-origin: top center;
        animation-name: swing;
        div {
            height: 80px;
            background-color: #f1f3f4ee;
        }
    }

    @keyframes swing {
        20% {
            transform: rotate3d(0, 0, 1, 5deg);
        }

        40% {
            transform: rotate3d(0, 0, 1, -5deg);
        }

        60% {
            transform: rotate3d(0, 0, 1, 2deg);
        }

        80% {
            transform: rotate3d(0, 0, 1, -2deg);
        }

        to {
            transform: rotate3d(0, 0, 1, 0deg);
        }
    }

    @media screen and (max-width: 560px) {
        .card {
            width: 46%;
            margin: 2%;
        }
    }
}
</style>
