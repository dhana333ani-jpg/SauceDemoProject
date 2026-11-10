import { expect } from "@playwright/test";
import fs from "fs";
import { elementToBeVisible, elementToHaveText, elementToHaveUrl, elementvalueToBe} from "../UTILITY/Assertion.js";

class LoginPage{
    constructor(page){
        this.page=page;
        this.usernametxtfld=page.getByPlaceholder("Username");
        this.passwordtxtfld=page.getByPlaceholder("Password");
        this.loginbtn=page.getByRole("button", {name:"Login"});
        this.SwagLabsTxt=page.getByText("Swag Labs");
        this.homePageURL="https://www.saucedemo.com/inventory.html";
        this.SauceLabsBackPack=page.getByRole("button", {name:"View details for Sauce Labs Backpack"}).last();
        this.pdtprice=page.getByText("$29.99");
        this.addtoCardbtn=page.getByTestId("add-to-cart-sauce-labs-backpack");
        this.shoppingCardlink=page.locator(".shopping_cart_link");
        this.CheckOutBtn=page.getByRole("button", {name:"Checkout"});
        this.FirstNametxt=page.getByPlaceholder("First Name");
        this.LastNametxt=page.getByPlaceholder("Last Name");
        this.zipCodetxt=page.getByPlaceholder("Zip/Postal Code");
        this.Continuebtn=page.getByRole("button", {name:"Continue"});
        this.totalPrice=page.getByTestId("total-label");
        this.finishBtn=page.getByRole("button", {name:"Finish"});
        this.orderCompleteMsg=page.getByTestId("complete-header");
        this.generatePDF=page.getByRole("button", {name:"Generate PDF order"});
        this.hamburgerbtn=page.getByRole("button", {name:"Open Menu"});
        this.logoutbtn=page.getByRole("button", {name:"Logout"});
    }

    async loginToSauce(user, password){
        await elementToBeVisible(this.SwagLabsTxt);
        await this.usernametxtfld.fill(user);
        await this.passwordtxtfld.fill(password);
        await this.loginbtn.click();
        await elementToHaveUrl(this.page, this.homePageURL);
    }

    async AddCard(){
        await elementvalueToBe(await this.SwagLabsTxt.textContent(), "Swag Labs");
        await elementToHaveText(this.pdtprice, "$29.99");
        await this.addtoCardbtn.click();
    }

    async orderProduct(firstname, lastname, zipcode, expPrice){
        await this.shoppingCardlink.click();
        await elementToHaveUrl(this.page, "https://www.saucedemo.com/cart.html")
        const actualPrice=await this.pdtprice.textContent();
        await elementvalueToBe(actualPrice, "$29.99");
        await this.CheckOutBtn.click();
        await this.FirstNametxt.fill(firstname);
        await this.LastNametxt.fill(lastname);
        await this.zipCodetxt.fill(zipcode);
        await this.Continuebtn.click();
        await elementToHaveText(this.totalPrice, expPrice);
        await this.finishBtn.click();
        await elementToBeVisible(this.orderCompleteMsg);
       // Create the downloads folder if it doesn't exist
        fs.mkdirSync("downloads", { recursive: true });

        // Download and save the PDF
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.generatePDF.click()
        ]);

        await download.saveAs("downloads/order.pdf");

        console.log("PDF saved successfully:", download.suggestedFilename());
    }

    async logOut(){
        await this.hamburgerbtn.click();
        await this.logoutbtn.click();

    }


}
export default LoginPage;