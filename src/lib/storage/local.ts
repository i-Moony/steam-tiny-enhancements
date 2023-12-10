interface StorageData
{
    debug: boolean,
    notifyOnUpdate: boolean,
};

interface SensitiveStorageData
{
    sessionId: string,
    userId: string,
};

interface LocalStorageData extends StorageData, SensitiveStorageData {};

class LocalStorage
{
    public static defaultStorage:LocalStorageData =
    {
        sessionId: null,
        userId: null,
        debug: false,
        notifyOnUpdate: true,
    };

    public static sensitiveKeys:Array<keyof SensitiveStorageData> =
    [
        "sessionId",
        "userId",
    ];

    public static async get<T>(key:keyof LocalStorageData): Promise<T | undefined>
    {
        const storage = await browser.storage.local.get(key);

        return storage[key];
    };

    public static async getAll(): Promise<LocalStorageData>
    {
        const storage = await browser.storage.local.get();

        return storage as LocalStorageData;
    };

    public static async getAllClean(): Promise<StorageData>
    {
        const storage = await this.getAll();

        for (const key of this.sensitiveKeys)
            delete storage[key];

        return storage as StorageData;
    };

    public static async set(data:Partial<LocalStorageData>): Promise<void>
    {
        await browser.storage.local.set(data);

        return;
    };

    public static async remove(data:Array<keyof LocalStorageData> | string[] | string): Promise<void>
    {
        await browser.storage.local.remove(data);

        return;
    };

    public static async init(developer = false): Promise<void>
    {
        let data = LocalStorage.defaultStorage;

        data.debug = developer;

        return LocalStorage.set(data);
    };

    public static async handleExtensionUpdate(): Promise<void>
    {
        let currentStorage = await this.getAll();

        for (const key of Object.keys(this.defaultStorage))
            if (!currentStorage[key])
                currentStorage[key] = this.defaultStorage[key];

        return this.set(currentStorage);
    };
};

export
{
    LocalStorage,
    StorageData,
    SensitiveStorageData,
    LocalStorageData,
};