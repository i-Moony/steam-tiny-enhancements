import { SessionStorageData } from "./session";

interface LocalStorageData
{
    session: SessionStorageData,
    debug: boolean,
};

class LocalStorage
{
    public static defaultStorage:LocalStorageData =
    {
        session: {},
        debug: false
    };

    public static async get<T>(key:string): Promise<T | undefined>
    {
        const storage = await browser.storage.local.get(key);

        return storage[key];
    };

    public static async getAll(): Promise<LocalStorageData>
    {
        const storage = await browser.storage.local.get();

        return storage as LocalStorageData;
    };

    public static async getAllClean(): Promise<Omit<LocalStorageData, "session">>
    {
        const storage = await this.getAll();

        delete storage.session;

        return storage;
    };

    public static async set(data:Partial<LocalStorageData>): Promise<void>
    {
        await browser.storage.local.set(data);

        return;
    };

    public static async init(developer = false): Promise<void>
    {
        let data = LocalStorage.defaultStorage;

        data.debug = developer;

        return LocalStorage.set(data);
    };
};

export
{
    LocalStorage,
    LocalStorageData,
};