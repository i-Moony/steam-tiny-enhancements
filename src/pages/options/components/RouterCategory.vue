<script setup lang="ts">
    const properties = defineProps
    <{
        title: string,
        defaultHref: string,
    }> ();

    
</script>

<template>
    <div class="dropdown">
        <RouterLink v-bind:to = "properties.defaultHref" class="font-semibold active-text" draggable="false">
            {{ properties.title }}
        </RouterLink>
        <div class="dropdown-contents">
            <p>1</p>
        </div>
    </div>
</template>

<style scoped>
    .active-text
    {
        color: #1a9fff;
        text-decoration: underline;
        text-decoration-thickness: 2px;
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
        min-width: 20px;
        width: 100%;
        z-index: 1;
    }

    .dropdown:hover .dropdown-contents
    {
        display: block;
    }
</style>