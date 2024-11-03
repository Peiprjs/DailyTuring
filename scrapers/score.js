const puppeteer = require('puppeteer'); // v20.7.4 or later
const fs = require('node:fs');
const screenshotPath = "test.jpeg";
//-----------------------------------Here starts the score thingy--------------------//
const solution = JSON.parse(fs.readFileSync('../today/solution', 'utf8'))
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
    console.log("This is before click numbers");
    if (solution[0] == 5){
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`div.codeInserter > span:nth-of-type(${parsed_solution[0]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[0]}])`),
            targetPage.locator(`:scope >>> div.codeInserter > span:nth-of-type(${parsed_solution[0]})`)
        ])
        .setTimeout(timeout)
        .click();}
} else {
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`span:nth-of-type(${parsed_solution[0]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[0]}])`),
            targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[0]})`)
        ])
        .setTimeout(timeout)
        .click();}
    }//This one clicks X
    if (solution[1] == 5){
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`div.codeInserter > span:nth-of-type(${parsed_solution[1]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[1]}])`),
            targetPage.locator(`:scope >>> div.codeInserter > span:nth-of-type(${parsed_solution[1]})`)
        ])
        .setTimeout(timeout)
        .click();}
} else {
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`span:nth-of-type(${parsed_solution[1]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[1]}])`),
            targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[1]})`)
        ])
        .setTimeout(timeout)
        .click();}
    }//This one clicks Y
    if (solution[2] == 5){
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`div.codeInserter > span:nth-of-type(${parsed_solution[2]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[2]}])`),
            targetPage.locator(`:scope >>> div.codeInserter > span:nth-of-type(${parsed_solution[2]})`)
        ])
        .setTimeout(timeout)
        .click();}
} else {
        {const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator(`span:nth-of-type(${parsed_solution[2]})`),
            targetPage.locator(`::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[3]/span[${parsed_solution[2]}])`),
            targetPage.locator(`:scope >>> span:nth-of-type(${parsed_solution[2]})`)
        ])
        .setTimeout(timeout)
        .click();}
    }//This one clicks Z
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
        {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Did you beat the MACHINE?)'),
            targetPage.locator('input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/input)'),
            targetPage.locator(':scope >>> input'),
            targetPage.locator('::-p-text(Did you beat)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 225.640625,
                y: 28.34375,
              },
            });
    }
        {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.answerGrid > div:nth-of-type(2) > div:nth-of-type(1) > div > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[1]/div[2]/div[1]/div/span)'),
            targetPage.locator(':scope >>> div.answerGrid > div:nth-of-type(2) > div:nth-of-type(1) > div > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 24.5,
                y: 25.34375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.answerGrid > div:nth-of-type(2) > div:nth-of-type(1) span.val1'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[1]/div[2]/div[1]/div/div/span[2])'),
            targetPage.locator(':scope >>> div.answerGrid > div:nth-of-type(2) > div:nth-of-type(1) span.val1')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 27.5,
                y: 23.34375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Did you beat the MACHINE?)'),
            targetPage.locator('input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[2]/div[2]/input)'),
            targetPage.locator(':scope >>> input'),
            targetPage.locator('::-p-text(Did you beat)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 123,
                y: 23,
              },
            });
    }
    await page.screenshot({ path: screenshotPath });
    let score = await page.$$eval('.bolder', spans => spans.map(span => span.innerText));
    let score_machine = [score[2],score[3]]
    let jsonified_score = JSON.stringify(score_machine);
    console.log(jsonified_score);
    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
