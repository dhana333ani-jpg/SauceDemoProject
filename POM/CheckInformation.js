class CheckInformation{
    constructor(page){
        this.page=page;
        this.FirstNametxt=page.getByPlaceholder("First Name");
        this.LastNametxt=page.getByPlaceholder("Last Name");
        this.zipCodetxt=page.getByPlaceholder("Zip/Postal Code");
        this.Continuebtn=page.getByRole("button", {name:"Continue"});
    }
    async checkInfo(firstname, lastname, zipcode){
        await this.FirstNametxt.fill(firstname);
        await this.LastNametxt.fill(lastname);
        await this.zipCodetxt.fill(zipcode);
        await this.Continuebtn.click();
        console.log("Check Information is verified");
        
    }
}
export default CheckInformation;