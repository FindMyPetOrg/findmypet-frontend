const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Authentication Page Tests', () => {
    let driver;

    beforeAll(async () => {
        let options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Successful Post Creation', async () => {
        await driver.get('http://localhost:3000/posts/new');
        await driver.findElement(By.id('title')).sendKeys('testuser@gmail.com');
        await driver.findElement(By.id('type')).sendKeys('Request');
        await driver.findElement(By.id('reward')).sendKeys('2500');
        await driver.findElement(By.id('tags')).sendKeys('dog');
        await driver.findElement(By.id('lat')).sendKeys('60');
        await driver.findElement(By.id('Login')).click();
        
        await driver.wait(until.urlContains('dashboard'), 50000); // Check if redirected to dashboard
        expect(await driver.getCurrentUrl()).toContain('dashboard');
    }, 10000);

});

