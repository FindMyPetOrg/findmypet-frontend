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
        await driver.get('http://localhost:3000/profile/1');
        await driver.findElement(By.id('name')).sendKeys('testuser');
        await driver.findElement(By.id('email')).sendKeys('testuser@gmail.com');
        await driver.findElement(By.id('nickname')).sendKeys('cooluser');
        await driver.findElement(By.id('address')).sendKeys('Main Street, nr. 25');
        await driver.findElement(By.id('phone')).sendKeys('0723 101 285');
        await driver.findElement(By.id('description')).sendKeys('Your typical, average user.');
        await driver.findElement(By.id('Update')).click();
    
    }, 10000);

    test('Incorrect Email', async () => {
        await driver.get('http://localhost:3000/profile/1');
        await driver.findElement(By.id('name')).sendKeys('testuser');
        await driver.findElement(By.id('email')).sendKeys('testusernoemail');
        await driver.findElement(By.id('nickname')).sendKeys('cooluser');
        await driver.findElement(By.id('address')).sendKeys('Main Street, nr. 25');
        await driver.findElement(By.id('phone')).sendKeys('0723 101 285');
        await driver.findElement(By.id('description')).sendKeys('Your typical, average user.');
        await driver.findElement(By.id('Update')).click();

        let errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).toContain('Invalid email address');
    
    }, 10000);

    test('Incorrect Email', async () => {
        await driver.get('http://localhost:3000/profile/1');
        await driver.findElement(By.id('name')).sendKeys('testuser');
        await driver.findElement(By.id('email')).sendKeys('testuser@gmail.com');
        await driver.findElement(By.id('nickname')).sendKeys('cooluser');
        await driver.findElement(By.id('address')).sendKeys('Main Street, nr. 25');
        await driver.findElement(By.id('phone')).sendKeys('phone number :b');
        await driver.findElement(By.id('description')).sendKeys('Your typical, average user.');
        await driver.findElement(By.id('Update')).click();

        let errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).toContain('Invalid phone number');
    
    }, 10000);

});

