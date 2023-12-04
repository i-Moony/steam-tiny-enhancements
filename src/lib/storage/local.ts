import { SessionStorageData } from "./session";

interface LocalStorageData
{
    session: SessionStorageData,
};

class LocalStorage
{
    public static defaultStorage:LocalStorageData = {session: {}};

    public static async get(key:string): Promise<unknown>
    {
        const storage = await browser.storage.local.get(key);

        return storage[key];
    };

    public static async getAll(): Promise<LocalStorageData>
    {
        const storage = await browser.storage.local.get();

        return storage as LocalStorageData;
    };

    public static async set(data:Partial<LocalStorageData>): Promise<void>
    {
        await browser.storage.local.set(data);

        return;
    };

    public static async init(): Promise<void>
    {
        return LocalStorage.set(LocalStorage.defaultStorage);
    };
};

export
{
    LocalStorage,
    LocalStorageData,
};