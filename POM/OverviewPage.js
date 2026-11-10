import { elementToHaveText } from "../UTILITY/Assertion.js";

class OverviewPage{
    constructor(page){
        this.page=page;
        this.totalPrice=page.getByTestId("total-label");
        this.finishBtn=page.getByRole("button", {name:"Finish"});
    }

    async overView(expPrice){
        await elementToHaveText(this.totalPrice, expPrice);
        await this.finishBtn.click();
        console.log("Product overview page is verified");  
    }
}
export default OverviewPage;