async function fetchCustomId(userId:string): Promise<string>
{
    const fetchUrl = `https://steamcommunity.com/profiles/${userId}`;

    let response:Response;

    try
    {
        response = await fetch(fetchUrl);
    }
    catch (e)
    {
        return null;
    };

    const profileUrl = response.url;
    const splittedUrl = profileUrl.split("/").filter((part) => part.length > 0);

    return splittedUrl[splittedUrl.length - 1];
};

export default fetchCustomId;