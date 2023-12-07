import { LocalStorage } from "./local";

interface SessionStorageData
{
    sessionId?: string,
    userId?: string,
};

class SessionStorage
{
    public static async get<T>(key:string): Promise<T | undefined>
    {
        const storage = await LocalStorage.get("session");

        return storage[key];
    };

    public static async getAll(): Promise<SessionStorageData>
    {
        const storage = await LocalStorage.get("session");

        return storage as SessionStorageData;
    };

    public static async set(data:Partial<SessionStorageData>): Promise<void>
    {
        let updateData = await this.getAll();

        for (const key of Object.keys(data))
            updateData[key] = data[key];

        return LocalStorage.set({session: updateData});
    };

    public static async remove(data:Array<keyof SessionStorageData> | string[]): Promise<void>
    {
        let updateData = await this.getAll();

        for (const key of data)
        {
            delete updateData[key];
        };

        return LocalStorage.set({session: updateData});
    };

    public static async flush(): Promise<void>
    {
        return LocalStorage.set({session: {}});
    };
};

export
{
    SessionStorage,
    SessionStorageData,
};