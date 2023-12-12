import NotificationId from "../lib/notification/id";
import handleInstallEvent from "./background/handleInstallEvent";
import handleNotificationClickEvent from "./background/handleNotificationClickEvent";

browser.runtime.onInstalled.addListener(handleInstallEvent);
browser.notifications.onClicked.addListener(async (notificationId) => await handleNotificationClickEvent(<NotificationId> notificationId));