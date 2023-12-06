import injectScript from "./inject-script";

declare var g_steamID: string;

function getUserId(): string | null
{
    const result = injectScript(`${getUserIdScript}; ${getUserIdScript.name}()`, "steamUserId");

    return result
        ? result as string
        : null;
};

function getUserIdScript()
{
    try
    {
        document.querySelector("body").setAttribute("steamUserId", g_steamID);
    }
    catch (e) {};

    return;
};

export default getUserId;