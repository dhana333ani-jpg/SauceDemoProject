import { elementToHaveUrl } from "../UTILITY/Assertion.js";

class LogOutPage{
    constructor(page){
        this.page=page
        this.hamburgerbtn=page.getByRole("button", {name:"Open Menu"});
        this.logoutbtn=page.getByRole("button", {name:"Logout"});
    }

    async logOut(){
        await this.hamburgerbtn.click();
        await this.logoutbtn.click();
        await elementToHaveUrl(this.page, "https://www.saucedemo.com/")
        console.log("Successfully logged out");
    }
}
export default LogOutPage;