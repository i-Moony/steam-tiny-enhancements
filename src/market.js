const searchPages = document.querySelector("#searchResults_links");
let maxPage = parseInt(searchPages.lastChild.textContent)
let entries = document.URL.match(/#p([0-9]+)_popular_desc/g);

createSearch();

window.addEventListener("hashchange", updateSearch);

function createSearch()
{
    const ownDiv = document.createElement("div");
    ownDiv.id = "STE_jump_to";
    ownDiv.classList.add("market_paging");

    const searchBox = document.createElement("input");
    searchBox.id = "STE_page_jumper_input";
    searchBox.type = "number";
    searchBox.min = 1;
    searchBox.max = maxPage;
    searchBox.value = (entries && entries.length > 0) ? parseInt(entries[0].split("_")[0].slice(2)) : 1;

    ownDiv.appendChild(searchBox);

    const submitButtonDiv = document.createElement("div");
    submitButtonDiv.id = "STE_page_jumper_submit";
    submitButtonDiv.classList.add("btn_medium", "btn_green_white_innerfade");

    const submitButtonSpan = document.createElement("span");
    submitButtonSpan.textContent = "Search";
    submitButtonDiv.appendChild(submitButtonSpan);

    ownDiv.appendChild(submitButtonDiv);

    const searchDiv = document.querySelector("#searchResults_ctn"),
    parentNode = searchDiv.parentNode;

    parentNode.insertBefore(ownDiv, searchDiv.nextSibling);

    searchBox.addEventListener("input", () => {
        if (searchBox.valueAsNumber > maxPage)
            searchBox.value = maxPage;

        if (searchBox.value.includes(",") || searchBox.value.includes("."))
            searchBox.value = Math.floor(searchBox.valueAsNumber);
    });

    submitButtonDiv.addEventListener("click", () => {
        const page = Math.min(Math.floor(searchBox.valueAsNumber), maxPage);

        const goto = document.createElement("a");
        goto.href = (entries && entries.length > 0) ? document.URL.replace(/#p([0-9]+)_/g, `#p${page}_`) : document.URL + `#p${page}_`;
        goto.click();
    });

    searchBox.addEventListener("keypress", (event) => {
        if (event.key !== "Enter")
            return;

        event.preventDefault();
        submitButtonDiv.click();
    });
};

function updateSearch()
{
    maxPage = parseInt(searchPages.lastChild.textContent);
    entries = document.URL.match(/#p([0-9]+)_popular_desc/g);

    const searchBox = document.querySelector("#STE_page_jumper_input");
    searchBox.max = maxPage;
    searchBox.value = (entries && entries.length > 0) ? parseInt(entries[0].split("_")[0].slice(2)) : 1;
};