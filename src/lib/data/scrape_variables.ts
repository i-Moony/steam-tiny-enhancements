/**
 * This function does allow you to extract (or scrape) javascript variables from text as long as they are one-lined and end with either semicolon or line break.
 * 
 * This function might look silly and may be changed in future, but currently it is the fastest and safest method
 * to obtain variables from text without building abstract syntax trees and etc.
 * 
 * If you have better solutions I would like to read them.
 * @param scriptText Chunk of text.
 * @returns Object that contains all variables that function was able to scrape. Or null.
 */
function scrapeVariables<T>(scriptText:string): T
{
    const variables = {};

    let regex = /(var|const|let)\s+\S+\s+=\s+[^;|\n]+/g;

    const parsedStrings = scriptText.match(regex);

    if (!parsedStrings)
        return null;

    for (const parsedString of parsedStrings)
    {
        const splitted = parsedString
            .split("=")
            .map(prepareStringForParsing);

        try
        {
            variables[splitted[0]] = JSON.parse(splitted[1]);
        }
        catch (e)
        {
            continue;
        };
    };

    return variables as T;
};

/**
 * Trims string, removes const|var|let and replaces all quotes with double quotes.
 * @param string 
 * @returns 
 */
function prepareStringForParsing(string:string): string
{
    return string
        .trim()
        .replace(/(var|const|let)\s+/g, "")
        .replace(/['|`]/g, '"');
};

export default scrapeVariables;