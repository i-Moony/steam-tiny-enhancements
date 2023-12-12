<script setup lang="ts">
    import Header from './components/Header.vue';
</script>

<template>
    <Header></Header>
    <RouterView></RouterView>
</template>

<style>
    html
    {
        /* background: #2a2d34; */
        /* background: radial-gradient(ellipse at top, #3e424d, #2a2d34); */
        /* background: #1d2229; */
        background: #2d3036;
        min-width: max(100%, 1000px);
        min-height: max(100%, 600px);
    }
</style>