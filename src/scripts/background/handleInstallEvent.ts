import setBadgeIcon from "../../lib/misc/badge-icon";
import { LocalStorage } from "../../lib/storage/local";

async function handleInstallEvent({ reason, temporary, previousVersion }: browser.runtime._OnInstalledDetails): Promise<void>
{
    switch (reason)
    {
        case "install":
            return handleInstall(temporary);
        case "update":
            return handleUpdate(previousVersion);
    };
};

async function handleInstall(temporary:boolean): Promise<void>
{
    await LocalStorage.init(temporary);

    setBadgeIcon("I");

    await browser.notifications.create
    ({
        type: "basic",
        iconUrl: browser.runtime.getURL("static/ste-square-256.png"),

        title: browser.i18n.getMessage("onInstallNotificationTitle"),
        message: browser.i18n.getMessage("onInstallNotificationMessage"),
        /*
        Leave it here until Chrome support arrives.
        Firefox doesn't support any of these.
        contextMessage: browser.i18n.getMessage("userCanTurnOffNotifications"),
        isClickable: true,
        */
    });

    return;
};

async function handleUpdate(previousVersion:string): Promise<void>
{
    await LocalStorage.handleExtensionUpdate();

    setBadgeIcon("U");

    const settings = await LocalStorage.getAllClean();

    const currentVersion = browser.runtime.getManifest().version;

    if (notBugfixUpdate(previousVersion, currentVersion) && settings.notifyOnUpdate)
    {
        await browser.notifications.create
        ({
            type: "basic",
            iconUrl: browser.runtime.getURL("static/ste-square-256.png"),

            title: browser.i18n.getMessage("onUpdateNotificationTitle"),
            message: browser.i18n.getMessage("onUpdateNotificationMessage", [previousVersion, currentVersion]),
            /*
            Leave it here until Chrome support arrives.
            Firefox doesn't support any of these.
            contextMessage: browser.i18n.getMessage("userCanTurnOffNotifications"),
            isClickable: true,
            */
        });
    };

    return;
};

function notBugfixUpdate(previousVersion:string, currentVersion:string): boolean
{
    const currentVersionNumbers = currentVersion.split(".");
    const previousVersionNumbers = previousVersion.split(".");

    const majorDifference = currentVersionNumbers[0] !== previousVersionNumbers[0];
    const minorDifference = currentVersionNumbers[1] !== previousVersionNumbers[1];

    return majorDifference || minorDifference;
};

export default handleInstallEvent;