import { AppContext } from "../data/inventory_context";
import wait from "../misc/wait";

const MAX_ITEMS = 1500;

async function fetchInventories(inventories: {[key:string]: AppContext}, userId:string, sessionId?:string): Promise<object>
{
    const data = {};

    for (const key of Object.keys(inventories))
    {
        data[key] = await fecthAppInventory(inventories[key], userId, sessionId);

        await wait(500);
    };

    return data;
};

async function fecthAppInventory(inventory:AppContext, userId:string, sessionId?:string): Promise<object>
{
    const data = {};

    for (const key of Object.keys(inventory.rgContexts))
    {
        data[key] = await fetchContext(inventory.appid, inventory.rgContexts[key].id, inventory.rgContexts[key].asset_count, userId, sessionId);

        await wait(300);
    };

    return data;
};

async function fetchContext(appId:number, context:string, assetCount:number, userId:string, sessionId?:string): Promise<object>
{  
    let data = 
    {
        assets: [],
        descriptions: [],
        rwgrsn: 0,
        total_inventory_count: 0,
    };

    const fetchTimes = Math.ceil(assetCount / MAX_ITEMS);

    const headers = new Headers();
    
    if (sessionId)
        headers.set("Cookie", `sessionId=${sessionId};`);

    for (let i = 0; i < fetchTimes; i++)
    {
        let url = `https://steamcommunity.com/inventory/${userId}/${appId}/${context}?l=english&count=${assetCount - i*MAX_ITEMS}`;

        if (i > 0)
            url += `&start_assetid=${data.assets[data.assets.length - 1].assetid}`;

        const respone = await fetchRetry(url, 700, 5, {headers});

        const responeJson = await respone.json();

        data.assets = [...data.assets, responeJson.assets];
        data.descriptions = [...data.descriptions, responeJson.descriptions];
        data.rwgrsn = responeJson.rwgrsn;
        data.total_inventory_count = responeJson.total_inventory_count;

        await wait(300);
    };

    return data;
};

async function fetchRetry(url:string, delay:number, attemtps:number, fetchOptions:RequestInit = {}): Promise<Response>
{
    async function handleError(err)
    {
        attemtps--;

        if (attemtps <= 0)
            throw err;

        await wait(delay);

        return fetchRetry(url, delay, attemtps, fetchOptions);
    };

    return fetch(url, fetchOptions).catch(handleError);
};

export default fetchInventories;