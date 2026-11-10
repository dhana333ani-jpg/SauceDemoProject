import { elementToHaveText, elementvalueToBe } from "../UTILITY/Assertion.js";

class AddtoCardPage{
    constructor(page){
        this.page=page;
        this.SwagLabsTxt=page.getByText("Swag Labs");
        this.SauceLabsBackPack=page.getByRole("button", {name:"View details for Sauce Labs Backpack"}).last();
        this.pdtprice=page.getByText("$29.99");
        this.addtoCardbtn=page.getByTestId("add-to-cart-sauce-labs-backpack"); 
        this.shoppingCardlink=page.locator(".shopping_cart_link");
    }
    async AddCard(){
            await elementvalueToBe(await this.SwagLabsTxt.textContent(), "Swag Labs");
            await elementToHaveText(this.pdtprice, "$29.99");
            await this.addtoCardbtn.click();
            this.shoppingCardlink.click();
            console.log("Product is added to the card");
        }
}
export default AddtoCardPage;