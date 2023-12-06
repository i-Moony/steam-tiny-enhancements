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
        return LocalStorage.set({session: data});
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