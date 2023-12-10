import getSessionId from "../../lib/inject/get-session-id";
import getUserId from "../../lib/inject/get-user-id";
import { LocalStorage } from "../../lib/storage/local";

getUserData();

async function getUserData()
{
    const userId = getUserId();
    const sessionId = getSessionId();

    await LocalStorage.set({ userId, sessionId });

    return;
};