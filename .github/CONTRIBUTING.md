# Contributing:
## Important notice:
**The issue tracker is for bug reports and enchancement suggetsions only. If you need help visit our [Discord Server]() instead.**

If you wish to contribute to Steam Tiny Enhancements codebase, feel free to fork and submit a pull request.

# Setup:
**To get ready to work on the codebase is enough to:**
1. Fork & Clone the repository. Switch to the dev branch.
2. Run `npm ci`.
3. Code what you seem to like.
4. Run `npm run build` to be sure that it builds successfully.
5. If everything is fine, submit a pull request (make sure you're following commit convention).
6. Write a perfect description for your pull request.

# Testing locally:
**If you want to text extension locally:**
1. Run `npm run watch` to enable automatic rebuilding on saving changes.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Press `Load Temporary Add-on...`.
4. Load extension.
5. If you updated some lines in the code hit `Reload` button to apply them.
6. Test your feature (but be careful, if you are not familiar with Steam rate limits, you may accidentally be rate-limited or even banned).

# Extension structure:
* `assets` folder contains various assets for the extension.
* `public` folder contains `_locales`, `static` and other files, folder that **ARE NOT** modified during build stage.
* `src` folder contains files and folders which **ARE** modified during build process.
    * `lib` folder contains every function and class that is reusable through the whole extension.
    * `pages` folder contains every file that is related to building extension's pages.
        * `options` contains options page for the extension.
        * `popup` contains page what is shown when user clicks extension action button.
    * `scripts` folder contains every script that is mentioned in `manifest.json` file.
    * `vite-env.d.ts` contains declaration for `.vue` files.
* `manifest.json` is extension's essential file that contains all necessary information for browser.
