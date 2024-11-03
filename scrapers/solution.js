const puppeteer = require('puppeteer'); // v20.7.4 or later

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1348,
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
                x: 197.140625,
                y: 9.953125,
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
                x: 202.640625,
                y: 31.34375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Solution)'),
            targetPage.locator('input:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[4]/input[2])'),
            targetPage.locator(':scope >>> input:nth-of-type(2)'),
            targetPage.locator('::-p-text(Solution)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 134.640625,
                y: 31.859375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(YES)'),
            targetPage.locator('input:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div/div/input[1])'),
            targetPage.locator(':scope >>> input:nth-of-type(1)'),
            targetPage.locator('::-p-text(YES)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 21.921875,
                y: 28.859375,
              },
            });
    }
    const answer = await page.$$eval('.bigSquare', spans => spans.map(span => span.innerText));
    let jsonified_answer = JSON.stringify(answer);
    console.log(jsonified_answer);
    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
