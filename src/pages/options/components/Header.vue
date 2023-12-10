<script setup lang="ts"></script>

<template>
    <header class="flex justify-center align-middle uppercase bg-steam-dark-bg text-steam-light sticky">
        <div id="extenion-logo-container" class="flex items-center w-[62rem] h-20">
            <div id="logo-wrapper h-14">
                <img class="h-14" src="/static/ste-transparent-256.png" id="extension-logo" draggable="false" />
            </div>
            <h1 class="font-bold text-2.5xl px-2" id="extension-title">Steam Tiny Enhancements</h1>
        </div>
    </header>
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
        color: white;
        @apply text-[1.75rem];
    }

    #extension-title
    {
        font-family: "Motiva Sans", Sans-serif;
    }
</style>