const {test,expect} =require ('@playwright/test');

test.skip('skip annoation test',async ({page})=>{
    console.log("this test will be skiped");

});

test('only annotaion test',async ({page})=>{
    console.log("only this test will run");
});

test.slow('slow annotation test',async({page})=>{
    console.log("this test will run but will be slow");
});

test.fixme('fixme annotaion test',async ({page})=>{
    console.log("this test will run but will be fixed");
});

// test('fail annotation test',async({page})=>{
//     // expect(1).toBe(2);
//     await page.goto('/baseURL');
//     const title =await page.title();
//     await  console.log(title);
//     console.log("this test expect to be failed");
// });