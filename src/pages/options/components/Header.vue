<script setup lang="ts">
import RouterCategory from './RouterCategory.vue';
import RouterCategoryEntry from './RouterCategoryEntry.vue';
</script>

<template>
    <header id="main-header" class="flex justify-center align-middle bg-steam-dark-bg text-steam-light sticky flex-wrap">
        <div id="extenion-logo-container" class="flex items-center w-[62rem] h-20 uppercase">
            <div id="logo-wrapper h-14">
                <img class="h-14" src="/static/ste-transparent-256.png" id="extension-logo" draggable="false" />
            </div>
            <h1 class="font-bold text-2.5xl px-2" id="extension-title">Steam Tiny Enhancements</h1>
        </div>
        <hr id="split-header">
        <div id="router-links" class="flex items-center w-[62rem] h-10">
            <router-category title="Settings" default-href="/settings">
                <router-category-entry to="/settings/general">
                    General
                </router-category-entry>
                <router-category-entry to="/settings/developer">
                    Developer
                </router-category-entry>
            </router-category>
        </div>
        <hr id="down-outline">
    </header>
    <hr id="down-outline-glow">
</template>

<style scoped>
    *
    {
        user-select: none;
        -moz-user-select: none;
        transition-timing-function:cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    #extension-logo
    {
        transition: 0.4s;
    }

    #extension-logo:hover
    {
        transform: rotateZ(720deg);
        cursor: crosshair;
        @apply h-[4.25rem];
    }

    #extension-title
    {
        transition: 0.4s;
    }

    #extension-title:hover
    {
        @apply text-[1.75rem];
        color: #1a9fff;
    }

    #extension-title
    {
        font-family: "Motiva Sans", Sans-serif;
    }

    #split-header
    {
        width: 100%;
        height: 0;
        margin: 0;
        border: 0;
    }

    #down-outline
    {
        width: 100%;
        height: 2px;
        margin: 0;
        border: 0;
        background: linear-gradient(0.25turn, #00ccff, #3366ff);
    }

    #down-outline-glow
    {
        position: relative;
        width: 100%;
        height: 2px;
        filter: blur(10px);
        z-index: -5;
        background: linear-gradient(0.25turn, #00ccff, #3366ff);
    }

    #router-links *
    {
        padding-right: 1.5rem;
    }
</style>