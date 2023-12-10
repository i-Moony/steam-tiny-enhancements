import NotificationId from "../lib/notification/id";
import handleInstallEvent from "./background/handleInstallEvent";
import handleNotificationClick from "./background/handleNotificationClick";

browser.runtime.onInstalled.addListener(handleInstallEvent);
browser.notifications.onClicked.addListener(async (notificationId) => await handleNotificationClick(<NotificationId> notificationId));