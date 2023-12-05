interface Item
{
    appId: number,
    classId: string,
    instanceId: string,
    currency: number,
    background_color: string,
    icon_url: string,
    descriptions: Array<Description>,
    tradable: number,
    actions: Array<Action>,
    name: string,
    market_name: string,
    market_hash_name: string,
    commodity: number,
    marketable: number,
    tags: Array<Tag>
};

interface Description
{
    type: "html",
    value: string,
};

interface Action
{
    name: string,
    link: string,
};

interface Tag
{
    category: string,
    internal_name: string,
    localized_category_name: string,
    localized_tag_name: string,
};

export default Item;