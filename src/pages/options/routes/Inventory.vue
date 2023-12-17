<script setup lang="ts">
    import fetchBasicInformation from "@/lib/inventory/fetch_basic_information";
    import fetchCustomId from "@/lib/profile/fetchCustomId";
    import fetchInventories from "@/lib/inventory/fetch_inventories";
    import { LocalStorage } from '@/lib/storage/local';
    import { onMounted } from "vue";

    onMounted(wait);

    async function wait()
    {
        let storage = await LocalStorage.getAll();

        if (!storage.userCustomId || storage.userCustomId === "null")
        {
            const customId = await fetchCustomId(storage.userId);

            await LocalStorage.set({userCustomId: customId});

            storage = await LocalStorage.getAll();
        };

        const basicInformation = await fetchBasicInformation(storage.userCustomId, storage.sessionId);

        try
        {
            const inventory = await fetchInventories(basicInformation.g_rgAppContextData, storage.userId, storage.sessionId);

            console.log(inventory);
        }
        catch (e)
        {
            console.log(e);
        };
    };
</script>

<template>
    <p>Inventory!</p>
</template>

<style scoped></style>