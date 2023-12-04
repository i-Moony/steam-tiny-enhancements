interface ManagedStorage
{
    steam:
    {
        user:
        {
            session:
            {
                id: string,
            },
            id: string,
        },
    },
};

async function getManagedStorage(): Promise<ManagedStorage>
{
    const storage = await browser.storage.managed.get();

    return storage as ManagedStorage;
};

async function setManagedStorage(storage:ManagedStorage): Promise<void>
{
    await browser.storage.managed.set(storage);

    return;
};

export
{
    ManagedStorage,
    getManagedStorage,
    setManagedStorage,
};