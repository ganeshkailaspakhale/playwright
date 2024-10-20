const {test,expect }=   require('@playwright/test');

test('test window',async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const context=await page.context();
    
    await page.locator("//*[text()=\"OrangeHRM, Inc\"]").click();
    
    const pagepromise=await context.waitForEvent('page');
    const newpage=  await pagepromise;

    await newpage.locator('//*[@id="navbarSupportedContent"]/ul/li[4]/a').click();
});


