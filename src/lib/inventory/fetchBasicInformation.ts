async function fetchBasicInformation(userCustomId:string, sessionId:string): Promise<null>
{
    if (!userCustomId || !sessionId)
        return null;

    let response:Response;

    const headers = new Headers();

    headers.set("Cookie", `sessionId=${sessionId};`);

    try
    {
        response = await fetch(`https://steamcommunity.com/id/${userCustomId}/inventory`, {headers});
    }
    catch (e)
    {
        return null;
    };

    const parser = new DOMParser();
    const html = parser.parseFromString(await response.text(), "text/html");

    const header = html.querySelector("#global_header");
    const generalScript = header.nextElementSibling;
    const economyScriptContainer = html.querySelector("#responsive_page_template_content");
    const economyScript = economyScriptContainer.querySelector("script");

    return null;
};

export default fetchBasicInformation;