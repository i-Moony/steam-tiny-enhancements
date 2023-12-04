/**
 * List of attributes that extension is allowed to read.
 */
const allowedAttributes =
[
    "steamSessionId",
    "steamLoginSecure",
    "steamUserId",
];

/**
 * Injects script in page using script element.
 * If readAttribute is defined function validates it using {@link allowedAttributes} array.
 * @param script Script string.
 * @param readAttribute Optional. If defined function validates it using {@link allowedAttributes} and returns value of it.
 * @returns {unknown} It may be null or any other value.
 */
function injectScript(script:string, readAttribute:string = undefined): unknown
{
    if (readAttribute && !allowedAttributes.includes(readAttribute))
        return null;

    const tempElement = document.createElement("script");

    tempElement.setAttribute("onreset", `${script};`);
    tempElement.dispatchEvent(new CustomEvent("reset"));
    tempElement.removeAttribute("onreset");

    const body = document.querySelector("body");
    const result = body.getAttribute(readAttribute);

    if (result)
        body.removeAttribute(readAttribute);

    return result;
};

export default injectScript;