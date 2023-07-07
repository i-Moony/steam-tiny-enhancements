/*
 * Copyright © 2023 Danila Kononov (nickname: moony). All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cachedInventories = {};

injectIfOwner();

function injectIfOwner()
{
    if (!document.querySelector(".inventory_links"))
        return;

    buildButton();
    updateButton();
    
    window.addEventListener("hashchange", updateButton);

    return;
};

function updateButton()
{
    const { steamId64, gameId, gameContext } = findInventoryInfo();

    fetchInventory(steamId64, gameId, gameContext).then((url) => {
        if (!url || url === null)
            return hideButton();

        return setButtonUrl(url);
    });
};

function setButtonUrl(url)
{
    const button = document.querySelector("#STE_sell_inventory");

    button.style.display = "";
    button.href = url;

    return;
};

function hideButton()
{
    const button = document.querySelector("#STE_sell_inventory");

    button.style.display = "none";

    return;
};

function buildButton()
{
    const sellThisInventoryHref = document.createElement("a");
    sellThisInventoryHref.classList.add("btn_medium");
    sellThisInventoryHref.classList.add("btn_darkblue_white_innerfade");
    sellThisInventoryHref.id = "STE_sell_inventory";
    sellThisInventoryHref.style.display = "none";
    
    const sellThisInventorySpan = document.createElement("span");

    const abbreviation = document.createElement("abbr");
    abbreviation.title = "Opens window to bulk sell not unique items. E.G. cases, capsules and so on..."
    abbreviation.textContent = "Quick sell this inventory";
    sellThisInventorySpan.appendChild(abbreviation);
    
    sellThisInventoryHref.appendChild(sellThisInventorySpan);
    
    const holder = document.querySelector(".inventory_links .inventory_rightnav");
    holder.insertBefore(sellThisInventoryHref, holder.firstChild);

    return;
};

async function fetchInventory(steamId64, gameId, gameContext)
{
    console.log(cachedInventories);

    if (cachedInventories[gameId])
        return parseInventory(cachedInventories[gameId], gameId, gameContext);

    const fetchUrl = buildFetchUrl(steamId64, gameId, gameContext);

    const response = await fetch(fetchUrl);

    try
    {
        const parsedResponse = await response.json();

        cachedInventories[gameId] = parsedResponse;

        return parseInventory(parsedResponse, gameId, gameContext);
    }
    catch (e)
    {
        return null;
    };
};

function parseInventory(inventory, gameId, gameContext)
{
    if (inventory.error)
        return null;

    const { descriptions } = inventory;
    const itemIds = [];

    for (const description of descriptions)
    {
        const itemUnique = description.commodity !== 1,
        itemMarketable = description.marketable === 1;

        if (itemUnique)
            continue;

        if (!itemMarketable)
            continue;

        itemIds.push(description.market_hash_name);
    };

    const uniqueItemIds = Array.from(new Set(itemIds));

    return buildSellUrl(gameId, gameContext, uniqueItemIds);
};

function buildSellUrl(gameId, gameContext, itemIds)
{
    if (itemIds.length === 0)
        return null;

    return "https://steamcommunity.com/market/multisell" + "?" + "appid" + "=" + gameId + "&" + "contextid" + "=" + gameContext + "&" + serializeItemIds(itemIds); 
};

function serializeItemIds(itemIds)
{
    let serializedData = "";

    for (const itemId of itemIds)
        serializedData += encodeURIComponent("items[]") + "=" + encodeURIComponent(itemId) + "&";

    return serializedData.slice(0, -1);
};

function buildFetchUrl(steamId64, gameId, gameContext)
{
    return "https://steamcommunity.com/inventory/" + steamId64 + "/" + gameId + "/" + gameContext + "?l=english";
};

function findInventoryInfo()
{
    const inventoryElements = document.querySelectorAll("#inventories .inventory_ctn.clearfix");

    let steamId64, gameId, gameContext;

    for (const element of inventoryElements)
    {
        if (element.style.display.includes("none"))
            continue;

        const info = element.id.split("_");
        info.shift();

        steamId64 = info[0];
        gameId = info[1];
        gameContext = info[2];
    };

    gameContext = findGreatestContext(inventoryElements, steamId64, gameId);

    return {
        steamId64,
        gameId,
        gameContext
    };
};

function findGreatestContext(inventoryElements, steamId64, gameId)
{
    let greatestContext = 0;

    for (const element of inventoryElements)
        if (element.id.includes(`inventory_${steamId64}_${gameId}`))
            greatestContext = Math.max(greatestContext, parseInt(element.id.split("_")[3]));

    return greatestContext.toString();
};