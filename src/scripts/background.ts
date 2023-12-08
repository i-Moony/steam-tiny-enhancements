import handleInstallEvent from "./background/handleInstallEvent";
import { SessionStorage } from "../lib/storage/session";

browser.runtime.onInstalled.addListener(handleInstallEvent);
browser.runtime.onStartup.addListener(flushSessionStorage);

function flushSessionStorage()
{
    SessionStorage.flush();
};