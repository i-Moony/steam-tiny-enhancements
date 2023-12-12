<script setup lang="ts">
    const properties = defineProps
    <{
        to: string,
    }> ();
</script>

<template>
    <div>
        <RouterLink v-bind:to="properties.to" class="text-sm" draggable="false">
            <slot></slot>  
        </RouterLink>
    </div>
</template>

<style scoped>
    div
    {
        margin: 0;
        padding-left: 0.65rem;
        padding-right: 0.65rem;
        padding-top: 0.35rem;
        padding-bottom: 0.35rem;
        color: #daddde;
    }

    div:hover
    {
        background-color: #daddde;
        color: #3D4450;
    }
</style>