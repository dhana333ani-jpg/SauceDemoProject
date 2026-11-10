import {test} from "@playwright/test";
import LoginPage from "../POM/loginPage";
import excel from "exceljs"

test("Login", async({page})=>{
    let book=new excel.Workbook();
    await book.xlsx.readFile("C:/Users/Dell/Desktop/SauceDemoProject/TestData/Book1.xlsx")
    const sheet=book.getWorksheet("Sheet1");

    //Automatically detect headers
    const headers=sheet.getRow(1).values
    .slice(1)
    .map(header=>String(header).trim());

    // Automatically detect and process all data rows
    
    await page.goto("https://www.saucedemo.com/");
    let login=new LoginPage(page);
    await login.loginToSauce();
    await page.waitForTimeout(2000);
})