import { ref, reactive } from "vue";
import { computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
    // 基础数据
    const simpleDate = reactive([
        { name: "laoshu", color: "rgb(0, 0, 255)", show: true },
        { name: "niu", color: "rgb(128, 0, 255)", show: true },
        { name: "laohu", color: "rgb(255, 0, 255)", show: true },
        { name: "tuzi", color: "rgb(255, 0, 128)", show: true },
        { name: "long", color: "rgb(255, 0, 0)", show: true },
        { name: "she", color: "rgb(255, 128, 0)", show: true },
        { name: "ma", color: "rgb(255, 255, 0)", show: true },
        { name: "yang", color: "rgb(128, 255, 0)", show: true },
        { name: "houzi", color: "rgb(0, 255, 0)", show: true },
        { name: "ji", color: "rgb(0, 255, 128)", show: true },
        { name: "gou", color: "rgb(0, 255, 255)", show: true },
        { name: "zhu", color: "rgb(0, 128, 255)", show: true },
    ]);
    // 卡片大小
    const size = ref(50);
    // 行
    const rows = ref(6);
    // 列
    const cols = ref(6);
    // 几个消除
    const oneGroupCount = ref(3);

    // 通关概率
    const odds = ref(60);
    // 最大多少
    const maxlength = ref(6);

    // 卡片集合
    const mainList = ref([]);
    const moveList = ref([]);

    // 每种有几组 比如此时18个老鼠
    const group = computed(() => cols.value * oneGroupCount.value);

    // 卡片数据
    const renderDate = computed(() => {
        return Array.from(Array(oneGroupCount.value * group.value), () => simpleDate.filter(v => !!v.show))
            .flat()
            .sort(v => Math.random() - 0.5);
    });

    // 层数
    const layerCount = computed(() => {
        return Math.ceil(renderDate.value.length / rows.value / cols.value);
    });

    return {
        simpleDate, //基础数据
        size, // 卡片大小
        rows,
        cols,
        oneGroupCount, //几个消除
        odds, //通关概率
        maxlength, // 可以放几个动物
        mainList, // main中的值
        moveList, // 槽中的值
        group, //每个小动物有多少只
        renderDate, // 当前操作数据
        layerCount, // 层数
    };
});
