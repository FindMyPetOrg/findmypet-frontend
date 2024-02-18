// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');

// describe('Authentication Page Tests', () => {
//     let driver;

//     beforeAll(async () => {
//         let options = new chrome.Options();
//         options.addArguments('--headless');
//         options.addArguments('--disable-gpu');
//         driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
//     });

//     afterAll(async () => {
//         await driver.quit();
//     });

//     test('Successful Login', async () => {
//         await driver.get('http://localhost:3000/login');
//         await driver.findElement(By.id('email')).sendKeys('testuser@gmail.com');
//         await driver.findElement(By.id('password')).sendKeys('12345678');
//         await driver.findElement(By.id('Login')).click();
        
//         await driver.wait(until.urlContains('dashboard'), 50000); // Check if redirected to dashboard
//         expect(await driver.getCurrentUrl()).toContain('dashboard');
//     }, 10000);

//     test('Successful Google Login', async () => {
//         await driver.get('http://localhost:3000/login');
//         await driver.findElement(By.id('email')).sendKeys('testuser@gmail.com');
//         await driver.findElement(By.id('password')).sendKeys('12345678');
//         await driver.findElement(By.name('LOGIN WITH GOOGLE')).click();
        
//         await driver.wait(until.urlContains('accounts.google.com'), 5000); // Check if redirected to google accounts page
//         expect(await driver.getCurrentUrl()).toContain('accounts.google.com');
//     });

//     test('Failed Login (Invalid Email)', async () => {
//         await driver.get('http://localhost:3000/login');
//         await driver.findElement(By.id('username')).sendKeys('testuser1234');
//         await driver.findElement(By.id('password')).sendKeys('12345678');
//         await driver.findElement(By.id('Login')).click();

//         // Check for error message
//         let errorMessage = await driver.findElement(By.id('errorMessage')).getText();
//         expect(errorMessage).toContain('Invalid email');
//     });

//     test('Failed Login (Incorrect password)', async () => {
//         await driver.get('http://localhost:3000/login');
//         await driver.findElement(By.id('username')).sendKeys('testuser@gmail.com');
//         await driver.findElement(By.id('password')).sendKeys('12345677');
//         await driver.findElement(By.id('Login')).click();

//         // Check for error message
//         let errorMessage = await driver.findElement(By.id('errorMessage')).getText();
//         expect(errorMessage).toContain('Incorrect password');
//     });

//     test('Failed Login (Empty inputs)', async () => {
//         await driver.get('http://localhost:3000/login');
//         await driver.findElement(By.id('email')).sendKeys('');
//         await driver.findElement(By.id('password')).sendKeys('');
//         await driver.findElement(By.id('Login')).click();

//         // Check for error message
//         let errorMessage = await driver.findElement(By.id('errorMessage')).getText();
//         expect(errorMessage).toContain('Incomplete information');
//     });

// });


const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Authentication Page Tests', () => {
    let driver;

    beforeAll(async () => {
        let options = new chrome.Options();
        options.addArguments('--headless'); // Run Chrome in headless mode.
        options.addArguments('--disable-gpu'); // Applicable for Windows OS and Chrome. Disables GPU hardware acceleration.
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    afterAll(async () => {
        await driver.quit(); // Quit the driver after tests are done.
    });

    test('Successful Login', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.id('email')), 10000).sendKeys('testuser@gmail.com');
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('12345678');
        await driver.findElement(By.css('button[id="Login"]')).click(); // Adjusted to use CSS selector for button with text "Login".
        await driver.wait(until.urlContains('dashboard'), 15000); // Assuming redirection to '/dashboard' upon successful login.
        expect(await driver.getCurrentUrl()).toContain('dashboard');
    }, 30000); // Increased timeout to accommodate potential network delays.
    
    

    test('Successful Google Login', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.name('LOGIN WITH GOOGLE')), 10000).click();
        await driver.wait(until.urlContains('accounts.google.com'), 15000); // Wait until redirected to Google's login page.
        expect(await driver.getCurrentUrl()).toContain('accounts.google.com');
    }, 20000); // Set the timeout for this test to 20 seconds.

    test('Failed Login (Invalid Email)', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.id('email')), 10000).sendKeys('testuser1234'); // Assuming the correct ID is 'email'.
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('12345678');
        await driver.findElement(By.id('Login')).click();
        let errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000).getText();
        expect(errorMessage).toContain('Invalid email');
    }, 20000); // Set the timeout for this test to 20 seconds.

    test('Failed Login (Incorrect password)', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.id('email')), 10000).sendKeys('testuser@gmail.com');
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('12345677');
        await driver.findElement(By.id('Login')).click();
        let errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000).getText();
        expect(errorMessage).toContain('Incorrect password');
    }, 20000); // Set the timeout for this test to 20 seconds.

    test('Failed Login (Empty inputs)', async () => {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.id('Login')).click(); // Assuming the button's ID is 'Login' and it's clickable even with empty inputs.
        let errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000).getText();
        expect(errorMessage).toContain('Incomplete information');
    }, 20000); // Set the timeout for this test to 20 seconds.
});
