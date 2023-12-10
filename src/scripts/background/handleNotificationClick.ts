import NotificationId from "../../lib/notification/id";

async function handleNotificationClick(notificationId:NotificationId): Promise<void>
{
    console.log(notificationId);

    switch (notificationId)
    {
        case NotificationId.onInstall:
            return openOnboardingPage();
        case NotificationId.onUpdate:
            return openChangelogPage();
    };
};

async function openOnboardingPage(): Promise<void>
{
    const optionsPage = browser.runtime.getURL("src/pages/options/index.html");

    await browser.tabs.create({url: `${optionsPage}#/onboarding`});

    return;
};

async function openChangelogPage(): Promise<void>
{
    const optionsPage = browser.runtime.getURL("src/pages/options/index.html");

    await browser.tabs.create({url: `${optionsPage}#/changelog`});

    return;
};

export default handleNotificationClick;