const puppeteer = require('puppeteer');

const CI_SANDBOX_ARGS = ['--no-sandbox', '--disable-setuid-sandbox'];

const isCiEnvironment = () =>
    process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

const launchBrowser = () => {
    const args = isCiEnvironment() ? [...CI_SANDBOX_ARGS] : [];
    return puppeteer.launch({
        headless: 'new',
        args,
    });
};

module.exports = {
    puppeteer,
    launchBrowser,
};
