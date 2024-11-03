const puppeteer = require('puppeteer'); // v20.7.4 or later
(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 970,
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
                x: 208.140625,
                y: 27.953125,
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
                x: 147.640625,
                y: 9.34375,
              },
            });
    }
    let code = await page.$$eval('h2', spans => spans.map(span => span.innerText));
    code = code.toString().split(" ");
    code = code[0]+code[1]
    console.log(code);
    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
