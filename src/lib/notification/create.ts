import NotificationId from "./id";

async function createNotification(id:NotificationId, options?:Partial<browser.notifications.CreateNotificationOptions>): Promise<string>
{
    const defaultOptions:browser.notifications.CreateNotificationOptions =
    {
        type: "basic",
        iconUrl: browser.runtime.getURL("img/default/ste-square-256.png"),

        title: browser.i18n.getMessage(`${id}Title`),
        message: browser.i18n.getMessage(`${id}Message`),
        /*
        Leave it here until Chrome support arrives.
        Firefox doesn't support any of these.
        contextMessage: browser.i18n.getMessage("userCanTurnOffNotifications"),
        isClickable: true,
        */
    };

    return browser.notifications.create(id, {...defaultOptions, ...options});
};

export default createNotification;