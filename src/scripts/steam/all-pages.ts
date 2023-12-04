import getSessionId from "../../lib/get-session-id";
import getUserId from "../../lib/get-user-id";
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