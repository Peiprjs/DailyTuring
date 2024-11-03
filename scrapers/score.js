const puppeteer = require('puppeteer'); // v20.7.4 or later
const fs = require('node:fs');
const screenshotPath = "test.jpeg";
//-----------------------------------Here starts the score thingy--------------------//
//const solution = JSON.parse(fs.readFileSync('../today/solution', 'utf8'))
const solution = [5, 5, 5]
console.log(solution);
let parsed_solution =  [-3*solution[0]+16 ,-3*solution[1]+17 , -3*solution[2]+18];
console.log(parsed_solution);
//-----------------------------------Here starts the puppet chaos--------------------//
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
    // This is the clickey part (Number 5s can go fuck themselves)
    console.log("This is before click verify");
    {const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator(`span:nth-of-type(${parsed_solution[0]})`),
        targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[0]}])`),
        targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[0]})`)
    ])
        .setTimeout(timeout)
        .click();} //This one clicks X
    {const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator(`span:nth-of-type(${parsed_solution[1]})`),
        targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[1]}])`),
        targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[1]})`)
    ])
        .setTimeout(timeout)
        .click();} //This one clicks Y
    {const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator(`span:nth-of-type(${parsed_solution[2]})`),
        targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[2]}])`),
        targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[2]})`)
    ])
        .setTimeout(timeout)
        .click();} //This one clicks Z
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
    await page.screenshot({ path: screenshotPath });
    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
