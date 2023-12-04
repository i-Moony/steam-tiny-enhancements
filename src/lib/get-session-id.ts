import injectScript from "./inject-script";

declare var g_sessionID: string;

function getSessionId(): string | null
{
    const result = injectScript(`${getSessionIdScript.toString()}; getSessionIdScript()`, "steamSessionId");

    return result
        ? result as string
        : null;
};

function getSessionIdScript()
{
    document.querySelector("body").setAttribute("steamUserId", g_sessionID);
};

export default getSessionId;