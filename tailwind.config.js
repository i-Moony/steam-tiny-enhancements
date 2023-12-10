/** @type {import('tailwindcss').Config} */
export default
{
    content:
    [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme:
    {
        extend:
        {
            colors:
            {
                "steam-dark-bg": "#171a21",
                "steam-light": "#B8BCBF",
            },
            fontSize:
            {
                "2.5xl": ['1.65rem', '2.125rem'],
            },
        },
    },
    plugins: [],
};