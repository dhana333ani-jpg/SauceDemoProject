import { elementToHaveUrl, elementvalueToBe } from "../UTILITY/Assertion.js";

class CheckOutPage{
    constructor(page){
        this.page=page;
        this.pdtprice=page.getByText("$29.99");
        this.CheckOutBtn=page.getByRole("button", {name:"Checkout"});
    }

    async checkOut(){
        await elementToHaveUrl(this.page, "https://www.saucedemo.com/cart.html")
        const actualPrice=await this.pdtprice.textContent();
        await elementvalueToBe(actualPrice, "$29.99");
        await this.CheckOutBtn.click(); 
        console.log("Checkout info verified");
           
    }
}
export default CheckOutPage;