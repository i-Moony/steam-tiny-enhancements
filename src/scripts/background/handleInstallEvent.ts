import setBadgeIcon from "../../lib/misc/badge-icon";
import createNotification from "../../lib/notification/create";
import NotificationId from "../../lib/notification/id";
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

    await createNotification(NotificationId.onInstall);

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
        const translatedMessage = browser.i18n.getMessage(`${NotificationId.onUpdate}Message`, [previousVersion, currentVersion]);

        await createNotification(NotificationId.onUpdate, {message: translatedMessage});
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