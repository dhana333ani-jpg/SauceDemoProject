import { elementToBeVisible, elementToHaveUrl } from "../UTILITY/Assertion.js";
import { takeScreenshot } from "../UTILITY/Screenshot.js";

class LoginPage2{
    constructor(page){
        this.page=page;
        this.usernametxtfld=page.getByPlaceholder("Username");
        this.passwordtxtfld=page.getByPlaceholder("Password");
        this.loginbtn=page.getByRole("button", {name:"Login"});
        this.SwagLabsTxt=page.getByText("Swag Labs");
        this.homePageURL="https://www.saucedemo.com/inventory.html";
    }

    async loginPage2(user, password){
        await elementToBeVisible(this.SwagLabsTxt);
        await takeScreenshot(this.SwagLabsTxt);
        await this.usernametxtfld.fill(user);
        await this.passwordtxtfld.fill(password);
        await this.loginbtn.click();
        await elementToHaveUrl(this.page, this.homePageURL);
        console.log("Suggesfully logged in");
    }
}
export default LoginPage2;