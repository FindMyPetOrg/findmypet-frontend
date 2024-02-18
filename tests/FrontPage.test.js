const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Authentication Page Tests', () => {
    let driver;

    beforeAll(async () => {
        let options = new chrome.Options();
        options.addArguments('--headless'); // Add the headless argument directly
        options.addArguments('--disable-gpu'); // Recommended to avoid unnecessary errors on Windows
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Successful Login', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.id('Login')).click();
        
        await driver.wait(until.urlContains('login'), 5000); // Check if redirected to dashboard
        expect(await driver.getCurrentUrl()).toContain('login');
    });

    test('Successful Register', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.id('Register')).click();
        
        await driver.wait(until.urlContains('register'), 5000); // Check if redirected to google accounts page
        expect(await driver.getCurrentUrl()).toContain('register');
    });


});

