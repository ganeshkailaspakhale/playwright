const {test,expect, chromium}=require('@playwright/test');
import { HomePageLogin } from './HomePageLogin';
test('validate HomePage URL',async({page})=>{
    const login =new HomePageLogin(page);
    await login.openLoginPage();
    await login.userLogin("kumbarsaikumar066@gmail.com","#123456789");
    expect (await page.url()).toBe('https://dev.orderbookings.com/merchant/index/index');
});

test('test without object',async()=>{
    const browser =await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    // const page1 = await browser.newPage();
    // await page1.goto("https://www.google.com");

    await page.waitForTimeout(3000);
})
