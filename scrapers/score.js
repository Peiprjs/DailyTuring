const puppeteer = require('puppeteer'); // v20.7.4 or later
const screenshotPath = "test.jpeg";

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 840,
            height: 931
        })
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto('https://turingmachine.info/');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(DAILY CHALLENGE)'),
            targetPage.locator('a.yellow'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div/a[3])'),
            targetPage.locator(':scope >>> a.yellow'),
            targetPage.locator('::-p-text(Daily Challenge)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 166.640625,
                y: 14.953125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(GENERATE)'),
            targetPage.locator('div.content > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[1]/input)'),
            targetPage.locator(':scope >>> div.content > input'),
            targetPage.locator('::-p-text(GENERATE)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 178.140625,
                y: 10.34375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Test a Code)'),
            targetPage.locator('input.fullgreen'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[4]/input[1])'),
            targetPage.locator(':scope >>> input.fullgreen'),
            targetPage.locator('::-p-text(Test a Code)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 137.140625,
                y: 24.859375,
              },
            });
    }
    console.log("This is before click verify");
//    await page.locator('.bigSquare.codeButtonColor0').setTimeout(timeout).click();
    await page.locator('.bigSquare.codeButtonColor0').filter({ hasText: '1' }).click();
    await page.screenshot({ path: screenshotPath });
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(VERIFY)'),
            targetPage.locator('input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/input)'),
            targetPage.locator(':scope >>> input'),
            targetPage.locator('::-p-text(VERIFY)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 278.140625,
                y: 19.34375,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
