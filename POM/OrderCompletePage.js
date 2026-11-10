import { elementToBeVisible } from "../UTILITY/Assertion.js";
import fs from "fs";
class OrderCompletePage{
    constructor(page){
        this.page=page;
        this.orderCompleteMsg=page.getByTestId("complete-header");
        this.backHomebtn=page.getByRole("button", {name:"Back Home"});
        this.generatePDF=page.getByRole("button", {name:"Generate PDF order"});
    }

    async orderComplete(){
        await elementToBeVisible(this.orderCompleteMsg);
       // Create the downloads folder if it doesn't exist
        fs.mkdirSync("downloads", { recursive: true });

        // Download and save the PDF
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.generatePDF.click()
        ]);
            const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const fileName = `downloads/order_${timestamp}.pdf`;

    await download.saveAs(fileName);

    console.log("PDF saved successfully:", fileName);

        // await download.saveAs("downloads/order.pdf");
        // console.log("Order completed");        
        // console.log("PDF saved successfully:", download.suggestedFilename());    
    }

}
export default OrderCompletePage;