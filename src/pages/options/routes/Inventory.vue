<script setup lang="ts">
    import fetchBasicInformation from '../../../lib/inventory/fetchBasicInformation';
    import fetchCustomId from "../../../lib/profile/fetchCustomId";
    import { LocalStorage } from '../../../lib/storage/local';

    let storage = await LocalStorage.getAll();

    if (!storage.userCustomId)
    {
        const customId = await fetchCustomId(storage.userId);

        await LocalStorage.set({userCustomId: customId});

        storage = await LocalStorage.getAll();
    };

    await fetchBasicInformation(storage.userCustomId, storage.sessionId);
</script>

<template>
    <p>Inventory!</p>
</template>

<style scoped></style>