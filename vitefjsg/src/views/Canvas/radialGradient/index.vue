<template>
    <canvas ref="ctxRef"></canvas>
</template>

<script setup lang="ts">
import { VNodeRef } from "vue";
let ctx;
const ctxRef: VNodeRef = ref(null);

onMounted(() => {
    ctx = ctxRef.value.getContext("2d");

    setInterval(() => {
        ctx.clearRect(0, 0, 150, 150);
        draw();
    }, 100);
});
const color1 = ["#A7D30C", "#019F62", "rgba(1,159,98,0)"];
const color2 = ["#FF5F98", "#FF0188", "rgba(255,1,136,0)"];
const color3 = ["#00C9FF", "#00B5E2", "rgba(0,201,255,0)"];
const color4 = ["#F4F201", "#E4C700", "rgba(228,199,0,0)"];

const radiuObj1 = {
    newR1: 10,
    odR1: 10,
    newR2: 30,
    zs: true,
};

const radiuObj2 = {
    newR1: 20,
    odR1: 20,
    newR2: 50,
    zs: true,
};

const radiuObj3 = {
    newR1: 15,
    odR1: 15,
    newR2: 40,
    zs: false,
};

const radiuObj4 = {
    newR1: 30,
    odR1: 30,
    newR2: 60,
    zs: false,
};

function createGradient(xyArr, colorArr) {
    // 创建渐变
    var radgrad = ctx.createRadialGradient(...xyArr);
    radgrad.addColorStop(0, colorArr[0]);
    radgrad.addColorStop(0.9, colorArr[1]);
    radgrad.addColorStop(1, colorArr[2]);
    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, 150, 150);
}

function setRadiu(obj) {
    if (obj.zs) {
        if (obj.newR1 < 1.5 * obj.odR1) {
            obj.newR1 += 1;
            obj.newR2 += 1;
        } else {
            obj.newR1 -= 1;
            obj.newR2 -= 1;
            obj.zs = false;
        }
    } else {
        if (obj.newR1 > obj.odR1 / 2) {
            obj.newR1 -= 1;
            obj.newR2 -= 1;
        } else {
            obj.newR1 += 1;
            obj.newR2 += 1;
            obj.zs = true;
        }
    }

    return [obj.newR1, obj.newR2];
}

function draw() {
    const xyArr1 = [45, 45, setRadiu(radiuObj1)[0], 52, 50, setRadiu(radiuObj1)[1]];
    const xyArr2 = [105, 105, setRadiu(radiuObj2)[0], 112, 120, setRadiu(radiuObj2)[1]];
    const xyArr3 = [95, 15, setRadiu(radiuObj3)[0], 102, 20, setRadiu(radiuObj3)[1]];
    const xyArr4 = [0, 150, setRadiu(radiuObj4)[0], 0, 140, setRadiu(radiuObj4)[1]];
    createGradient(xyArr1, color1);
    createGradient(xyArr2, color2);
    createGradient(xyArr3, color3);
    createGradient(xyArr4, color4);
}
</script>
