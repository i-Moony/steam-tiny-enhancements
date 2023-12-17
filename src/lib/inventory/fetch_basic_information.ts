import { InventoryContext } from "../data/inventory_context";
import scrapeVariables from "../data/scrape_variables";

async function fetchBasicInformation(userCustomId:string, sessionId:string): Promise<InventoryContext>
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

    const htmlText = await response.text();

    const parser = new DOMParser();
    const html = parser.parseFromString(htmlText, "text/html");
    
    const economyScriptContainer = html.querySelector("#responsive_page_template_content");
    const economyScript = economyScriptContainer.querySelector("script");

    const inventoryContext = scrapeVariables<InventoryContext>(economyScript.textContent);

    return inventoryContext;
};

export default fetchBasicInformation;