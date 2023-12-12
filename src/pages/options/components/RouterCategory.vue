<script setup lang="ts">
    const properties = defineProps
    <{
        title: string,
        defaultHref: string,
    }> ();

    
</script>

<template>
    <div class="dropdown">
        <div class="dropdown-title">
            <RouterLink v-bind:to = "properties.defaultHref" class="font-semibold text-lg" draggable="false">
                {{ properties.title }}
            </RouterLink>
        </div>
        <div class="dropdown-contents">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .dropdown-title .router-link-active
    {
        color: #1a9fff;
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }

    .dropdown-title *:not(.router-link-active):hover
    {
        color: white;
    } 

    .dropdown-title
    {
        text-transform: uppercase;
    }
    
    .dropdown
    {
        position: relative;
        display: inline-block;
    }

    .dropdown-contents
    {
        display: none;
        position: absolute;
        background-color: #3D4450;
        z-index: 1;
    }

    .dropdown:hover .dropdown-contents
    {
        display: block;
    }
</style>