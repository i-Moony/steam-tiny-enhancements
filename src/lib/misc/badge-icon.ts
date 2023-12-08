function setBadgeIcon(text: string, color: browser.action.ColorValue = [255, 255, 255, 255], backgroundColor: browser.action.ColorValue = [255, 0, 0, 255]): void
{
    browser.action.setBadgeText({text});
    browser.action.setBadgeTextColor({color});
    browser.action.setBadgeBackgroundColor({color: backgroundColor});
};

export default setBadgeIcon;