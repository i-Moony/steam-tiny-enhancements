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
        background:linear-gradient(0deg,#1b2838,#254c6b);
        min-width: max(100%, 1000px);
        min-height: max(100%, 600px);
    }
</style>