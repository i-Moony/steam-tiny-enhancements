import injectScript from "./inject-script";

declare var g_steamID: string;

function getUserId(): string | null
{
    const result = injectScript(`${getUserIdScript.toString()}; getUserIdScript()`, "steamUserId");

    return result
        ? result as string
        : null;
};

function getUserIdScript()
{
    document.querySelector("body").setAttribute("steamUserId", g_steamID);
};

export default getUserId;