interface InventoryContext
{
    bHasPendingGifts: boolean,
    g_bInChinaRealm: boolean,
    g_bInClient: false,
    g_bInventoryIsInModalDialog: boolean,
    g_bIsInMarketplace: boolean,
    g_bMarketAllowed: boolean,
    g_bViewingOwnProfile: boolean,
    g_rgAppContextData: {[key:string]: AppContext},
    g_rgWalletInfo: WalletInfo,
    g_strCountryCode: string,
    g_strLanguage: string,
    g_strProfileURL: string,
};

interface AppContext
{
    appid: number,
    asset_count: number,
    icon: string,
    inventory_logo: string,
    link: string,
    load_failed: number,
    name: string,
    owner_only: boolean,
    rgContexts: {[key:string]: RgContext},
    store_vetted: string,
    trade_permissions: "FULL",
};

interface RgContext
{
    asset_count: number,
    id: string,
    name: string,
};

interface WalletInfo
{
    rwgrsn: number,
    success: boolean,
    wallet_balance: string,
    wallet_country: string,
    wallet_currency: number,
    wallet_delayed_balance: string,
    wallet_fee: string,
    wallet_fee_base: string,
    wallet_fee_minimum: string,
    wallet_fee_percent: string,
    wallet_max_balance: string,
    wallet_publisher_fee_percent_default: string,
    wallet_state: string,
    wallet_trade_max_balance: string,
};

export 
{
    InventoryContext,
    AppContext,
    RgContext,
    WalletInfo,
};