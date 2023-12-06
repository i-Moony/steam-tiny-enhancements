import injectScript from "./inject-script";

declare var g_sessionID: string;

function getSessionId(): string | null
{
    const result = injectScript(`${getSessionIdScript}; ${getSessionIdScript.name}()`, "steamSessionId");

    return result
        ? result as string
        : null;
};

function getSessionIdScript()
{
    try
    {
        document.querySelector("body").setAttribute("steamSessionId", g_sessionID);
    }
    catch (e) {};

    return;
};

export default getSessionId;