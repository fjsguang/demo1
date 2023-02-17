<script setup lang="ts">
import Clock from "@/views/Canvas/clock/index.vue";
</script>

<template>
    <header>
        <Clock />
        <div>一寸光阴一寸金，寸金难买寸光阴</div>
    </header>
</template>

<style scoped lang="less">
header {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        font-family: "xingkai";
        font-size: 30px;
    }
}
</style>
