<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/store";

import("./iconfont.js");

const {
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
} = storeToRefs(useStore());
let main, move;

onMounted(() => {
    init();
});

function init() {
    setWidthHeight();
    setRenderDate();

    nextTick(() => {
        checkDisabled();
    });
}
function setWidthHeight() {
    main = document.querySelector(".main");
    move = document.querySelector(".move");
    main.style.height = `${size.value * rows.value + size.value * 2}px`;
    main.style.width = `${size.value * cols.value}px`;
    move.style.height = `${size.value}px`;
    move.style.width = `${size.value * maxlength.value}px`;
}

// 初始化所有的数据
function setRenderDate() {
    // mainList.value = [];
    for (let ly = layerCount.value; ly > 0; ly--) {
        for (let i = 0; i < rows.value; i++) {
            for (let j = 0; j < cols.value; j++) {
                // 135层对齐
                let pyStep = ly % 2 === 0 ? size.value / 2 : 0;
                let item = Math.random() * 100 < odds.value && renderDate.value.pop();
                if (item) {
                    mainList.value.push({ ...item, ly, i, j, pyStep });
                }
            }
        }
    }
}

function checkDisabled() {
    mainList.value.forEach(item => {
        const ly = item.ly;
        const i = item.i;
        const j = item.j;
        item.disabled = false;

        const ou = ly % 2 === 0;
        if (ly + 1 > layerCount.value) {
            item.disabled = false;
        } else {
            for (let cly = ly + 1; cly <= layerCount.value; cly++) {
                const ouTop = cly % 2 === 0;

                if (ou === ouTop) {
                    const res = !!main.querySelector("#m" + `${cly}-${i}-${j}`);

                    if (res) {
                        item.disabled = true;
                        break;
                    } else {
                        item.disabled = false;
                    }
                } else if (ou && !ouTop) {
                    const res = [`${cly}-${i}-${j}`, `${cly}-${i + 1}-${j}`, `${cly}-${i}-${j + 1}`, `${cly}-${i + 1}-${j + 1}`].some(k => {
                        return !!main.querySelector("#m" + k);
                    });

                    if (res) {
                        item.disabled = true;
                        break;
                    } else {
                        item.disabled = false;
                    }
                } else if (!ou && ouTop) {
                    const res = [`${cly}-${i}-${j}`, `${cly}-${i - 1}-${j}`, `${cly}-${i}-${j - 1}`, `${cly}-${i - 1}-${j - 1}`].some(k => {
                        return !!main.querySelector("#m" + k);
                    });

                    if (res) {
                        item.disabled = true;
                        break;
                    } else {
                        item.disabled = false;
                    }
                }
            }
        }
    });
}

// 点击卡片进行消除计算,先走动画，再添加移除元素
let canMove = true;
function moveClick(item, index, e) {
    const me = e.target;

    if (item.disabled || !canMove) {
        return;
    }

    canMove = false;

    let left = move.offsetLeft - size.value - 4;
    let top = move.offsetTop - size.value / 2 - 4;

    if (moveList.value.length > 0) {
        let el = move.lastElementChild;
        left = el.offsetLeft + size.value;
    }

    me.style.top = `${top}px`;
    me.style.left = `${left}px`;
    me.transitionNamesCount = 0;
    me.ontransitionend = e => {
        me.transitionNamesCount++;
        if (me.transitionNamesCount === 2) {
            moveEnd(item, index, me);
            canMove = true;
        }
    };
}

// 动画结束后，保存移除 添加 消除 是否到达阈值
function moveEnd(item, index, me) {
    me.ontransitionend = null;

    mainList.value.splice(index, 1);
    moveList.value.push(item);
    nextTick(() => {
        const findResult = moveList.value.filter(k => item.name === k.name);

        if (findResult.length >= 3) {
            for (let i = moveList.value.length - 1; i >= 0; i--) {
                if (moveList.value[i].name === item.name) {
                    moveList.value.splice(i, 1);
                }
            }
        }

        if (moveList.value.length === maxlength.value) {
            alert("游戏结束");
            return location.reload();
        } else if (mainList.value.length === 0) {
            return alert("恭喜通关");
        }

        nextTick(() => {
            checkDisabled();
        });
    });
}
</script>

<template>
    <button @click="init">重置</button>
    <div class="main">
        <div
            v-for="(item, index) of mainList"
            :key="'m' + item.ly + '-' + item.i + '-' + item.j"
            class="item"
            :class="{ disabled: item.disabled }"
            @click="moveClick(item, index, $event)"
            :id="'m' + item.ly + '-' + item.i + '-' + item.j"
            :style="{
                width: size + 'px',
                height: size + 'px',
                left: size * item.j + item.pyStep + 'px',
                top: size * item.i + item.pyStep + 'px',
                backgroundColor: item.color,
                zIndex: item.ly * 2 + 100,
            }"
        >
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-' + item.name"></use>
            </svg>
        </div>
    </div>
    <div class="move">
        <div
            v-for="item of moveList"
            class="item"
            :id="'m' + item.ly + '-' + item.i + '-' + item.j"
            :style="{
                width: size + 'px',
                height: size + 'px',
                backgroundColor: item.color,
            }"
        >
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-' + item.name"></use>
            </svg>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
body {
    margin: 0;
}
.main {
    position: relative;
    margin: 0 auto;
}
.item {
    position: absolute;
    color: #fff;
    display: flex;
    box-shadow: 0 6px 14px 0 rgb(158 172 182 / 25%);
    justify-content: center;
    align-items: center;
    transition: top 0.3s, left 0.3s, transform 0.3s;
    border: 1px solid;
}
.item::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;
}
.item.disabled::after {
    background-color: rgba(0, 0, 0, 0.7);
}
.move {
    border: 1px solid #ddd;
    background-color: #ddd;
    margin: 0 auto;
}
.move .item {
    position: relative;
    float: left;
}
.icon {
    width: 50px;
    height: 50px;
    /* vertical-align: -0.15em; */
    fill: currentColor;
    overflow: hidden;
}
</style>
