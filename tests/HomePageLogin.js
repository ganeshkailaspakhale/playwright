exports.HomePageLogin=
class HomePageLogin{

    constructor(page){
        this.page=page;
        this.username="//html/body/section[2]/div[2]/form[1]/div[1]/input";
        this.password="//html/body/section[2]/div[2]/form[1]/div[2]/input";
        this.loginbtn="//html/body/section[2]/div[2]/form[1]/div[4]/button";
        
    }
    async openLoginPage(){
    await this.page.goto('https://dev.orderbookings.com/login');
   
    }
    async userLogin(username,password){
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.loginbtn).click();
        

    }
}