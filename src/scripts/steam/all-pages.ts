import getSessionId from "../../lib/inject/get-session-id";
import getUserId from "../../lib/inject/get-user-id";
import { SessionStorage } from "../../lib/storage/session";

getUserData();

async function getUserData()
{
    const userId = getUserId();
    const sesionId = getSessionId();

    let storage = await SessionStorage.getAll();

    if (userId)
        storage.userId = userId;

    if (sesionId)
        storage.sessionId = sesionId;

    await SessionStorage.set(storage);

    return;
};