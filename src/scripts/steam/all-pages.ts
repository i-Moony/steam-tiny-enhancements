import getSessionId from "../../lib/get-session-id";
import getUserId from "../../lib/get-user-id";
import { setManagedStorage, getManagedStorage } from "../../lib/storage";

getUserData();

async function getUserData()
{
    const userId = getUserId();
    const sesionId = getSessionId();

    let storage = await getManagedStorage();

    if (userId)
        storage.steam.user.id = userId;

    if (sesionId)
        storage.steam.user.session.id = sesionId;

    await setManagedStorage(storage);

    return;
};