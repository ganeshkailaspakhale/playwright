
const {test,expect}  = require('@playwright/test');

const { request } = require('http');

import { defineConfig } from '@playwright/test';
import { count, time } from 'console';
import { skip } from 'node:test';
import path from 'path';



test('locate test',async({page})=>{
    await page.goto('https://dev.orderbookings.com/login');
    await page.waitForTimeout(2000);
    await page.locator("//html/body/section[2]/div[2]/form[1]/div[1]/input").fill("kumbarsaikumar066@gmail.com");
    await page.locator("//html/body/section[2]/div[2]/form[1]/div[2]/input").fill("#123456789");
    await page.waitForTimeout(2000);
    await  page.locator("//html/body/section[2]/div[2]/form[1]/div[4]/button").click();
    
    //validating url after clicking button
           await expect(page).toHaveURL('https://dev.orderbookings.com/merchant/index/index');
        const appconfig="//*[@id=\"app-menu-list-appconfig\"]/a/span";
    await page.locator(appconfig).click();
    const currencyoption="//*[@id=\"oba_appconfig_select_currency\"]";
    await page.selectOption(currencyoption,"Indian rupee (₹)");
    const selectedText = await page.$eval(currencyoption, (select) => {
        const selectedOption = select.options[select.selectedIndex];
        return selectedOption.text; // or selectedOption.value for the value
        
       
    });

    
//    console.log(selectedText);
   
    
});

test('locate multiple web elements',async({page})=>{
    await page.goto('https://dev.orderbookings.com/login');
    await page.waitForTimeout(2000);
    await page.locator("//html/body/section[2]/div[2]/form[1]/div[1]/input").fill("kumbarsaikumar066@gmail.com");
    await page.locator("//html/body/section[2]/div[2]/form[1]/div[2]/input").fill("#123456789");
    await page.waitForTimeout(2000);
    await  page.locator("//html/body/section[2]/div[2]/form[1]/div[4]/button").click();

    const elements=await page.$$("//*[@class=\"col-9\"]");
    for(let ele of elements){
        await console.log(ele.text);
    }
    
});


test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Text Box').click();
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('ganesh');
});

test('test check box',async({page})=>{
    await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.locator("//*[contains(text(),'Check Box')]").click();
  await page.locator('#tree-node').getByRole('img').nth(3).click();
    expect (  await page.locator('#tree-node').getByRole('img').nth(3).isChecked()).toBeTruthy();

});

test('test dropdown',async({page})=>{
    await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.locator("//*[contains(text(),'Check Box')]").click();
});
test('serch',async({page})=>{
    const name="ajskdhasdabcd";
    expect  (name).toContain('abcd'); 
});

test('test multi select dropdown',async({page})=>{
    await page.goto("https://coreui.io/bootstrap/docs/forms/multi-select/");
    const testdrop =page.locator("//html/body/div[2]/div/main/div[3]/div[1]/div[1]/div/div[1]/div[2]/button[2]");
    await testdrop.click();
    const dropcount=await page.$$("//*[@class=\"form-multi-select-options\"]");
    for(let option of dropcount){
        const value=await option.text();

        if(value.toContain='Angular'){
            await option.click();
        }
    }
    await page.waitForTimeout(5000);
});

test('get user details',async({request})=>{
    const response =await request.get('https://reqres.in/api/users?page=2');
    expect (response.status()).toBe(200);
});

test('post user details',async({request})=>{
    const response =await request.post('https://reqres.in/api/users',{
        data:{
            
            "name": "morpheus",
            "job": "leader"
        
    },
    headers:{
        'Content-Type': 'application/json'
    }

    });
    const checkval= await response.json();
    //const data=typeof(checkval.then().catch().log());
    console.log(checkval.name); 
    // const str=await checkval.name;
    // await console.log(checkval);  
    // await console.log(str);
});

test('dialog',async ({page})=>{
    page.on('dialog',dialog=>dialog.accept());
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('//*[@id="confirmBtn"]').click();
    expect (await page.locator('//*[@id="demo"]')).toContainText('You pressed OK!');
    await page.waitForTimeout(3000); 
});

test('locate frames',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html');
    const frame=await page.frameLocator('//*[@name="SingleFrame"]');
    await frame.locator('//html/body/section/div/div/div/input').fill("ganesh");
    const  text =await frame.locator('//html/body/section/div/div/div/input').textContent();
    await console.log(text);
    page.waitForTimeout(3000);

});

test('nested frames',async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html');
    await page.locator('//html/body/section/div[1]/div/div/div/div[1]/div/ul/li[2]/a').click();
    const textfield=await page.frameLocator("//*[@id=\"Multiple\"]/iframe").frameLocator('//html/body/section/div/div/iframe').locator('//html/body/section/div/div/div/input');
    await textfield.fill('ganesh');
    await page.waitForTimeout(5000);

});

test('static tables practice ',async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    const table =await page.locator('//*[@id="productTable"]');
    const rows =await table.locator('tbody tr');
    let rowscount=await rows.count();
    const lappi=await rows.filter({
        has: rows.locator('td'),
        hasText: 'Laptop'
    });
    await lappi.locator('input').click();
    await page.waitForTimeout(2000);


    

});

test('test mouse hover@smoke',async ({page})=>{
    await page.goto('https://demo.opencart.com/');
    const desktop=await page.locator('//*[@id="narbar-menu"]/ul/li[1]/a');
    await desktop.hover();
    await desktop.dblclick();
    await desktop
    await desktop.click({button:'left'});
    await  page.waitForTimeout(5000);


});

test.describe('group 1',()=>{


test('drag n drop @smoke',async ({page})=>{
    
    // await page.goto('https://demo.automationtesting.in/Static.html');
    await page.goto('https://www.amazon.in');
    // const button =await page.locator('//*[@id="mongo"]');
    await page.screenshot({path:Date.now()+Date.now().valueOf(time)+'home.png',fullPage:true});
    // await button.dragTo(await page.locator('//*[@id="droparea"]'));
    // await page.keyboard.press('Meta+A');

    const check=await page.locator("//*[@id=\"nav-xshop\"]/a[2]");
    await check.screenshot({path:'test.png'});
    await page.waitForTimeout(4000);
});
});

test('mouse test',async ({page})=>{
   
    await page.goto('https://demo.opencart.com/');
    const desktop=await page.locator('//*[@id="narbar-menu"]/ul/li[1]/a');
    await desktop.hover();
    await desktop.dblclick();

    await desktop.click({button:'left'});
    await desktop.click({button:'middle'});
    await desktop.keyboard.press('Meta=A');
    await page.keyboard.press('Meta+A');
});
test('file upload',async ({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator("//*[@id=\"filesToUpload\"]").setInputFiles(['tests/uploadfiles/testing.js','testing.tex']);
   await page.waitForTimeout(5000);
//    await page.locator('')


});

test('testing alert window',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('alert',async(alert)=>{
        const message=await alert.message();
        await console.log(message);
        await alert.accept();
    });

    await page.locator('[id="confirmbtn"]').click();


}
);