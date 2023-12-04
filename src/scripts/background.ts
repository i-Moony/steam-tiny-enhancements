import { LocalStorage } from "../lib/storage/local";
import { SessionStorage } from "../lib/storage/session";

browser.runtime.onInstalled.addListener(initStorage);
browser.runtime.onStartup.addListener(flushSessionStorage);

function initStorage()
{
    LocalStorage.init();
};

function flushSessionStorage()
{
    SessionStorage.flush();
};